import React from 'react'
import '../styles/ProfileTest.css'
import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'

function ProfileTest() {
    return (
        
        <div className="App-connect">
            <form className="form">
            <FontAwesomeIcon icon={faUserCircle} className="connexion-feed"><img src="" className="profile-img" alt="Votre avatar"/></FontAwesomeIcon>
                <h2>Votre profil</h2>
                Votre prénom :
                <input type="text" className="input"></input>
                Votre nom :
                <input type="text" className="input"></input>
                Votre email :
                <input type="email" placeholder="toto123@gmail.com" className="input"></input>
                Votre mot de passe :
                <input type="password" placeholder="Strongestpasswordever8" className="input"></input>
                <Link to="/post"><button className="login-button">Enregistrer</button></Link>
            </form>

        </div>
    )
}

export default ProfileTest