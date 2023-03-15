import './index.css'
import Form from '../../components/Form/index'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { selectorLogin } from '../../utils/Redux/selectors'
import { useEffect } from 'react'

export default function SignIn() {
    const login = useSelector(selectorLogin)
    const navigate = useNavigate()
    
    useEffect(() => {
        //redirect if already connected
        if (login?.data) {
            navigate('/')
        }
    }, [])

    return (
        <main className='main bg-dark'>
            <Form />
        </main>
    )
}