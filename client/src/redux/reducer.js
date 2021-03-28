import {combineReducers} from '@reduxjs/toolkit'
import userReducer from '../pages/redux/usersSlice'

const reducer = combineReducers({
    users: userReducer
})


export default reducer;