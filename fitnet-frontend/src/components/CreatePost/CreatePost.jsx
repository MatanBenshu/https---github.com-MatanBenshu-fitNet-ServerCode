import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import './CreatePost.css';

const CreatePost = () => {
    const [sportType, setSportType] = useState('');
    const [activityDate, setActivityDate] = useState('');
    const [ageRange, setAgeRange] = useState('');
    const [minParticipants, setMinParticipants] = useState('');
    const [maxParticipants, setMaxParticipants] = useState('');
    const [activityInfo, setActivityInfo] = useState('');
    const [message, setMessage] = useState('');
    const { authState } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('http://localhost:5000/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: authState.user._id,
                sportType,
                activityDate,
                ageRange,
                minParticipants,
                maxParticipants,
                activityInfo
            }),
        });

        const data = await response.json();
        if (data.success) {
            setMessage('Post created successfully!');
        } else {
            setMessage('Error creating post: ' + data.message);
        }
    };

    return (
        <div className="create-post">
            <h2>Create Post</h2>
            <form onSubmit={handleSubmit}>
                <label>Sport Type:</label>
                <input
                    type="text"
                    required
                    value={sportType}
                    onChange={(e) => setSportType(e.target.value)}
                />
                <label>Activity Date:</label>
                <input
                    type="date"
                    required
                    value={activityDate}
                    onChange={(e) => setActivityDate(e.target.value)}
                />
                <label>Age Range:</label>
                <input
                    type="text"
                    required
                    value={ageRange}
                    onChange={(e) => setAgeRange(e.target.value)}
                />
                <label>Minimum Participants:</label>
                <input
                    type="number"
                    required
                    value={minParticipants}
                    onChange={(e) => setMinParticipants(e.target.value)}
                />
                <label>Maximum Participants:</label>
                <input
                    type="number"
                    required
                    value={maxParticipants}
                    onChange={(e) => setMaxParticipants(e.target.value)}
                />
                <label>Activity Information:</label>
                <textarea
                    required
                    value={activityInfo}
                    onChange={(e) => setActivityInfo(e.target.value)}
                ></textarea>
                <button type="submit">Create Post</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default CreatePost;
