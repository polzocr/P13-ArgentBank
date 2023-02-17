function saveUserLocalStorage(login) {
    const localUserToken = JSON.stringify(login.data)
    localStorage.setItem('user', localUserToken)
}

export function removeLocalStorage() {
    localStorage.removeItem('user')
}