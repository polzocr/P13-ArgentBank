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

    /**
     * if user store in localStorage, get token and refetch profil data
     * if datas are OK with this token, shows UI
     * if datas are not OK with this token, 
     * remove localStorage + resetLogin in Redux + navigate to login + show UI
     */
    function storeUserLocalStorage(){
        const userLocalObject = JSON.parse(localStorage.getItem('user'))
        if(userLocalObject !== null){
            //set token in state
            store.dispatch(remembered(userLocalObject))
            //fetch data with token
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