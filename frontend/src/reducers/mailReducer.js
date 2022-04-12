import {
    ADD_MAIL,
    DELETE_MAIL,
    UPDATE_MAIL,
    GET_MAILS,
    MAILS_ERROR,
    SEARCH_MAILS,
    SET_CURRENT,
    CLEAR_CURRENT,
    SET_LOADING
    
} from '../actions/types'


const initialState = {
    mails: null,
    current: null,
    loading: false,
    error: null
}


export default( state = initialState, action ) => {
    switch(action.type) {
        case ADD_MAIL:
            
            return{
                ...state, 
                mails: [...state.mails, action.payload],
                loading: false
            };
        case DELETE_MAIL:
            return{
                ...state, 
                mails: state.mails.filter(mail => mail.id !== action.payload),
                loading: false
            };
        case UPDATE_MAIL:
            return{
                ...state, 
                mails: state.mails.map(mail => mail.id === action.payload),
                loading: false
            };
        case GET_MAILS:
            return{
                ...state, 
                mails: action.payload,
                loading: false
            };

        case MAILS_ERROR:
            console.log(action.payload);
            return{
                ...state, 
                error: action.payload
            };
        case SEARCH_MAILS:
            return{
                ...state, 
                logs: action.payload,
                loading: false
            };
        case SET_CURRENT:
            return{
                ...state, 

            };
        case CLEAR_CURRENT:
            return{
                ...state, 
                current: null,
                loading: false
            };
        
        case SET_LOADING:
            return{
                ...state, 
                loading: true
            };
        
        default:
            return state;
    }
}