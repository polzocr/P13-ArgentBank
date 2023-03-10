import './index.css'
import { useState } from 'react'
import { loginWithFormData } from '../../features/login'
import { useStore} from 'react-redux'
import { useNavigate} from 'react-router-dom'

export default function Form() {

    const store = useStore()
    const navigate = useNavigate()

    const [form, setForm] = useState({
        userName: '',
        password: ''
    })
    const [error, setError] = useState(false)


    function handleSubmit(e){
        e.preventDefault()
        loginWithFormData(store, form)
        .then(() => {
            const status = store.getState().login.status
            status === 'rejected' ? setError(true) : navigate('/profil')
        })
    }

    function handleChange(e) {
        if(error){
            setError(false)
        }
        setForm((prevState) => {
            return {
                ...prevState,
                [e.target.name]: e.target.value
            }
        })
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
                    <input type="checkbox" id='remember-me' />
                    <label htmlFor="remember-me">Remember me</label>
                </div>
                <button className='sign-in-button'>Sign In</button>
            </form>
        </section>
    )
}