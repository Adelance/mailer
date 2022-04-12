import React, { Fragment, useEffect } from 'react';
import SearchBar from './components/layout/SearchBar';
import Mails from './components/mails/Mails';
import 'materialize-css/dist/css/materialize.min.css';
import M from 'materialize-css/dist/js/materialize.min.js';
import store from './store';
import { Provider } from 'react-redux';

const App = () => {
  useEffect(()=>{
    //Init Materialize JS
    M.AutoInit();
  });

  return (
    
    <Provider store = {store}>
    <Fragment>
      <SearchBar />
      <div className='container'>

        <Mails />
      </div>
    </Fragment>
    </Provider>
  );
}

export default App;
