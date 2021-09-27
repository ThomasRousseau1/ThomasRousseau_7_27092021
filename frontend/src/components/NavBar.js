import React from 'react'
import {Link} from 'react-router-dom'

function NavBar() {
    return (
        <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Signup</Link></li>
            <li><Link to="/post">Post</Link></li>
        </ul>
    )
}

export default NavBar