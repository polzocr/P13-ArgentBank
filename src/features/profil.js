import { createSlice } from "@reduxjs/toolkit"
import { selectorProfil } from "../utils/Redux/selectors"

const initialState = {
    status: 'void',
    data: null,
    error: null,
}

/**
 * PROFIL POST METHOD using actions 
 * @param {Object} store 
 * @param {String} token 
 * @returns 
 */
export async function fetchingProfilInfos(store, token) {
    //checking status
    const status = selectorProfil(store.getState()).status
    if (status === 'updating' || status === 'pending') {
        return
    }
    //status pending... or status updating...
    store.dispatch(actions.fetching())
    try {
        const response = await fetch('http://localhost:3001/api/v1/user/profile', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
        const data = await response.json()
        
        if (!data.body) {
            throw data.message
        } else {
            //status resolved + data in state
            store.dispatch(actions.resolved(data.body))
            console.log("Profil recupéré")

        }
    } catch (error) {
        //status rejected + error in state
        store.dispatch(actions.rejected(error))
        console.log(error)
    }
}

/**
 * PROFIL PUT METHOD using actions 
 * @param {Object} store 
 * @param {String} token 
 * @param {Object} userData formData for changing profil
 * @returns 
 */
export async function updatingProfilInfos(store, token, userData) {
    const status = selectorProfil(store.getState()).status
    if (status === 'updating' || status === 'pending') {
        return
    }
    store.dispatch(actions.fetching())
    try {
        const response = await fetch('http://localhost:3001/api/v1/user/profile', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                firstName: userData.firstName,
                lastName: userData.lastName
            })
        })
        const data = await response.json()
        
        if (!data.body) {
            throw data.message
        } else {
            store.dispatch(actions.resolved(data.body))
            console.log("Profil modifié")

        }
    } catch (error) {
        store.dispatch(actions.updateRejected(error))
        console.log(error)
    }
}

const {actions, reducer} = createSlice({
    name:'profil',
    initialState,
    reducers: {
        fetching: (draft, action) => {
            if (draft.status === 'void') {
                draft.status = 'pending'
                return
            }
            if (draft.status === 'resolved') {
                draft.status = 'updating'
                return
            }
            if (draft.status === 'rejected') {
                draft.status = 'pending'
                draft.error = null
            }
        },
        resolved: (draft, action) => {
            if (draft.status === 'pending' || draft.status === 'updating') {
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
        updateRejected: (draft, action) => {
            if (draft.status === 'pending' || draft.status === 'updating') {
                draft.status = 'rejected'
                draft.error = action.payload
                return
            }
            return
        },
        reset: (draft, action) => {
            draft.status = 'void'
            draft.data = null
            draft.error = null
        }
    }
})

export const {reset} = actions
export default reducer