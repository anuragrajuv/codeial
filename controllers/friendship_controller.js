const Friendship = require('../models/friendship');
const User = require('../models/user');

module.exports.toggleFriendship = async function (req, res) {
    
    const { friendId } = req.body;
    const userId = req.user._id;
    console.log('Received friendId:', req.body.friendId);


    if (!friendId) {
        return res.status(400).json({ message: 'Invalid friendId' });
      }

    try {
        const existingFriendship = await Friendship.findOne({userId,friendId});

        if(existingFriendship){
            await Friendship.deleteOne({_id:existingFriendship._id});
            return res.status(200).json({
                message:"Friend Removed Successfully"
            })
        }else{
            const newFriendship = new Friendship({userId,friendId});
            await newFriendship.save();

            return res.status(200).json({
                message:"Friend added successfully",
                Friendship:newFriendship
            });
        }
    } catch (error) {
        if(error.code === 11000){
            return res.status(400).json({message:"Friendship already exists"});
        }

        return res.status(500).json({
            message:"An Error Occurred while Adding Friend",
            error:error.message
        });
    }
};

