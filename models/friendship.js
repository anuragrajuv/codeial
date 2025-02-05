const mongoose = require('mongoose');

const friendshipSchema = new mongoose.Schema({
    // the user who sent the request
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    // to whom the request was sent
    friendId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
        validate:{
            validator:function(value){
                return this.userId.toString()!=value.toString();
            },
            message:'You cannot send a friend request to yourself'
        }
    }
},{timestamps:true});

friendshipSchema.index({userId:1,friendId:1},{unique:true});

const Friendship = mongoose.model('Friendship',friendshipSchema);
module.exports = Friendship;