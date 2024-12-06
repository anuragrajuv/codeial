const Post = require("../models/post");
const User = require("../models/user");
const { posts } = require("./posts_controller");

// using async await to make the code smaller and easier to understand
module.exports.home = async function(req,res){

    try{
        // Populate the user of each post
    let posts = await Post.find({})
    .sort('-createdAt')
    .populate('user')
    .populate({
        path:'comments',
        populate:{
            path:'user'
        }
    });


    let users = await User.find({});

    return res.render('home',{
        title:"Codeial|Home",
        posts:posts,
        all_users:users
    });
    
    }catch(err){
        console.error('Error',err);
    }
}

module.exports.actionName = function(req,res){
    return res.end("humne kya bigada tha tera")
}