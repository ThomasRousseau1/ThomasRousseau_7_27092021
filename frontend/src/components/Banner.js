// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import logo from '../assets/icon-left-font.png'
import '../styles/Banner.css'

function Banner() {
    
    return (
        <div className="lmj-banner">
            <img src={logo} alt='Groupomania logo' className='lmj-logo'></img>
            {/* <FontAwesomeIcon icon={fa-user-circle}></FontAwesomeIcon> */}
        </div>
    )
}

export default Banner