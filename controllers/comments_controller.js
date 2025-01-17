const Comment = require("../models/comment");
const Post = require("../models/post");
const commentsMailer = require("../mailers/comments_mailer");
const queue = require("../config/kue");
const commentEmailWorker = require('../workers/comment_email_worker');
const Like = require('../models/like');

module.exports.create = async function(req,res){

    try {
        let post = await Post.findById(req.body.post);


        if(post){
            let comment = await Comment.create({
                content:req.body.content,
                post:req.body.post,
                user:req.user._id
            })

            post.comments = await Comment.find({post})
            .sort('-createdAt')
            

            comment = await Comment.findById(comment._id)
                .populate('user', 'name email') // Populate user fields
                .populate('post', 'title');    // Populate post fields
            
            post.comments.push(comment);
            await post.save();

            // commentsMailer.newComment(comment);
            let job = queue.create('emails',comment).save(function(err){
                if(err){
                    console.log("Error in Creating or sending to the queue",err)
                    return;
                }
                console.log("job enqueued:",job.id)
            });

            if (req.xhr) {
                return res.status(200).json({
                    data: {
                        comment: comment,
                    },
                    message: "Comment added successfully!"
                });
            }

            req.flash("success","Comment Added!");
            return res.redirect('/');
        };
    } catch (error) {
        return console.error('error creating comment',error);
    }
}



// Async Await destroy comment 
module.exports.destroy = async function(req,res){
    try {
        let comment = await Comment.findById(req.params.id);
        let post = await Post.findById(comment.post);

        if(comment.user == req.user.id || post.user == req.user.id){
            
            let postId = comment.post;

            await Like.deleteMany({likeable: comment._id, onModel: 'Comment'});
            
            await comment.deleteOne();
            
            Post.findByIdAndUpdate(postId,{$pull:{comments: req.params.id}})

            if (req.xhr){
                return res.status(200).json({
                    data: {
                        comment_id: req.params.id
                    },
                    message: "Post deleted"
                });
            }
            
            req.flash("success","Comment Deleted!");
            
            return res.redirect('back');
        }else{
            req.flash('error', 'Unauthorized');
            return res.redirect('back');
        }
    } catch (err) {
        req.flash('error', err);
        return res.redirect('back');
    }
}