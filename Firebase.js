import firebase from 'firebase';
import {useEffect} from 'react';

const firebaseConfig = {
  apiKey: 'AIzaSyA3zYO_PyF343OsVEnNe3ksM9hiqHZjcQc',
  authDomain: 'chat-app-42d0e.firebaseapp.com',
  databaseURL: 'https://chat-app-42d0e.firebaseio.com',
  projectId: 'chat-app-42d0e',
  storageBucket: 'chat-app-42d0e.appspot.com',
  messagingSenderId: '543531536922',
  appId: '1:543531536922:web:dfa60f497ebe3757e737a3',
  measurementId: 'G-VK5SF8R4ZB',
};

class Firebase {
  constructor() {
    this.initFirebase();
    this.checkAuth();
  }

  initFirebase = () => {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
  };

  checkAuth = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) firebase.auth().signInAnonymously();
    });
  };

  send = (messages) => {
    messages.forEach((item) => {
      const message = {
        text: item.text,
        timestamp: firebase.database.ServerValue.TIMESTAMP,
        user: item.user,
      };

      this.db.push(message);
    });
  };

  parse = (message) => {
    const {user, text, timestamp} = message.val();
    const {key: _id} = message;
    const createdAt = new Date(timestamp);

    return {
      _id,
      createdAt,
      text,
      user,
    };
  };

  get = (callback) => {
    this.db.on('child_added', (snapshot) => callback(this.parse(snapshot)));
  };

  off() {
    this.db.off();
  }

  get db() {
    return firebase.database().ref('messages');
  }

  get uid() {
    return (firebase.auth().currentUser || {}).uid;
  }
}

export default new Firebase();
