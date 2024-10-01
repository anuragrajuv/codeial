module.exports.profile = function(req,res){
    res.render('user_profile.ejs');
}

module.exports.signUp = function(req,res){
    res.render("user_sign_up.ejs")
}

module.exports.signIn = function(req,res){
    res.render("user_sign_in.ejs")
}


// get signUp Data
module.exports.create = function(req,res){
    // todo later
}


// login and create a session for the user
module.exports.createSession = function(req,res){

}

