const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Get user profile
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
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


module.exports = router;
