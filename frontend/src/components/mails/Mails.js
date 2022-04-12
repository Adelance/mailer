import React, { Fragment, useEffect } from 'react'
import MailItem from './MailItem';
import Preloader from '../layout/Preloader'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getMails } from '../../actions/mailActions';

const Mails = ({ mail: { mails, loading}, getMails}) => {

    useEffect(() => {
        getMails();
        // eslint-disable-next-line
    }, [])

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
                        <th>Tytuł</th>
                        <th>Treść wiadomości</th>
                        <th>Data dodania</th>
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