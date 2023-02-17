import './index.css'
import { useState } from 'react'
import { loginWithFormData } from '../../features/login'
import { useSelector, useStore} from 'react-redux'
import { useNavigate} from 'react-router-dom'
import { selectorProfil } from '../../utils/Redux/selectors'

export default function Form() {

    const store = useStore()
    const navigate = useNavigate()
    const profil = useSelector(selectorProfil)

    const [form, setForm] = useState({
        userName: '',
        password: '',
        remember: false,
    })
    const [error, setError] = useState(false)


    function handleChange(e) {
        if (error) {
            setError(false)
        }
        setForm((prevState) => {
            const input = e.target
            return {
                ...prevState,
                [input.name]: input.name === 'remember' ? input.checked : input.value
            }
        })
    }

    function handleSubmit(e){
        e.preventDefault()
        loginWithFormData(store, form)
        .then(() => {
            const login = store.getState().login
            if(login.status === 'rejected'){
                setError(true)
            } else {
                if(form.remember){
                    saveUserLocalStorage(login)
                }
                navigate('/profil')
            }
        })
    }

    function saveUserLocalStorage(login) {
        const localUserObject = JSON.stringify(login.data)
        localStorage.setItem('user', localUserObject)
        
    }

    

    return (
        <section className='sign-in-content'>
            <i className='fa fa-user-circle sign-in-icon'></i>
            <h1>Sign In</h1>
            {error && <p className='error-message'>Informations erronées</p>}
            <form onSubmit={handleSubmit}>
                <div className='input-wrapper'>
                    <label htmlFor="username">Username</label>
                    <input type="text" id='username' name="userName" value={form.userName} onChange={handleChange}/>
                </div>
                <div className='input-wrapper'>
                    <label htmlFor="password">Password</label>
                    <input type="password" id='password' name='password' value={form.password} onChange={handleChange} />
                </div>
                <div className='input-remember'>
                    <input type="checkbox" id='remember-me' name='remember' checked={form.remember} onChange={handleChange} />
                    <label htmlFor="remember-me">Remember me</label>
                </div>
                <button className='sign-in-button'>Sign In</button>
            </form>
        </section>
    )
}