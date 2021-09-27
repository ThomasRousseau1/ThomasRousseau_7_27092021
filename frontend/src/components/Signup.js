import React from 'react'
import '../styles/Signup.css'
import {Link} from 'react-router-dom'
import logo2 from '../assets/icon-above-font.png'


function Signup() {
    return (
        <div>
            <div className="App-connect">
            <img  src={logo2} className="logo2"/>
            <h1>Bienvenue</h1>
            <form className="form">
                <h2>Inscrivez-vous</h2>
                Votre prénom :
                <input type="text" placeholder="John" className="input"></input>
                Votre nom : 
                <input type="text" placeholder="Doe" className="input"></input>
                Votre email :
                <input type="email" placeholder="toto123@gmail.com" className="input"></input>
                Votre mot de passe :
                <input type="password" placeholder="Strongestpasswordever8" className="input"></input>
                <Link to="/post"><button className="login-button">Connexion</button></Link>
            </form>
            <p>Vous avez déjà un compte ? <Link to="/login">Se connecter</Link></p>
        </div>
        </div>
    )
}

export default Signup