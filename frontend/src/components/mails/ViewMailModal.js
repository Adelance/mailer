import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { clearCurrent } from '../../actions/mailActions';

const ViewMailModal = ({ current, clearCurrent }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
      if(current){
          setTitle(current.title);
          setContent(current.content);
      }
  }, [current]);

  return (
    <div id='view-mail-modal' className='modal' style={modalStyle}>
      <div className='modal-content'>
        <h4>{title}</h4>
        {content}
        
      </div>
      <div className='modal-footer'>
        <a
          href='#!'
          className='modal-close waves-effect blue waves-light btn orange darken-2'
          onClick={() => clearCurrent()}
        >
          Zamknij
        </a>
      </div>
    </div>
  )
}

const modalStyle = {
  width: '75%',
  height: '75%'
}

ViewMailModal.propTypes = {
  current: PropTypes.object,
  clearCurrent: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  current: state.mail.current
})

export default connect(mapStateToProps, {clearCurrent})(ViewMailModal);