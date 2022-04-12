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
} from './types'

export const addMail = (mail) => async dispatch => {
    try {
        setLoading();
        const res = await fetch('/mails', {
            method: 'POST',
            body: JSON.stringify(mail),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await res.json();
        dispatch({
            type: GET_MAILS,
            payload: data
        });

    } catch(err) {
        dispatch({
            type: MAILS_ERROR,
            payload: err.response.data
        })
    }
}


export const getMails = () => async dispatch => {
    try {
        setLoading();
        const res = await fetch('/mails');
        const data = await res.json();
        dispatch({
            type: GET_MAILS,
            payload: data
        });

    } catch(err) {
        dispatch({
            type: MAILS_ERROR,
            payload: err.response.data
        })
    }
}

export const deleteMail = (id) => async dispatch => {
    try {
        setLoading();

        const res = await fetch(`/mails/${id}`, {
            method: 'DELETE'
        });

        dispatch({
            type: DELETE_MAIL,
            payload: id
        });

    } catch(err) {
        dispatch({
            type: MAILS_ERROR,
            payload: err.response.data
        })
    }
}

export const setCurrent = log => {
    return{
        type: SET_CURRENT,
        payload: log
    }

}

export const setLoading = () => {
    return {
        type: SET_LOADING
    };
};