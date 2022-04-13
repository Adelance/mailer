import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { updateMail } from '../../actions/mailActions';
import { connect } from 'react-redux'
import M from 'materialize-css/dist/js/materialize.min.js'

const EditMailModal = ({ current, updateMail }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if(current){
      setTitle(current.title);
      setContent(current.content);
    }
  }, [current]);

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
    } else if(title.length < 3 || title.length >= 250){
      M.toast({ html: 'Tytuł musi zawierać od 3 do 250 znaków'});
    } else {
      const updMail = {
        id: current.id,
        title, 
        content, 
        date: getDate()
      }

      updateMail(updMail);
      M.toast({ html: `E-mail został zaktulizowany` });
      setTitle('');
      setContent('');
    }
   
  }

  return (
    <div id='edit-mail-modal' className='modal' style={modalStyle}>
      <div className='modal-content'>
        <h4>Wprowadź zmianę</h4>
        <div className='row'>
          <div className='input-field'>
            <input
              type='text'
              name='title'
              value={title}
              onChange={e => setTitle(e.target.value)}
              
            />
            <label className="active"> Tytuł </label>
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
            <label className="active"> Treść </label>
          </div>
        </div>        

      </div>
      <div className='modal-footer'>
        <a
          href='#!'
          onClick={onSubmit}
          className='modal-close waves-effect blue waves-light btn orange darken-2'
        >
          Aktualizuj
        </a>
      </div>
    </div>
  )
}

const modalStyle = {
  width: '75%',
  height: '75%'
}

EditMailModal.propTypes = {
  current: PropTypes.object,
  updateMail: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  current: state.mail.current
})

export default connect(mapStateToProps, { updateMail })(EditMailModal);