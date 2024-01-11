import axios from 'axios'

const API_URL = '/auth/users/'

const register = async (userData) => {
    const response = await axios.post('/api/users/', userData)

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data
}
const login = async (userData) => {
    const response = await axios.post('/api/users/' + 'login', userData)

    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data))
    }
    return response.data
}

const logout = async () => {
 localStorage.removeItem('user')
}

const authService = {
    register, logout, login
}

export default authService