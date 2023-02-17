export const selectorLogin = (state) => {
    return state.login
}

export const selectorConnected = (state) => {
    return state.login.status === 'resolved'
}

export const selectorToken = (state) => {
    return state.login.data?.token
}

export const selectorProfil = (state) => {
    return state.profil
}