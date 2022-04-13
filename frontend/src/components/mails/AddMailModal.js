import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { addMail } from '../../actions/mailActions';
import { connect } from 'react-redux'
import M from 'materialize-css/dist/js/materialize.min.js'

const AddMailModal = ({ addMail }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');


  const getDate = () => {
    var d = new Date(),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) 
        month = '0' + month;
    if (day.length < 2) 
        day = '0' + day;

    return [year, month, day].join('-');
  }

  const onSubmit = () => {
    if(title === '' ||content === ''){
      M.toast({ html: 'Podaj tytuł oraz treść'});
    } else if(title.length <= 3 || title.length >= 250){
      M.toast({ html: 'Tytuł musi zawierać od 3 do 250 znaków'});
    } else {

      const newMail = {
        title, 
        content, 
        date: getDate()
      }

      addMail(newMail);
      M.toast({ html: `New Mail Added` });
    }
    setTitle('');
    setContent('');
  }

  return (
    <div id='add-mail-modal' className='modal' style={modalStyle}>
      <div className='modal-content'>
        <h4>Nowy E-mail</h4>
        <div className='row'>
          <div className='input-field'>
            <input
              type='text'
              name='title'
              value={title}
              onChange={e => setTitle(e.target.value)}
            />
            <label> Tytuł </label>
          </div>
        </div>        

        <div className='row'>
          <div className='input-field'>
            <textarea
              className="materialize-textarea"
              name='content'
              value={content}
              onChange={e => setContent(e.target.value)}
            />
            <label> Treść </label>
          </div>
        </div>        

      </div>
      <div className='modal-footer'>
        <a
          href='#!'
          onClick={onSubmit}
          className='modal-close waves-effect blue waves-light btn orange darken-2'
        >
          Dodaj
        </a>
      </div>
    </div>
  )
}

const modalStyle = {
  width: '75%',
  height: '75%'
}

AddMailModal.propTypes = {
  addMail: PropTypes.func.isRequired,
}

export default connect(null, { addMail })(AddMailModal);