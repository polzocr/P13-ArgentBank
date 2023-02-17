import {configureStore} from '@reduxjs/toolkit'
import loginReducer from '../../features/login'
import profilReducer from '../../features/profil'

export default configureStore({
    reducer: {
        login: loginReducer,
        profil: profilReducer,
    }
})