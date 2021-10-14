import React, { useState } from 'react'
import '../styles/Post.css'


function Post() {
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [attachement, setAttachement] = useState("")
    const [likes, setLikes] = useState("")

    const handleSubmit = e => {
        e.preventDefault()

        const data = { 
            title: title, 
            content: content,
            attachement: attachement, 
            likes: 1
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
        console.log(data);
    }

    return (
        <div className="App-body">
            <form className="App-post" onSubmit={e => handleSubmit(e)}>
                <h1>Publier :</h1>
                <label>
                    Titre :
                    <br/>
                    <input type="text" name="titre" value={title} onChange={e => setTitle(e.target.value)}></input>
                </label>
                <label>
                    Content :
                    <br/>
                    <input type="text" name="message" value={content} onChange={e => setContent(e.target.value)}></input>
                </label>
                <label>
                    Votre image :
                    <br/>
                    <input type="text" name="image" value={attachement} onChange={e => setAttachement(e.target.value)}></input>
                </label>
                <label>
                    Likes
                    <br/>
                    <input type="text" name="likes" value={likes} onChange={e => setLikes(e.target.value)}></input>
                </label>
                <button className="login-button">Publier</button>
            </form>
        </div>
    )
}



export default Post; 