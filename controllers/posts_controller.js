const Post = require("../models/post");
const Comment = require('../models/comment');


module.exports.posts = function(req,res){
    res.end("<h1>POSTS ARE SHOWN HERE</h1>")
} 


module.exports.create = async function(req,res){
    try {
        await Post.create({
            content:req.body.content,
            user:req.user._id
        });  
        return res.redirect("back");      
    } catch (error) {
        return console.error("Error Creating Post",err);
    }
};


module.exports.destroy = async function(req,res){
    try {
        let post = await Post.findById(req.params.id);
    // .id means converting the object id into string
    
        if(post.user == req.user.id){
            await Comment.deleteMany({post: req.params.id});
            await post.deleteOne();
            console.log('post deleted');
            return res.redirect('back');
        }else{
            return res.redirect('back');
        }
    } catch (error) {
         console.error('Error',error)
            return
    }
}


