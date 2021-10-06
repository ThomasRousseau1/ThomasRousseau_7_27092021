import  React, { useState } from 'react'
import '../styles/Signup.css'
import {Link} from 'react-router-dom'
import logo2 from '../assets/icon-above-font.png'

function Signup() {
    const [firstName, newFirstName] = useState("")
    const [lastName, newLastName] = useState("")
    const [email, newEmail] = useState("")
    const [password, newPassword] = useState("")
    const [image, newImage] = useState("")


    const handleSubmit = e => {
        e.preventDefault()
        const data = {firstName: firstName, lastName: lastName, email: email, password: password, image: image}

        fetch('http://localhost:3000/api/users/login', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json'
        }
    })
    .then(res => res.data)

    .then(() => {
      window.location.href = "/home";
  })
  .catch( (error) => {
      alert(error)
  })
    }



    return (
        <div>
            <div className="App-connect">
            <img  src={logo2} className="logo2" alt="Logo Groupomania"/>
            <h1>Bienvenue</h1>
            <form className="form" onSubmit={e => handleSubmit(e)}>
                <h2>Inscrivez-vous</h2>
                Votre prénom :
                <input type="text" placeholder="John" className="input" value={firstName} onChange={e => newFirstName(e.target.value)}></input>
                Votre nom : 
                <input type="text" placeholder="Doe" className="input" value={lastName} onChange={e => newLastName(e.target.value)}></input>
                Votre email :
                <input type="email" placeholder="toto123@gmail.com" className="input" value={email} onChange={e => newEmail(e.target.value)}></input>
                Votre mot de passe :
                <input type="password" placeholder="Strongestpasswordever8" className="input" value={password} onChange={e => newPassword(e.target.value)}></input>
                Votre image : 
                <input type="text" placeholder="Your image" className="input" value={image} onChange={e => newImage(e.target.value)}></input>
                <button className="login-button">Créer mon compte</button>
            </form>
            <p>Vous avez déjà un compte ? <Link to="/login">Se connecter</Link></p>
        </div>
        </div>
    )
}

export default Signup