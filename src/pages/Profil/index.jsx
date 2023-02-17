import './index.css'
import Welcome from '../../components/Welcome/index'
import Transaction from '../../components/Transaction/index'
import { useEffect } from 'react'
import { useSelector, useStore } from 'react-redux'
import { selectorLogin, selectorProfil } from '../../utils/Redux/selectors'
import { Navigate, useNavigate} from 'react-router-dom'
import { fetchingProfilInfos } from '../../features/profil'


export default function Profil() {

    const login = useSelector(selectorLogin)
    const profil = useSelector(selectorProfil)
    const store = useStore()
    const navigate = useNavigate()

    if(!login.data){
        return <Navigate to='/login' replace="true"/>
    } 

    useEffect(() => {
        fetchingProfilInfos(store, login.data.token)
    }, [])

    useEffect(() => {
        // if(profil.error){
        //     navigate('/login')
        // }
    }, [profil])


    return (
        <main className='main bg-dark'>
            <Welcome />
            <h2 className='sr-only'>Accounts</h2>
            <Transaction />
            <Transaction />
            <Transaction />
        </main>
    )
}