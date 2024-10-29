const Comment = require("../models/comment");
const Post = require("../models/post");


module.exports.create = function(req,res){
    Post.findById(req.body.post)
    .then((post)=>{
        Comment.create({
            content:req.body.content,
            post:req.body.post,
            user:req.user._id
        })
        .then((comment)=>{
            post.comments.push(comment);
            post.save();
            return res.redirect('/');
        })
        .catch((err)=>{
            return console.error('error creating comment',err);
            
        })
    })
    .catch((err)=>{
        return console.error('error finding post of comment',err);
        
    })
}



module.exports.destroy = function(req,res){
    Comment.findById(req.params.id)
    .then((comment)=>{
        Post.findById(comment.post)
        .then((post)=>{
            // .id means converting the object id into string
            if(comment.user == req.user.id || post.user == req.user.id){
                let postId = comment.post;

                comment.deleteOne()
                .then(()=>{
                    Post.findByIdAndRemove(postId,{$pull:{comments: req.params.id}})
                    .then(()=>{
                        res.redirect('back');
                    })
                    .catch((err)=>{
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
            console.log(err);
            return res.redirect('back');
        }); 
    })
    .catch(err=>{
        console.error(err);
        return res.redirect('back');
    })
};