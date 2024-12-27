
const Post = require('../../../models/post');
const Comment = require('../../../models/comment');
module.exports.index = async function(req,res){

    
    let posts = await Post.find({})
    .sort('-createdAt')
    .populate({
        path:'user',
        select:'name email'
    }
    )
    .populate({
        path:'comments',
        populate:{
            path:'user',
            select:'name email'
        }
    });


    return res.json(200,{
        message:"List of Posts",
        posts:posts
    });
}




module.exports.destroy = async function(req,res){
    try {
        // console.log("Deletion Started");
        let post = await Post.findById(req.params.id);
    // .id means converting the object id into string
    
        if(post.user == req.user.id){
            await Comment.deleteMany({post: req.params.id});
            await post.deleteOne();

            // req.flash("success","Post and Related Comments Deleted!");
            return res.json(200,{
                message:"Post and Associated Comments Deleted Successfully"
            })
        }else{
            // req.flash("error",'You Cannot delete this post');
            return res.json(401,{
                message:"You are not Unauthorised to Delete this Post"
            });
        }
    } catch (error) {
        console.log("******Error While Deleting Post:",error)
        return res.json(500,{
            message:"Internal Server Error"
        })
    }
}




