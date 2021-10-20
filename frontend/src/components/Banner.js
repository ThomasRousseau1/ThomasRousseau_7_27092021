import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faUserCircle } from '@fortawesome/free-solid-svg-icons'
import logo from '../assets/icon-left-font.png'
import '../styles/Banner.css'
import {Link} from 'react-router-dom'

function Banner() {
    
    return (
        <div className="lmj-banner">
            <div className="connexion-search">
            <Link to="/home"><FontAwesomeIcon icon={faHome} className="connexion-feed"></FontAwesomeIcon></Link>
            </div>
        <img src={logo} alt='Groupomania logo' className='lmj-logo'></img>
        <div className="connexion-banner">
            <div className="connexion-img"><Link to="/profile"><FontAwesomeIcon icon={faUserCircle} className="connexion-user"></FontAwesomeIcon></Link></div>
            <p className="connexion-disconnect" onClick={(e) => {
                    window.localStorage.removeItem('token')
                  }}><Link to="/login">Déconnexion</Link></p>
        </div>
    </div>
    )
}

export default Banner