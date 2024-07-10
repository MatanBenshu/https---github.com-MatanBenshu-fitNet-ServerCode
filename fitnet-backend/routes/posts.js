const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const User = require('../models/User');

// Route to create a new post
router.post('/post', async (req, res) => {
    const { userId, sportType, activityDate, ageRange, minParticipants, maxParticipants, activityInfo } = req.body;
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
        res.status(500).json({ success: false, message: 'Error creating post' });
    }
});

// Route to fetch all posts
router.get('/', async (req, res) => {
    try {
        const posts = await Post.find().populate('user').populate('participants');
        res.status(200).json({ success: true, posts });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error fetching posts' });
    }
});

// Route to commit to a post
router.post('/commit/:postId', async (req, res) => {
    const { userId } = req.body;
    const { postId } = req.params;
    try {
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ success: false, message: 'Post not found' });
        }
        if (post.participants.length >= post.maxParticipants) {
            return res.status(400).json({ success: false, message: 'Maximum participants reached' });
        }
        post.participants.push(userId);
        await post.save();
        res.status(200).json({ success: true, message: 'Committed to the post successfully' });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Error committing to post' });
    }
});

module.exports = router;
