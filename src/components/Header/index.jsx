import { useSelector, useStore } from 'react-redux'
import { Link } from 'react-router-dom'
import logo from '../../assets/images/argentBankLogo.png'
import { selectorConnected, selectorProfil } from '../../utils/Redux/selectors'
import { reset as resetLogin } from '../../features/login'
import { reset as resetProfil } from '../../features/profil'
import './index.css'

export default function Header() {

    const connected = useSelector(selectorConnected)
    const profil = useSelector(selectorProfil)
    const store = useStore()

    function logout(){
        store.dispatch(resetLogin())
        store.dispatch(resetProfil())
        removeLocalStorage()
    }

    function removeLocalStorage(){
        localStorage.removeItem('user')
    }

    return (
        <nav className='main-nav'>
            <Link to='/' className='main-nav-logo'>
                <img src={logo} alt="Argent Bank Logo" className='main-nav-logo-image'/>
                <h1 className='sr-only'>Argent Bank</h1>
            </Link>
            <div>
                {connected ? (
                    <>
                        <Link to='/profil' className='main-nav-item'>
                            <i className='fa fa-user-circle'></i>
                            <span>{profil.data?.firstName}</span>
                        </Link>
                        <Link to='/' className='main-nav-item' onClick={logout}>
                            <i className='fa fa-sign-out'></i>
                            <span>Sign Out</span>
                        </Link>
                    </>
                ) : (
                    <Link to='/login' className='main-nav-item'>
                        <i className='fa fa-user-circle'></i>
                        <span>Sign In</span>
                    </Link>
                )
                }
            </div>
        </nav>
    )
}