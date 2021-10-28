import React, { useState } from 'react'
import '../styles/UserAccount.css'
import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle, faTrash } from '@fortawesome/free-solid-svg-icons'

function UserAccount() {
    const user = JSON.parse(localStorage.getItem('user'))
    const[image, modifyImage] = useState(null)
    const [firstName, modifyFirstName] = useState("")
    const [lastName, modifyLastName] = useState("")
    const [email, modifyEmail] = useState("")
    const modifyAccount = (e, id) => {
        const data = {
            attachement: image ? image : user.image, 
            firstName: firstName ? firstName : user.firstName,
            lastName: lastName ? lastName : user.lastName,
            email: email ? email : user.email
        }
    
        e.preventDefault()
        fetch('http://localhost:3000/api/users/' + id, {
        method: 'PUT',
        body: JSON.stringify(data),
        headers: {
            Authorization:'Bearer '+localStorage.getItem('token'),
            'Content-Type': 'application/json'
        },
        })
        .then(res => res.json())
        .then(
            (res) => {
                console.log(res)
                localStorage.setItem('user', JSON.stringify(data))
            })       
        .then(() => {
                window.location.href = "/home";
            })
        .catch( (error) => {
            alert(error)
            console.log(error)
        })
    }



    const deleteAccount = (e, id) => {
        e.preventDefault()

        fetch('http://localhost:3000/api/users/' + id, {
            method: 'DELETE',
            headers: {
                Authorization:'Bearer '+localStorage.getItem('token'),
                'Content-Type': 'application/json'
            }
        })
            .then((res) => res.json())
            .then(() => {
                window.localStorage.removeItem('token');
                window.localStorage.removeItem('user');
                window.location.href = '/signup';
            })
            .catch((err) => {
                console.log(err)
                window.alert('Suppression du compte impossible !')
              })
    }
    return (
        
        <div className="App-connect">
            <form className="form">
            <input type="file" name="attachement"   onChange={(e) => modifyImage(e.target.files[0])}></input>
            <FontAwesomeIcon icon={faUserCircle} className="connexion-feed"><img src="" className="profile-img" alt="Votre avatar"/></FontAwesomeIcon>
                <h2>Vos informations</h2>
                Votre prénom :
                <input type="text" className="input" placeholder={user['firstName']} id="firstName" value={firstName} onChange={e => modifyFirstName(e.target.value)}></input>
                Votre nom :
                <input type="text" className="input" placeholder={user['lastName']} id="lastName" value={lastName} onChange={e => modifyLastName(e.target.value)}></input>
                Votre email :
                <input type="email" placeholder="toto123@gmail.com" className="input" placeholder={user['email']} id="email" value={email} onChange={e => modifyEmail(e.target.value)}></input>
                <button className="login-button" onClick={e => modifyAccount(e, user.id)}>Enregistrer</button>
                <Link to="/signup"><button onClick={e => deleteAccount(e, user.id)} className="delete-user">Supprimer le compte <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon></button></Link>
            </form>
        </div>
    )
}

export default UserAccount