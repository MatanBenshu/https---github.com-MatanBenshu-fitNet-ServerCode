const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const User = require('../models/User');


router.post('/', async (req, res) => {
    const { userId, sportType, activityDate, ageRange, minParticipants, maxParticipants, activityInfo } = req.body;
    console.log('Received data:', req.body); // Log the received data
    try {
        const newPost = new Post({
            user: userId,
            sportType,
            activityDate,
            ageRange,
            minParticipants,
            maxParticipants,
            activityInfo
        });
        await newPost.save();
        res.status(201).json({ success: true, message: 'Post created successfully', post: newPost });
    } catch (error) {
        console.error('Error creating post:', error); // Log the error
        res.status(500).json({ success: false, message: 'Error creating post' });
    }
});

router.get('/get',async(req,res) =>{

    try {
        const posts = await Post.find().populate('user').populate('participants');
        res.status(200).json({ success: true, posts });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching posts' });
    }

}
)
module.exports = router;