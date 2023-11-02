import {
    EXCLUSIVE_TRIPS_LOADED,
    EXCLUSIVE_TRIPS_ERROR,
    REGULAR_TRIPS_LOADED,
    REGULAR_TRIPS_ERROR,
    ALL_TRIPS_LOADED,
    TRIP_LOADED
} from '../actions/types'

const initialState = {
    token: typeof window !== "undefined" ? sessionStorage.getItem('token') : false,
    isAuthenticated: true,
    loadingExclusive: true,
    loadingRegular: true,
    exclusiveTrips: null,
    regularTrips: null,
    loadingAllTrips: true,
    allTrips: null,
    trip: null,
    tripLoading: true
}

export default function(state = initialState, action) {
    const { type, payload } = action

    switch(type) {
        
        case REGULAR_TRIPS_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loadingRegular: false,
                regularTrips: payload
            }

        case EXCLUSIVE_TRIPS_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loadingExclusive: false,
                exclusiveTrips: payload
            }

        case ALL_TRIPS_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loadingAllTrips: false,
                allTrips: payload
            }
        
        case TRIP_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                tripLoading: false,
                trip: payload
            }
        default:
            return state    
    }
}