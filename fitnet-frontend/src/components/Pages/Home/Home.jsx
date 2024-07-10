import React from 'react'
import PostList from '../../PostList/PostList.jsx';
import CreatePost from '../../CreatePost/CreatePost.jsx';
import NavBar from '../navBar/navBar.jsx';
function Home ()  {
  return (
    <div className="home">
        <CreatePost />
        <PostList />
    </div>
);
}
export default Home