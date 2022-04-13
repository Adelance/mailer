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
            type: ADD_MAIL,
            payload: data
        });

    } catch(err) {
        dispatch({
            type: MAILS_ERROR,
            payload: err.response.data
        })
    }
}

export const updateMail = mail => async dispatch => {
    try {
        setLoading();
        console.log(mail)
        const res  = await fetch(`/mails/${mail.id}`, {
            method: 'PUT',
            body: JSON.stringify(mail),
            headers: {
                'Content-Type': 'application/json'
            }
        }); 

        const data = await res.json();

        dispatch({
            type: UPDATE_MAIL,
            payload: data
        });
    } catch(err) {
        dispatch({
            type: MAILS_ERROR,
            payload: err.response.data
        })
    }
};

export const getMails = (sortedBy = null, direction = true) => async dispatch => {
    try {
        setLoading();
        const res = await fetch('/mails');
        const data = await res.json();
        
        switch(sortedBy){
            case 'title':
                data.sort((a,b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0))
                break;

            case 'date':
                data.sort((a,b) => {
                    return new Date(b.date) - new Date(a.date);
                  });
                break;
        }
        if(direction) data.reverse()

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

        await fetch(`/mails/${id}`, {
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

export const searchMails = (text) => async dispatch => {
    try {
        setLoading();
        const res = await fetch(`/mails?q=${text}`); 
        const data = await res.json();

        dispatch({
            type: SEARCH_MAILS,
            payload: data
        });
    } catch(err) {
        dispatch({
            type: MAILS_ERROR,
            payload: err.response.data
        })
    }
};

export const setCurrent = mail => {
    return{
        type: SET_CURRENT,
        payload: mail
    }

}

export const clearCurrent = () => {
    return{
        type: CLEAR_CURRENT,
    }

}

export const setLoading = () => {
    return {
        type: SET_LOADING
    };
};