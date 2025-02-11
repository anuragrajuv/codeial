const Post = require("../models/post");
const User = require("../models/user");
const { posts } = require("./posts_controller");
const Friendship = require("../models/friendship");

// using async await to make the code smaller and easier to understand
module.exports.home = async function(req,res){

    try{
        // Populate the user of each post
    let posts = await Post.find({})
    .sort('-createdAt')
    .populate('user')
    .populate({
        path:'comments',
        populate:[
            {
                path:'user',
                select:'name'
            },
            {
                path:'likes'
            }
        ]
    })
    .populate('likes');


    let users = await User.find({});
    if (req.user) {
        let user = await User.findById(req.user._id).select('friendships name');
        let friendsNames = [];
        for (let i = 0; i < user.friendships.length; i++) {
            let friend = await User.findById(user.friendships[i]).select('name');
            friendsNames.push(friend);
            }
            console.log(friendsNames);

            return res.render('home',{
                title:"Codeial|Home",
                posts:posts,
                all_users:users,
                all_friends:friendsNames
            });
    }else{
        return res.render('home',{
            title:"Codeial|Home",
            posts:posts,
            all_users:users,
        });
    }
    
    
    }catch(err){
        console.error('Error',err);
    }
}

module.exports.actionName = function(req,res){
    return res.end("humne kya bigada tha tera")
}