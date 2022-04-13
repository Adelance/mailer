import React, { Fragment, useEffect, useState } from 'react'
import MailItem from './MailItem';
import Preloader from '../layout/Preloader'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getMails } from '../../actions/mailActions';
import { nanoid } from 'nanoid';

const Mails = ({ mail: { mails, loading}, getMails}) => {
    const [sortedBy, setSortedBy] = useState(null);
    const [sortDirection, setSortDirection] = useState(false);

    useEffect(() => {
        getMails(sortedBy, sortDirection);
        // eslint-disable-next-line
    }, [sortedBy, sortDirection])

    const sortMails = (keyword) => {       
        setSortedBy(keyword);
        (sortedBy === keyword)? setSortDirection(!sortDirection) : setSortDirection(false);
    }

    if(loading || mails === null) {
        return <Preloader />
    }

    return (
        <Fragment>
            <div className='right-align'>
                <a
                href='#add-mail-modal'
                className="btn orange darken-2 modal-trigger"
                >
                Dodaj
                </a>
            </div>
            
            <table className = "centered">
                <thead>
                    <tr>
                        <th><a href='#!' onClick={() => sortMails('title') } className="black-text">Tytuł {sortedBy === 'title' ? (
                            !sortDirection ? <span className="material-icons">keyboard_arrow_down</span> : <span className="material-icons">keyboard_arrow_up</span>
                        ) : (<span>   </span>)}</a></th>

                        <th>Treść wiadomości</th>

                        <th><a href='#!' onClick={() => sortMails('date')} className="black-text">Data dodania{sortedBy === 'date' ? (
                            !sortDirection ? <span className="material-icons">keyboard_arrow_down</span> : <span className="material-icons small">keyboard_arrow_up</span>
                        ) : (<span>   </span>)}</a></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {!loading && mails.length === 0 ? (
                        <p className='center'>Skrzynka Pusta</p>
                    ) : (
                        mails.map(mail => <MailItem mail={mail} key={mail.id}/>)
                    )}   
                </tbody> 
            </table>
        </Fragment>
    )
}

Mails.propTypes = {
    mail: PropTypes.object.isRequired,
    getMails: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    mail: state.mail
})

export default connect(mapStateToProps, { getMails })(Mails);