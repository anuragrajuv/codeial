const Post = require("../models/post");
const User = require("../models/user");
const { posts } = require("./posts_controller");

// module.exports.home = function(req,res){
//     // Populate the user of each post
//     Post.find({})
//     .populate('user')
//     .populate({
//         path:'comments',
//         populate:{
//             path:'user'
//         }
//     })
//     .exec()
//     .then((posts)=>{
//         User.find({})
//         .then(users=>{
//             return res.render('home',{
//                 title:"Codeial|Home",
//                 posts:posts,
//                 all_users:users
//             });
//         })
//         .catch(err=>{
//             return console.error(err);            
//         })
//     })
//     .catch((err)=>{
//         return console.error(err);
//     })
// }

// using async await to make the code smaller and easier to understand
module.exports.home = async function(req,res){

    try{
        // Populate the user of each post
    let posts = await Post.find({})
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