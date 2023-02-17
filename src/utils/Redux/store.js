import {configureStore} from '@reduxjs/toolkit'
import userReducer from '../../features/login'

export default configureStore({
    reducer: {
        login: userReducer,
    }
})