const Post = require("../models/post");


module.exports.posts = function(req,res){
    res.end("<h1>POSTS ARE SHOWN HERE</h1>")
} 


module.exports.createPost = function(req,res){
    console.log("Content:",req.body.content);
    if(!req.body.content){
        return res.redirect('/')
    }
    Post.create({
        content:req.body.content,
        user:req.user._id
    })
    .then((post)=>{
        return res.redirect("back");
    })
    .catch((err)=>{
        return console.error("Error Creating Post",err);
        
    })
};