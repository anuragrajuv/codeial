const Post = require("../models/post");
const Comment = require('../models/comment');
const User = require("../models/user");
const Like = require("../models/like");


module.exports.posts = function(req,res){
    res.end("<h1>POSTS ARE SHOWN HERE</h1>")
} 


module.exports.create = async function(req,res){
    try {
        let post = await Post.create({
            content:req.body.content,
            user:req.user._id
        });  
        
        let user = await User.findById(post.user)

        if(req.xhr){
            return res.status(200).json({
                data:{
                    post:post,
                    user:user.name
                },
                message:"Post Created!"
            })
        }
        req.flash("success","New Post Shared!");
        return res.redirect("back");      
    } catch (error) {
        req.flash("error",error);
        return console.error("Error Creating Post",error);
    }
};



module.exports.destroy = async function(req,res){
    try {
        // console.log("Deletion Started");
        let post = await Post.findById(req.params.id);
    // .id means converting the object id into string
    
        if(post.user == req.user.id){
            // Change:: delete the associated likes for the post and all its comments likes too
            await Like.deleteMany({likeable:post,onModel:'Post'});
            await Like.deleteMany({_id:{$in:post.comments}});


            await Comment.deleteMany({post: req.params.id});
            await post.deleteOne();
 
            if(req.xhr){
                req.flash("success","Post and Related Comments Deleted!")
                return res.status(200).json({
                    data:{
                        post_id:req.params.id
                    },
                    message:"Post Deleted"
                })
            }

            req.flash("success","Post and Related Comments Deleted!");
            return res.redirect('back');
        }else{
            req.flash("error",'You Cannot delete this post');
            return res.redirect('back');
        }
    } catch (error) {
        req.flash("error",error);
        return res.redirect('back');
    }
}


