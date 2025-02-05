const User = require("../models/user");
const fs = require("fs");
const path = require("path");
const Friendship = require('../models/friendship');

module.exports.profile = async function (req, res) {
    try {
        const userId = req.params.id || req.user._id;
        const loggedInUserId = req.user._id; // Currently logged-in user

        // Find the user whose profile is being visited
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).send("User not found");
        }

        // Check if there's an existing friendship between logged-in user and profile user
        const friendship = await Friendship.findOne({
            userId: loggedInUserId,
            friendId: userId
        });

        return res.render('user_profile.ejs', {
            title: user.name,
            profile_user: user,
            isFriend: !!friendship // true if friends, false otherwise
        });

    } catch (err) {
        console.log(err);
        return res.status(500).send("Internal Server Error");
    }
};

// module.exports.profile = function(req,res){
//     const userId = req.params.id || req.user._id;

//     User.findById(userId)
//     .then(user=>{
//         return res.render('user_profile.ejs',{
//             title:user.name,
//             profile_user:user
//         });
//     })
//     .catch(err=>{return console.log(err)});   
// }

module.exports.update = async function(req,res){

    if(req.user.id == req.params.id){
        try {
            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req,res,function(err){
                if(err){console.log('******Multer Error',err);}
                user.name = req.body.name;
                user.email = req.body.email;
                if(req.file){
                    if(user.avatar){
                        fs.unlinkSync(path.join(__dirname,'..',user.avatar));
                    }
                    user.avatar = User.avatarPath + "/" + req.file.filename;
                }           
                user.save();
                return res.redirect('back');     
            })


        } catch (error) {
            req.flash("error",error);
            return res.redirect('back');
        }
    }else{
            req.flash('error',"Unathorised!");
            return res.status(401).send('Unauthorised');
        }

}

module.exports.signUp = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/users/profile')
    }
    return res.render("user_sign_up.ejs",{
        title:"Codeial | Signup"
    });
    
    
}

module.exports.signIn = function(req,res){
    if(req.isAuthenticated()){
        return res.redirect('/')
    }

    return res.render("user_sign_in",{
        title:"Codeial | Sign-in"
    });
    
}


// get signUp Data
module.exports.create = function(req,res){
    // console.log("idhar dekh",req.body)
    if (req.body.password !== req.body.confirm_password) {
        return res.redirect('back');
    }

    User.findOne({email: req.body.email})
    .then((user)=>{
        if (!user) {
            User.create(req.body)
            .then(user=>{
                return res.redirect('/users/sign-in');
            })
            .catch((err)=>{
                console.error('Error in creating user during sign-up',err)
            });
        }else{
            return res.redirect('back');
        }
    })
    .catch((err)=>console.error('error in finding user in signing up',err));

}

// login and create a session for the user
module.exports.createSession = function(req,res){
    req.flash('success','Logged in Successfully');
    console.log('session created');
    return res.redirect('/');
}



module.exports.destroySession = function(req,res){
    req.logout(User);
    req.flash('success','Logged out Successfully');

    return res.redirect('/users/sign-in');
}


