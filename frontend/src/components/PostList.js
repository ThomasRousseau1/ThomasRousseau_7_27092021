import '../styles/Post.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp, faTrash, faWrench, faImage } from '@fortawesome/free-solid-svg-icons'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import Moment from 'react-moment';
import '../styles/Post.css'
import React, { useState, useEffect } from "react";

const PostList = ({ posts, test }) => {
    
const deletePost = (e, id) => {
    e.preventDefault()
    fetch('http://localhost:3000/api/posts/' + id, {
    method: 'DELETE',
    headers: {
        Authorization:'Bearer '+localStorage.getItem('token'),
        'Content-Type': 'application/json'
    },
    })
    .then(res => res.json())
    .then(() => {
            window.location.href = "/home";
        })
    .catch( (error) => {
        alert(error)
        console.log(error)
    })
}

const [focusPost, setFocusPost] = useState(-1);
const [visible, setVisible] = useState(false);
// const [title, modifyTitle] = useState("")
const [content, modifyContent] = useState("")
const [attachement, modifyAttachement] = useState("")
// const [likes, modifyLikes] = useState("")

// const formData = new FormData();

// formData.append("file", { uri: "file://path/to/image.png", type: "image/png" });
// console.log(formData);

const modifyPost = (e, id) => {

    const data = { 
        // title: title, 
        content: content,
        attachement: attachement, 
        likes: 1
    }

    e.preventDefault()
    fetch('http://localhost:3000/api/posts/' + id, {
    method: 'PUT',
    body: JSON.stringify(data),
    headers: {
        Authorization:'Bearer '+localStorage.getItem('token'),
        'Content-Type': 'application/json'
    },
    })
    .then(res => res.json())
    .then(() => {
            window.location.href = "/home";
        })
    .catch( (error) => {
        alert(error)
        console.log(error)
    })
}
 


//Get all comments
const getAllComments = () => {
    fetch('http://localhost:3000/api/comments/', {
    headers: { 
        Authorization:'Bearer '+localStorage.getItem('token'),
        'Content-Type': 'application/json',
    },})
    .then(res => res.json())  
    .then(data => setComments(data))}

const [listComments, setComments] = useState([]);
useEffect ( getAllComments, [])



//Create a comment
const [comment, newComment] = useState("")
const addComment = (e, id) => {
    e.preventDefault()

    const data = {comment: comment}
    fetch('http://localhost:3000/api/comments/' + id, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            Authorization:'Bearer '+localStorage.getItem('token'),
            'Content-Type': 'application/json'
        }
    })
    .then((res) => res.json())
    .then(() => {
        getAllComments();
    })
    .catch( (error) => {
        alert(error)
        console.log(error)
    })
}


const deleteComment = (e, id) => {
    e.preventDefault()
    fetch('http://localhost:3000/api/comments/' + id, {
    method: 'DELETE',
    headers: {
        Authorization:'Bearer '+localStorage.getItem('token'),
        'Content-Type': 'application/json'
    },
    })
    .then(res => res.json())
    .then(() => {
            window.location.href = "/home";
        })
    .catch( (error) => {
        alert(error)
        console.log(error)
    })
}


return (
    <div className="App-posts">
        <h2>{ test }</h2>
        {posts.map((post) => (
            <><div className="post"> 
            {/* revoir le parent  */}
                <div className="post-infos">
                    <div className="post-name">
                        <div>
                        <FontAwesomeIcon icon={faUserCircle} className="post-user"></FontAwesomeIcon>
                        </div>
                    <div>
                    <p><strong>{post.User.firstName} {post.User.lastName}</strong></p>
                    <Moment format="D MMM YYYY">{post.createdAt}</Moment>
                    </div>
                    </div>
                    <div className="post-actions">
                        <FontAwesomeIcon icon={faWrench} className="deletePost-icon" onClick={() => { setVisible(!visible); setFocusPost(post.id); } }>{visible ? 'Annulez votre modification!' : 'Modifiez votre publication'}</FontAwesomeIcon>
                        <FontAwesomeIcon icon={faTrash} className="deletePost-icon" onClick={e => deletePost(e, post.id)}></FontAwesomeIcon>
                    </div>
                </div>
                {/* <p><strong>{post.title}</strong></p> */}
                <p>{post.content}</p>
                <div>{post.attachement}</div>
                <div className="post-likes">
                    <FontAwesomeIcon icon={faThumbsUp}></FontAwesomeIcon>
                    {/* <p>{post.likes}</p> */}
                </div>
                <div className="Likes-comments">
                    <p>J'aime</p>
                    <p>Commenter</p>
                </div>
            
                <form  onSubmit={e => addComment(e, post.id)}>
                <label>
                    <br/>
                    <textarea type="text" name="comment" placeholder="Votre commentaire..." maxLength="250" value={comment.id} onChange={e => newComment(e.target.value)}></textarea>
                </label>
        
                <button type="submit" className="login-button">Commenter</button>
            </form>
            <div>
                { listComments.filter((comment) => comment.PostId === post.id).map((comment, id) => {
                    return <div key={id} className="comments-container">
                            <div className="comments-infos">
                            <p className="comments-user">{comment.User.firstName} {comment.User.lastName}</p>
                            <p className="comments-date">Le <Moment format="D MMM YYYY">{comment.createdAt}</Moment></p>
                        </div>
                        <div className="comments-content">
                            {comment.comment}
                            <FontAwesomeIcon icon={faTrash} className="deleteComment-icon" onClick={e => deleteComment(e, comment.id)}></FontAwesomeIcon>
                        </div>
                    </div> 
                })}
            </div>  
            <div className="modify-post">
                    {visible && focusPost === post.id &&
                        <form className="modify-form" onSubmit={e => modifyPost(e, post.id)}>
                            <h2 className="modify-title">Modifiez la publication</h2>
                            <div className="modify-inputs">
                                {/* <label>
                                    <input type="text" name="titre" placeholder="Titre" value={title} onChange={e => modifyTitle(e.target.value)}></input>
                                </label> */}
                                <label htmlFor="content">
                                    <textarea type="text" name="message" placeholder="Contenu" className="modify-textarea" value={content} onChange={e => modifyContent(e.target.value)}></textarea>
                                </label>
                                    <input type="file" name="image" accept=".jpg" placeholder="Image" value={attachement} onChange={e => modifyAttachement(e.target.files[0])}></input>
                                    <label htmlFor="attachement" className="file-cover">
                                    <FontAwesomeIcon icon={faImage} className="file-icon"></FontAwesomeIcon>
                                </label>
                                {/* <label>
                                    <input type="text" name="likes" placeholder="Likes" value={likes} onChange={e => modifyLikes(e.target.value)}></input>
                                </label> */}
                            </div>
                            <button className="login-button">Enregistrer</button>
                        </form>}
                </div>  
            </div>           
                </>
        ))}

    </div>
    
);
}

export default PostList;