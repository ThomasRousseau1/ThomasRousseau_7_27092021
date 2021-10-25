import React from 'react'
import '../styles/UserAccount.css'
import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle, faTrash } from '@fortawesome/free-solid-svg-icons'

function userAccount() {
    const user = JSON.parse(localStorage.getItem('user'))

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
            <FontAwesomeIcon icon={faUserCircle} className="connexion-feed"><img src="" className="profile-img" alt="Votre avatar"/></FontAwesomeIcon>
                <h2>Vos informations</h2>
                Votre prénom :
                <input type="text" className="input" placeholder={user['firstName']}></input>
                Votre nom :
                <input type="text" className="input" placeholder={user['lastName']}></input>
                Votre email :
                <input type="email" placeholder="toto123@gmail.com" className="input" placeholder={user['email']}></input>
                <Link to="/post"><button className="login-button">Enregistrer</button></Link>
                <Link to="/signup"><button onClick={e => deleteAccount(e, user.id)} className="delete-user">Supprimer le compte <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon></button></Link>
            </form>
        </div>
    )
}

export default userAccount