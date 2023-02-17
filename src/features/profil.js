import { createSlice } from "@reduxjs/toolkit"
import { selectorProfil } from "../utils/Redux/selectors"

const initialState = {
    status: 'void',
    data: null,
    error: null,
}

export async function fetchingProfilInfos(store, token) {
    const status = selectorProfil(store.getState()).status
    if (status === 'updating' || status === 'pending') {
        return
    }
    store.dispatch(actions.fetching())
    try {
        const response = await fetch('http://localhost:3001/api/v1/user/profile', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Beaazrer ${token}`
            },
        })
        const data = await response.json()
        console.log('ici', data)
        if (!data.body) {
            throw data.message
        } else {
            store.dispatch(actions.resolved(data.body))
            console.log("Profil recupéré")

        }
    } catch (error) {
        store.dispatch(actions.rejected(error))
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
        }
    }
})

export default reducer