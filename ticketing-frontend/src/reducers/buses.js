import {
    ALL_BUSES_LOADED,
    ALL_BUSES_FAIL,
    ADD_BUS_SUCCESS,
    ADD_BUS_FAIL,
    UPDATE_BUS_SUCCESS,
    UPDATE_BUS_FAIL
} from '../actions/types'

const initialState = {
    
    token: typeof window !== "undefined" ? sessionStorage.getItem('token') : false,
    isAuthenticated: null,
    busesLoading: true,
    busLoading: true,
    buses: null,
    bus: null
}

export default function(state = initialState, action) {
    const { type, payload } = action

    switch(type) {
        // case LOGIN_SUCCESS:
        case ADD_BUS_SUCCESS:
            // sessionStorage.setItem('token', payload.token)
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                busLoading: false, 
            }
        case UPDATE_BUS_SUCCESS:
            // sessionStorage.setItem('token', payload.token)
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                busLoading: false, 
            }
        // case LOGIN_FAIL:
        // case AUTH_ERROR:
        case UPDATE_BUS_FAIL:
        // case LOGOUT:
            // localStorage.removeItem('token')
            return {
                ...state,
               token: null,
               isAuthenticated: false,
               busLoading: false
            }

        case ALL_BUSES_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                buses: payload
            }
        
        default:
            return state    
    }
}