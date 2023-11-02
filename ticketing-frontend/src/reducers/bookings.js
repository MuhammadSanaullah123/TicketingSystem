import {
    ADD_BOOKING_SUCCESS,
    ADD_BOOKING_FAIL,
    PAST_BOOKINGS_LOADED,
    UPCOMING_BOOKINGS_LOADED,
    LOGIN_FAIL,
    LOGIN_SUCCESS
} from '../actions/types'

const initialState = {
    token: typeof window !== "undefined" ? sessionStorage.getItem('token') : false,
    isAuthenticated: null,
    upcomingLoading: true,
    pastLoading: true,
    pastBookings: null,
    upcomingBookings: null,
    bookings: null
}

export default function(state = initialState, action) {
    const { type, payload } = action

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
        

        case PAST_BOOKINGS_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                pastLoading: false,
                pastBookings: payload
            }

        case UPCOMING_BOOKINGS_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                upcomingLoading: false,
                upcomingBookings: payload
            }            
        case ADD_BOOKING_SUCCESS:
            return {
                ...state,
                isAuthenticated: true,
                bookings: payload
            }
        default:
            return state    
    }
}