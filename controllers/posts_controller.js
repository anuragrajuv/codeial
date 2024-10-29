const Post = require("../models/post");
const Comment = require('../models/comment');


module.exports.posts = function(req,res){
    res.end("<h1>POSTS ARE SHOWN HERE</h1>")
} 


module.exports.create = function(req,res){
    console.log("Content:",req.body.content);
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


module.exports.destroy = function(req,res){
    Post.findById(req.params.id)
    .then((post)=>{
        // .id means converting the object id into string
        if(post.user == req.user.id){
            
            Comment.deleteMany({post: req.params.id})
            .then(()=>{
                post.deleteOne()
                .then(()=>{
                    return res.redirect('back');
                })
                .catch((err)=>{
                    console.error(err);
                    return res.redirect('back');
                });
            })
            .catch((err)=>{
                
                return res.redirect('back');
            });
        }else{
            return res.redirect('back');
        }
    })
    .catch(err=>{
        console.error(err);
        return res.redirect('back');
    });
}