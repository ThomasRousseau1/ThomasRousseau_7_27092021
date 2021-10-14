import React, { useEffect, useState} from 'react'
import '../styles/Home.css'
import PostList from './PostList';

function Home() {

    const [posts, setPosts] = useState(null);
    console.log(posts);

    useEffect(() => {
        fetch('http://localhost:3000/api/posts', 
        {
            headers: {
            Authorization:'Bearer ' + localStorage.getItem('token'),
            'Content-Type': 'application/json'
        }})
            .then(res => {
                return res.json();
            })
            .then((data) => {
                setPosts(data);
            })
    }, []);//tableau de dépendences vide qui permet de render la fonction une seule fois

    return (
        <div>
            {posts && <PostList posts={posts} title="All Posts!" />}
        </div>

    )
}

export default Home