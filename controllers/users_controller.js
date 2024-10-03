const User = require("../models/user");

module.exports.profile = function(req,res){
    res.render('user_profile.ejs',{
        title:"Codeial | Profile"
    });
}

module.exports.signUp = function(req,res){
    if(req.isAuthenticated()){
        res.redirect('/users/profile')
    }else{
        return res.render("user_sign_up.ejs",{
            title:"Codeial | Signup"
        })
    }
    
}

module.exports.signIn = function(req,res){
    if(req.isAuthenticated()){
        res.redirect('/users/profile')
    }else{
        return res.render("user_sign_in",{
            title:"Codeial | Sign-in"
        }
        );
    }
}


// get signUp Data
module.exports.create = function(req,res){
    console.log("idhar dekh",req.body)
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
    console.log('session created');
    return res.redirect('/');
}

