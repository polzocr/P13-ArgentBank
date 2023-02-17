import { Outlet, useNavigate } from 'react-router-dom'
import './index.css'
import Header from '../../components/Header/index'
import Footer from '../../components/Footer/index'
import { useEffect, useState } from 'react'
import { useStore } from 'react-redux'
import { remembered, reset as resetLogin } from '../../features/login'
import { fetchingProfilInfos } from '../../features/profil'
import { removeLocalStorage } from '../../services/LocalStorage/localStorage'


export default function Layout(){

    const store = useStore()
    const navigate = useNavigate()
    const [showing, setShowing] = useState(false)
    
    useEffect(() => {
        storeUserLocalStorage()
    }, [])

    function storeUserLocalStorage(){
        const userLocalObject = JSON.parse(localStorage.getItem('user'))
        if(userLocalObject !== null){
            store.dispatch(remembered(userLocalObject))
            fetchingProfilInfos(store, userLocalObject.token)
                .then(() => {
                    const status = store.getState().profil.status
                    if (status === 'rejected') {
                        navigate('/login')
                        removeLocalStorage()
                        resetLogin()
                    }                     
                })
                .catch((err) => {
                    console.log("erreur  catch")
                    console.log(err)
                })
        }
        setShowing(true)  
    }

    return (
        <>
            {showing && 
            <>
                <Header />
                <Outlet />
                <Footer />
            </>
            }
        </>
    )
}