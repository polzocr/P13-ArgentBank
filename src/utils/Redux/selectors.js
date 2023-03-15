/**
 * 
 * @param {Object} state 
 * @returns {Object} login state
 */
export const selectorLogin = (state) => {
    return state.login
}

/**
 * 
 * @param {Object} state 
 * @returns {Boolean} connected or not
 */
export const selectorConnected = (state) => {
    return state.login.status === 'resolved'
}
/**
 * 
 * @param {Object} state 
 * @returns {String} connexion token
 */
export const selectorToken = (state) => {
    return state.login.data?.token
}

/**
 * 
 * @param {Object} state 
 * @returns {Object} profil state
 */
export const selectorProfil = (state) => {
    return state.profil
}