import React from 'react'
import '../styles/Login.css'
import {Link} from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import logo2 from '../assets/icon-above-font.png'

function Login() {

    return (
        <div className="App-connect">
            <img  src={logo2} className="logo2"/>
            <h1>Bienvenue</h1>
            <form className="form">
                <h2>Se connecter</h2>
                Votre email :
                <input type="email" placeholder="toto123@gmail.com" className="input"></input>
                Votre mot de passe :
                <input type="password" placeholder="Strongestpasswordever8" className="input"></input>
                <Link to="/post"><button className="login-button">Connexion</button></Link>
            </form>
            <p>Vous n'avez pas de compte ? <a><Link to="/signup">S'inscrire</Link></a></p>
        </div>
    )
}

export default Login 