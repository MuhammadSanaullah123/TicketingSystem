import {
    ALL_OPERATORS_LOADED,
    ALL_OPERATORS_FAIL,
    OPERATOR_FAIL,
    OPERATOR_LOADED
} from '../actions/types'

const initialState = {
    
    token: typeof window !== "undefined" ? sessionStorage.getItem('token') : false,
    isAuthenticated: null,
    operatorsLoading: true,
    operators: null,
    operator: null,
    operatorLoading: true
}

export default function(state = initialState, action) {
    const { type, payload } = action

    switch(type) {
        // case LOGIN_SUCCESS:
        // case ADD_BUS_SUCCESS:
        //     sessionStorage.setItem('token', payload.token)
        //     return {
        //         ...state,
        //         ...payload,
        //         isAuthenticated: true,
        //         busLoading: false, 
        //     }
        // case LOGIN_FAIL:
        // case AUTH_ERROR:
        // case REGISTER_FAIL:
        // case LOGOUT:
            // localStorage.removeItem('token')
            // return {
            //     ...state,
            //    token: null,
            //    isAuthenticated: false,
            //    loading: false
            // }

        case ALL_OPERATORS_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                operatorsLoading: false,
                operators: payload
            }
        case OPERATOR_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                operatorLoading: false,
                operator: payload
            }
        
        default:
            return state    
    }
}