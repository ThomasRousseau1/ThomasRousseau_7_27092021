import '../styles/Post.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faWrench, faImage } from '@fortawesome/free-solid-svg-icons'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import Moment from 'react-moment';
import '../styles/Post.css'
import React, { useState, useEffect } from "react";
import axios from 'axios'

const PostList = ({ posts, test }) => {
    const user = JSON.parse(localStorage.getItem('user'));
    const userId = user['id']
    console.log(userId)
    
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
const [content, modifyContent] = useState("")
const [attachement, modifyAttachement] = useState(null)

const modifyPost = (e, id) => {
    let formData = new FormData();
    formData.append('content', content);
    formData.append('attachement', attachement);

    axios({
        method: 'put',
        url: 'http://localhost:3000/api/posts/' + id,
        data: formData,
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token'),
          'Content-Type': 'multipart/form-data',
        },
      })
        .then((res) => {
          console.log(res)
          window.location.reload()
        })
        .catch((err) => {
          console.log(err)
          window.alert('Publication impossible')
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
            <><div key={posts.id} className="post"> 
            {/* revoir le parent  */}
                <div className="post-infos">
                    <div className="post-name">
                        {/* faire condition pour user picture ou non */}
                        <div>
                            <img src={post.User.attachement} className="post-picture" />
                        <FontAwesomeIcon icon={faUserCircle} className="post-user"></FontAwesomeIcon>
                        </div>
                    <div>
                    <p><strong>{post.User.firstName} {post.User.lastName}</strong></p>
                    <Moment format="D MMM YYYY">{post.createdAt}</Moment>
                    </div>
                    </div>
                    {(userId === post.User.id && 
                        <div className="post-actions">
                            <FontAwesomeIcon icon={faWrench} className="deletePost-icon" onClick={() => { setVisible(!visible); setFocusPost(post.id); } }>{visible ? 'Annulez votre modification!' : 'Modifiez votre publication'}</FontAwesomeIcon>
                            <FontAwesomeIcon icon={faTrash} className="deletePost-icon" onClick={e => deletePost(e, post.id)}></FontAwesomeIcon>
                        </div>     
                    )}
                </div>
                {/* <p><strong>{post.title}</strong></p> */}
                <p>{post.content}</p>
                    <img className="post-image" src={post.attachement}/>
                {/* <div className="post-likes">
                    <FontAwesomeIcon icon={faThumbsUp}></FontAwesomeIcon>
                    <p>{post.likes}</p>
                </div>
                <div className="Likes-comments">
                    <p>J'aime</p>
                    <p>Commenter</p>
                </div> */}
                <div className="post-border">
                </div>
            
                <form  onSubmit={e => addComment(e, post.id)}>
                <label>
                    <br/>
                    {/* Voir pour donner un aspect de textarea */}
                    <input type="text" name="comment" placeholder="Votre commentaire..." maxLength="250" value={comment.id} onChange={e => newComment(e.target.value)}></input>
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
                            {(userId === comment.User.id && 
                            <FontAwesomeIcon icon={faTrash} className="deleteComment-icon" onClick={e => deleteComment(e, comment.id)}></FontAwesomeIcon>
                            )}
                            </div>
                    </div> 
                })}
            </div>  
            <div className="modify-post">
                    {visible && focusPost === post.id &&
                        <form className="modify-form" onSubmit={e => modifyPost(e, post.id)}>
                            <h2 className="modify-title">Modifiez votre publication</h2>
                            <div className="modify-inputs">
                                <label htmlFor="content" className="modify-label">
                                    <textarea type="text" name="message" placeholder="Modifiez votre publication" className="modify-textarea" defaultValue={post.content} onChange={e => modifyContent(e.target.value)}></textarea>
                                </label>
                                <input type="file" name="attachement" className="input-file" onChange={(e) => modifyAttachement(e.target.files[0])}></input>
                                <label htmlFor="attachement" className="file-cover">
                                <FontAwesomeIcon icon={faImage} className="file-icon"></FontAwesomeIcon>
                                    <img className="post-image" src={post.attachement}/>
                                </label>
                            </div>
                            <button className="login-button" onClick={modifyPost}>Enregistrer</button>
                        </form>}
                </div>  
            </div>           
                </>
        ))}

    </div>
    
);
}

export default PostList;