export const selectorLogin = (state) => {
    return state.login
}

export const selectorConnected = (state) => {
    return state.login.status === 'resolved'
}

export const selectorProfil = (state) => {
    return state.profil
}