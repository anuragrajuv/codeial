const User = require("../models/user");

module.exports.profile = function(req,res){
    const userId = req.params.id || req.user._id;

    User.findById(userId)
    .then(user=>{
        return res.render('user_profile.ejs',{
            title:"User Profile",
            profile_user:user
        });
    })
    .catch(err=>{return console.log(err)});   
}

module.exports.update = function(req,res){
    if(req.user.id == req.params.id){
        User.findByIdAndUpdate(req.params.id,req.body)
        .then(user=>{
            return res.redirect('back');
        })
        .catch(err=>console.error(err));
    }else{
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


