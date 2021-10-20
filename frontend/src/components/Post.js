import React, { useState } from 'react'
import '../styles/Post.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage } from '@fortawesome/free-solid-svg-icons'

function Post() {
    const [content, setContent] = useState("")
    const [attachement, setAttachement] = useState("")

    const handleSubmit = e => {
        e.preventDefault()

        const data = {  
            content: content,
            attachement: attachement, 
        }


        fetch('http://localhost:3000/api/posts', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('token')
        },
    })
    .then(res => res.json())
    .then(() => {
        window.location.href = '/Home'
    })
        .catch( (error) => {
            alert(error)
        })
    }

    return (
        <div className="App-body">
            <form className="App-post" onSubmit={e => handleSubmit(e)}>
                <h1>Exprimez-vous :</h1>
                <label>
                    <br/>
                    <textarea type="text" name="message" placeholder="Quoi de neuf ${User.firstName}?" className="textarea" maxLength="250" value={content} onChange={e => setContent(e.target.value)}></textarea>
                </label>
                <input type="file" name="image"   accept=".jpg" placeholder="Image" className="input-file" value={attachement} onChange={e => setAttachement(e.target.value)}></input>
                <label htmlFor="attachement" className="file-cover">
                <FontAwesomeIcon icon={faImage} className="file-icon"></FontAwesomeIcon>
                </label>
                <button className="login-button">Publier</button>
            </form>
        </div>
    )
}



export default Post; 