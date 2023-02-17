import './index.css'
import Welcome from '../../components/Welcome/index'
import Transaction from '../../components/Transaction/index'
import { useEffect } from 'react'
import { useSelector, useStore } from 'react-redux'
import { selectorConnected, selectorProfil, selectorToken } from '../../utils/Redux/selectors'
import { Navigate, useNavigate} from 'react-router-dom'
import { fetchingProfilInfos } from '../../features/profil'


export default function Profil() {

    const token = useSelector(selectorToken)
    const connected = useSelector(selectorConnected)
    const profil = useSelector(selectorProfil)
    const store = useStore()
    const navigate = useNavigate()

    if (!connected){
        return <Navigate to='/login' replace="true"/>
    } 

    useEffect(() => {
        
        fetchingProfilInfos(store, token)
        .then(() => {
            const status = store.getState().profil.status
            if (status === 'rejected') {
                navigate('/login')
            }
        })
        
    }, [])


    return (
        <>
            {profil.data && 
            <main className='main bg-dark'>
                <Welcome />
                <h2 className='sr-only'>Accounts</h2>
                <Transaction />
                <Transaction />
                <Transaction />
            </main>}
        </>
        
    )
}