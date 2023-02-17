import { useState } from 'react'
import './index.css'
import { loginWithFormData } from '../../features/user'
export default function Form() {

    const [form, setForm] = useState({
        userName: '',
        password: ''
    })

    function handleSubmit(e){
        e.preventDefault()
        console.log(form)
        loginWithFormData(form)
    }

    function handleChange(e) {
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