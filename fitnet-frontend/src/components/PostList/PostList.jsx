import React, { useEffect, useState } from 'react';
import Post from '../Post/Post.jsx';
import './PostList.css';

const PostList = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch('http://localhost:5000/posts');
            const data = await response.json();
            if (data.success) {
                setPosts(data.posts);
            }
        };
        fetchPosts();
    }, []);

    return (
        <div className="post-list">
            {posts.map((post) => (
                <Post key={post._id} post={post} />
            ))}
        </div>
    );
};

export default PostList;
