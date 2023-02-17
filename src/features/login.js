import { createSlice } from "@reduxjs/toolkit"
import { selectorLogin } from "../utils/Redux/selectors"


const initialState = {
    status: 'void',
    data: null,
    error: null
}

export async function loginWithFormData(store, userData){
    const status = selectorLogin(store.getState()).status
    if(status === 'updating' || status === 'pending'){
        return
    }
    store.dispatch(actions.fetching())
    try {
        const response = await fetch('http://localhost:3001/api/v1/user/login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: userData.userName,
                password: userData.password
            })
        })
        const data = await response.json()
        if (!data.body) {
            throw data.message
        } else {
            store.dispatch(actions.resolved(data.body))
            console.log("connexion réussie")
            
        }
    } catch (error) {
        store.dispatch(actions.rejected(error))
        console.log('connexion échouée')
    }
}


const {actions, reducer } = createSlice({
    name: 'user',
    initialState,
    reducers: {
        fetching: (draft, action) => {
            if(draft.status === 'void'){
                draft.status = 'pending'
                return
            }
            if(draft.status === 'resolved'){
                draft.status = 'updating'
                return
            }
            if(draft.status === 'rejected'){
                draft.status = 'pending'
                draft.error = null
            }
        },
        resolved: (draft, action) => {
            if(draft.status === 'pending' || draft.status === 'updating'){
                draft.status = 'resolved'
                draft.data = action.payload
                return
            }
            return
        },
        rejected: (draft, action) => {
            if (draft.status === 'pending' || draft.status === 'updating') {
                draft.status = 'rejected'
                draft.error = action.payload
                draft.data = null
                return
            }
            return
        },
        reset: (draft, action) => {
            draft.status = 'void',
            draft.error = null,
            draft.data = null
            return
        }
    }
})

export const {reset} = actions 
export default reducer