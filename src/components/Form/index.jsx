import { useState } from 'react'
import './index.css'

export default function Form() {

    const [form, setForm] = useState({
        userName: '',
        password: ''
    })

    function handleSubmit(){
        console.log("")
    }

    function handleChange() {
        console.log("")
    }

    return (
        <section className='sign-in-content'>
            <i className='fa fa-user-circle sign-in-icon'></i>
            <h1>Sign In</h1>

            <form onSubmit={handleSubmit}>
                <div className='input-wrapper'>
                    <label htmlFor="username">Username</label>
                    <input type="text" id='username' value={form.userName} onChange={() => handleChange()}/>
                </div>
                <div className='input-wrapper'>
                    <label htmlFor="password">Password</label>
                    <input type="password" id='password' />
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