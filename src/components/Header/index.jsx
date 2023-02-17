import { Link } from 'react-router-dom'
import logo from '../../assets/images/argentBankLogo.png'
import './index.css'

export default function Header() {
    return (
        <nav className='main-nav'>
            <Link to='/' className='main-nav-logo'>
                <img src={logo} alt="Argent Bank Logo" className='main-nav-logo-image'/>
                <h1 className='sr-only'>Argent Bank</h1>
            </Link>
            <div>
                <Link to='/login' className='main-nav-item'>
                    <i className='fa fa-user-circle'></i>
                    <span>Sign In</span> 
                </Link>
                <Link to='/login' className='main-nav-item'>
                    <i className='fa fa-user-circle'></i>
                    <span>Profil</span>
                </Link>
                {/* <Link to='/' className='main-nav-item'>
                    <i className='fa fa-sign-out'></i>
                    <span>Sign Out</span> 
                </Link> */}
            </div>
        </nav>
    )
}