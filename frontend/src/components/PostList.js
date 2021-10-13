import { useHistory, useParams } from "react-router-dom";
import '../styles/Post.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons'
import Moment from 'react-moment';

const PostList = ({ posts, title }) => {
    // const history = useHistory();
    // const deletePost = () => {
    //     fetch('http://localhost:3000/api/posts' + id, {
    //         method: 'DELETE'
    //     }).then(() => {
    //         history.push('/');
    //     })
    // }
    
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


    return (
        <div className="App-posts">
            <h2>{ title }</h2>
            {posts.map((post) => (
                <div className="post">
                    <h2>{ post.title }</h2>
                    <Moment format="D MMM YYYY">{post.createdAt}</Moment>
                    <p>{ post.content }</p>
                    <div>{ post.attachement }</div>
                    <div className="post-likes">
                    <FontAwesomeIcon icon={faThumbsUp}></FontAwesomeIcon>
                    <p>{ post.likes }</p>
                    </div>
                    <div className="Likes-comments">
                        <p>J'aime</p>
                        <p>Commenter</p>
                    </div>
                    <button onClick={e => deletePost(e, post.id)}>Supprimer</button>
                    {/* <button onClick={() => handleDelete(post.id)}>Supprimer la publication</button> */}
                </div>
            ))}
        </div>
    );
}

export default PostList;