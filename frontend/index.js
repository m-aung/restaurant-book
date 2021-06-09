import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import './App.css';

ReactDOM.render(
  <BrowserRouter
    // basename={'/'}
    forceRefresh={false}
    getUserConfirmation={(message, callback) => {
      // this is the default behavior
      const allowTransition = window.confirm(message);
      callback(allowTransition);
    }}
    // keyLength={optionalNumber}
  >
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
