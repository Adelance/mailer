import React from 'react';
import { deleteMail, setCurrent } from '../../actions/mailActions';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import M from 'materialize-css/dist/js/materialize.min.js'

const MailItem = ({ mail, deleteMail, setCurrent }) => {
    const onDelete = () => {
        if(window.confirm('Na pewno chcesz usunąć ten E-mail?')) {
            deleteMail(mail.id);
            M.toast({ html: 'E-mail został usunięty'});
        }
    }

    const shortContent = (content) => { 
        if(content.length > 30){
            let shortedContent = (content.substring(0,30))
            return shortedContent.substring(0, shortedContent.lastIndexOf(' ')) + ' ...'
        } else {
            return content
        }

        
    }

    return (       
        <tr>
            <td>{mail.title}</td>
            <td>{shortContent(mail.content)}</td>
            <td>{mail.date}</td>

            <td className="material-icons">
                visibility
            </td>
            <td className="material-icons">
                edit
            </td>
            <td className="material-icons">
                <a href='#!' onClick={onDelete} className="red-text">delete</a> 
            </td>
        </tr>
    )
}

MailItem.propTypes = {
    mail: PropTypes.object.isRequired,
    deleteMail: PropTypes.func.isRequired,
    setCurrent: PropTypes.func.isRequired
}
export default connect(null, {deleteMail, setCurrent})(MailItem);