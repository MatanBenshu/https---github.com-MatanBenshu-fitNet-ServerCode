
import React, { useContext } from 'react';
import {Link,NavLink} from 'react-router-dom';
import './navBar.css'
import { AuthContext } from '../../../context/AuthContext';

function NavBar ()  {
    const { authState, logout } = useContext(AuthContext);

    return (
        <nav className="navbar">
            <h1 className="navbar-logo">FitNet</h1>
            {authState.isAuthenticated && (
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/profile">{authState.user.username}'s Profile</Link></li>
                    <li><button onClick={logout}>Logout</button></li>
                </ul>
            )}
        </nav>
    );
}

export default NavBar