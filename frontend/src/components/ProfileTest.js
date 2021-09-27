import React from 'react'
import '../styles/ProfileTest.css'
import {Link} from 'react-router-dom'

function ProfileTest() {
    return (
        
        <div className="App-connect">
            <img />
            <form className="form">
                <img src="https://images.radio-canada.ca/q_auto,w_1250/v1/ici-info/16x9/dexter-saison-9-retour-michael-c-hall-tueur-en-serie.jpg" className="profile-img"/>
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