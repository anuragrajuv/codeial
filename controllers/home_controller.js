const Post = require("../models/post");
const User = require("../models/user");
const { posts } = require("./posts_controller");

module.exports.home = function(req,res){
    // console.log(req.cookies);
    // res.cookie('user_id',25)
    // Post.find({})
    // .then((posts)=>{
    //     return res.render('home',{
    //         title:"Codeial|Home",
    //         posts:posts
    //     });
    // })
    // .catch((err)=>{
    //     return console.error(err);
    // })

    // Populate the user of each post
    Post.find({})
    .populate('user')
    .populate({
        path:'comments',
        populate:{
            path:'user'
        }
    })
    .exec()
    .then((posts)=>{
        User.find({})
        .then(users=>{
            return res.render('home',{
                title:"Codeial|Home",
                posts:posts,
                all_users:users
            });
        })
        .catch(err=>{
            return console.error(err);            
        })
        
    })
    .catch((err)=>{
        return console.error(err);
    })
}

module.exports.actionName = function(req,res){
    return res.end("humne kya bigada tha tera")
}