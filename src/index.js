import React from 'react';
import ReactDOM from 'react-dom';
import Firebase from 'firebase';
import App from './App';
import './index.css';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyADLvcBUyxcY0Pcz3gnx-7LGZop7cuei4Q",
  authDomain: "bozeman-javascript.firebaseapp.com",
  databaseURL: "https://bozeman-javascript.firebaseio.com",
  storageBucket: "bozeman-javascript.appspot.com",
};
Firebase.initializeApp(config);

ReactDOM.render(
  <App firebaseRef={Firebase} />,
  document.getElementById('root')
);
