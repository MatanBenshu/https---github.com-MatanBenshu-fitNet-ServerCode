const express = require('express');
const router = express.Router();
const User = require('../models/User');


// Get user profile
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id).populate('followers', 'username email').populate('following', 'username email');
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.status(200).json({ success: true, user });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching user data' });
    }
});

// Update user profile
router.put('/:id', async (req, res) => {
    const { firstName, lastName, email, gender, address } = req.body;
    try {
        const user = await User.findByIdAndUpdate(req.params.id, { firstName, lastName, email, gender, address }, { new: true });
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        res.status(200).json({ success: true, message: 'Profile updated successfully', user });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error updating profile' });
    }
});

// Follow a user
router.post('/:id/follow', async (req, res) => {
    try {
        const userToFollow = await User.findById(req.params.id);
        const currentUser = await User.findById(req.body.userId);

        if (!userToFollow || !currentUser) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        if (userToFollow.followers.includes(req.body.userId)) {
            return res.status(400).json({ success: false, message: 'You are already following this user' });
        }

        userToFollow.followers.push(req.body.userId);
        currentUser.following.push(req.params.id);

        await userToFollow.save();
        await currentUser.save();

        res.status(200).json({ success: true, message: 'User followed successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error following user' });
    }
});

// Unfollow a user
router.post('/:id/unfollow', async (req, res) => {
    try {
        const userToUnfollow = await User.findById(req.params.id);
        const currentUser = await User.findById(req.body.userId);

        if (!userToUnfollow || !currentUser) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        if (!userToUnfollow.followers.includes(req.body.userId)) {
            return res.status(400).json({ success: false, message: 'You are not following this user' });
        }

        userToUnfollow.followers = userToUnfollow.followers.filter(follower => follower.toString() !== req.body.userId);
        currentUser.following = currentUser.following.filter(following => following.toString() !== req.params.id);

        await userToUnfollow.save();
        await currentUser.save();

        res.status(200).json({ success: true, message: 'User unfollowed successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error unfollowing user' });
    }
});

// Search users
router.get('/search/:query', async (req, res) => {
    try {
      
        const query = req.params.query;
        const users = await User.find({ 
           
            $or: [
                { username: new RegExp(query, 'i') },
                { email: new RegExp(query, 'i') }
            ]
        }).select('username email');

        res.status(200).json({ success: true, users });
    } catch (error) {
    
        res.status(500).json({ success: false, message: 'Error searching users' });
    }
});

router.get('/get/:followingId',async (req,res) =>
{
try{
const followingId = req.params.followingId
const followingData =await User.findById(followingId)

res.status(200).json({ success: true, followingData });
}
catch
{

    res.status(500).json({ success: false, message: 'Error searching users' });
}
}
);
module.exports = router;
