import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    status: 'void',
    data: null,
    error: null
}

export async function loginWithFormData(userData){
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
        console.log(data)
        if (!data.body) {
            throw data.message
        } else {

        }
    } catch (error) {
        console.log(error)
    }
}



const {actions, reducer } = createSlice({
    name: 'user',
    initialState,
    reducers: {

    }
})

export default reducer