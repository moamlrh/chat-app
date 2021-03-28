import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    users: []
}
const userSlice = createSlice({
    name: 'users-slice',
    initialState,
    reducers: {
        addAllUsers(state, action) {
            return {
                ...state,
                users: action.payload
            }
        },
        addNewUser(state, action) {
            return {
                ...state,
                users: [
                    ...state.users,
                    action.payload
                ]
            }
        },
        removeUserOffline(state,action){
            return {
                ...state,
                users: action.payload
            }
        }
    }
})


export const { addAllUsers, addNewUser, removeUserOffline } = userSlice.actions
export default userSlice.reducer