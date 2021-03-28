import axios from "axios"
import { toast } from 'react-toastify'

export const handleLoginBtn = async (email, password) => {
    try {
        const { data } = await axios.post('/auth/login', { email, password })
        console.log(data)
        localStorage.setItem('token', data.token)
        localStorage.setItem('userId', data.userId)
        toast.success(data.msg)
        window.location.href = '/'
    } catch (error) {
        toast.error(error.response.data.msg)
    }

}

export const handleSignupBtn = async (name, email, password) => {
    try {
        const { data } = await axios.post('/auth/signup', { name, email, password })
        await toast.success(data.msg)
        window.location.href = '/auth/login'
    } catch (error) {
        toast.error(error.response.data.msg)
        console.log(error.response)
    }

}