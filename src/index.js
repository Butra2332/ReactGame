import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import firebase from 'firebase/compat';


const firebaseConfig = {
  apiKey: "AIzaSyDHb9g9LAMw5c4IeASp-ftvAUzP0XkPBbI",
  authDomain: "game-949ef.firebaseapp.com",
  databaseURL: "https://game-949ef-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "game-949ef",
  storageBucket: "game-949ef.appspot.com",
  messagingSenderId: "629742670142",
  appId: "1:629742670142:web:030e8973b4dde9d20c1c6f"
};

firebase.initializeApp(firebaseConfig);

export let rerenderTree = () => {
  ReactDOM.render(
    <React.StrictMode>
      <App/>
    </React.StrictMode>,
    document.getElementById('root')
  ); 
}
rerenderTree();


 
