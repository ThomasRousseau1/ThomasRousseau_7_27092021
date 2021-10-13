import React, { useEffect, useState} from 'react'
import '../styles/Home.css'
import {Link} from 'react-router-dom'
import logo from '../assets/icon-left-font.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faNewspaper, faUserCircle } from '@fortawesome/free-solid-svg-icons'
import PostList from './PostList';

function Home() {
    // const [listPost, setListPost] = useState([]);
    // useEffect ( () => {
    //     fetch('http://localhost:3000/api/posts', {
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //     })
    //     .then(res => res.json())
    //     .then(res => {
    //         setListPost(res.data)
    //     })
    // }, [])
    // console.log(listPost)
    const [posts, setPosts] = useState(null);

    useEffect(() => {
        fetch('http://localhost:3000/api/posts')
            .then(res => {
                return res.json();
            })
            .then((data) => {
                setPosts(data);
            })
    }, []);//tableau de dépendences vide qui permet de render la fonction une seule fois

    return (
        <div>
            {posts && <PostList posts={posts} title="All Posts!"  />}
        </div>

    //     <div className="lmj-banner">
    //         <div className="connexion-search">
    //             <input type="text" placeholder="Rechercher un utilisateur..."/>
    //         <Link to="/post"><FontAwesomeIcon icon={faNewspaper } className="connexion-feed"></FontAwesomeIcon></Link>
    //         </div>
    //     <img src={logo} alt='Groupomania logo' className='lmj-logo'></img>
    //     <div className="connexion-banner">
    //         <div className="connexion-img"><Link to="/profile"><FontAwesomeIcon icon={faUserCircle } className="connexion-user"></FontAwesomeIcon></Link></div>
    //         <p className="connexion-disconnect" onClick={(e) => {
    //                 window.localStorage.removeItem('token')
    //               }}><Link to="/login">Déconnexion</Link></p>
    //     </div>
    // </div>
    )
}

export default Home


// <div>
// { listPost.map( (post, key) => {
    
//     return <div key={key}>
//         <h1>{post.title}</h1>
//         <div>{post.content}</div>
//         <div>{post.attachement}</div>
//         <div>{post.likes}</div>
//     </div>
// })}
// </div>