import {
    USER_LOADED,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    ALL_CUSTOMERS_LOADED,
    OPERATOR_LOGIN_FAIL,
    OPERATOR_LOGIN_SUCCESS,
    OPERATOR_SIGNUP_SUCCESS,
} from '../actions/types'

const initialState = {
    
    token: typeof window !== "undefined" ? sessionStorage.getItem('token') : false,
    isAuthenticated: null,
    loading: true,
    usersLoading: true,
    user: null,
    users: null,
    operator: null
}

export default function(state = initialState, action) {
    const { type, payload } = action
    console.log(payload)
    switch(type) {
        case LOGIN_SUCCESS:
        // case REGISTER_SUCCESS:
            sessionStorage.setItem('token', payload.token)
            return {
                ...state,
               ...payload,
               isAuthenticated: true,
               loading: false, 
            }
        case LOGIN_FAIL:
        // case AUTH_ERROR:
        // case REGISTER_FAIL:
        // case LOGOUT:
            sessionStorage.removeItem('token')
            return {
                ...state,
               token: null,
               isAuthenticated: false,
               loading: false
            }

        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: payload
            }
        case ALL_CUSTOMERS_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                usersLoading: false,
                users: payload
            }
        case OPERATOR_SIGNUP_SUCCESS:
        case OPERATOR_LOGIN_SUCCESS:
            sessionStorage.setItem('token', payload.authToken)
            return {
                ...state,
                token: payload.authToken,
                operator: payload.operator,
                isAuthenticated: true,
                loading: false, 
            }
                       
        default:
            return state    
    }
}