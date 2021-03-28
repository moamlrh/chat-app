import axios from 'axios'
import { toast } from 'react-toastify'

export const getAllConversations = async () => {
    try {
        const { data } = await axios.get('/conversation/get-user-conversations')
        return data
    } catch (error) {
        console.log(error.response)
        await toast.error(error.response.data.msg)
    }
}

export const getAllUsers = async () => {
    try {
        const { data } = await axios.get('/users/get-all-users')
        console.log(data)
        if (!data.users) return
        return data
    } catch (error) {
        console.log(error.response)
        await toast.error(error.response.data.msg)
    }
}

export const getMyInfoAsUser = async () => {
    try {
        const { data } = await axios.get('/users/get-my-info')
        return data.user
    } catch (error) {
        console.log(error.response)
        await toast.error(error.response.data.msg)
    }
}

export const getConversationById = async (id) => {
    try {
        const { data } = await axios.get(`/conversation/get-conversation-by-id/${id}`)
        console.log(data)
        if (!data.conversation) return
        return data.conversation
    } catch (error) {
        console.log(error)
        return toast.error(error.response.data.msg)
    }
}


export const handleSendMessage = async (msg, conversationId, setInputValue) => {
    setInputValue('')
    // socket.emit('new-msg', msg)
    try {
        const { data } = await axios.post(`/conversation/add-new-message-to-conversation/${conversationId}`, { text: msg })
        return data.message;
    } catch (error) {
        console.log(error)
        return toast.error(error.response.data.msg)
    }
}

export const handleCreateNewConversation = async (userId) => {
    try {
        const { data } = await axios.post(`/conversation/create-new-conversation`, { targetUserId: userId })
        console.log(data)
        return data.conversation;
    } catch (error) {
        console.log(error)
        return toast.error(error.response.data.msg)
    }
}