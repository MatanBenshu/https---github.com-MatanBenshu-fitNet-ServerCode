import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext.js';
import './Post.css';

const Post = ({ post }) => {
    const { authState } = useContext(AuthContext);
    const [message, setMessage] = useState('');

    const handleCommit = async () => {
        const response = await fetch(`http://localhost:5000/posts/commit/${post._id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId: authState.user._id }),
        });

        const data = await response.json();
        if (data.success) {
            setMessage('Successfully committed to the activity!');
        } else {
            setMessage('Error committing to the activity: ' + data.message);
        }
    };

    return (
        <div className="post">
            <h3>{post.sportType}</h3>
            <p>Date: {new Date(post.activityDate).toLocaleDateString()}</p>
            <p>Age Range: {post.ageRange}</p>
            <p>Participants: {post.participants.length} / {post.maxParticipants}</p>
            <p>{post.activityInfo}</p>
            {authState.isAuthenticated && !post.participants.includes(authState.user._id) && (
                <button onClick={handleCommit}>Commit to Activity</button>
            )}
            {message && <p>{message}</p>}
        </div>
    );
};

export default Post;
