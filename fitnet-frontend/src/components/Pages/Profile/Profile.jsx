import React, { useContext } from 'react';
import { AuthContext } from '../../../context/AuthContext.js';
import PostList from '../../PostList/PostList.jsx';
import './Profile.css';

const Profile = () => {
    const { authState } = useContext(AuthContext);

    return (
        <div className="profile">
            <h2>{authState.user.username}'s Profile</h2>
            <PostList />
        </div>
    );
};

export default Profile;
