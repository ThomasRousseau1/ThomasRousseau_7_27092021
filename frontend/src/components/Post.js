import React from 'react'
import '../styles/Post.css'
import {Link} from 'react-router-dom'
import logo from '../assets/icon-left-font.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faNewspaper, faUserCircle } from '@fortawesome/free-solid-svg-icons'

function Home() {
    return (
        <div className="lmj-banner">
            <div className="connexion-search">
                <input type="text" placeholder="Rechercher un utilisateur..."/>
            <Link to="/post"><FontAwesomeIcon icon={faNewspaper } className="connexion-feed"></FontAwesomeIcon></Link>
            </div>
        <img src={logo} alt='Groupomania logo' className='lmj-logo'></img>
        <div className="connexion-banner">
            <div className="connexion-img"><Link to="/profile"><FontAwesomeIcon icon={faUserCircle } className="connexion-user"></FontAwesomeIcon></Link></div>
            <a className="connexion-disconnect"><Link to="/login">Déconnexion</Link></a>
        </div>
    </div>
    )
}

export default Home
