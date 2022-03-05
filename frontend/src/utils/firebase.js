import firebaseConfig from './firebaseConfig';
import firebase from 'firebase/compat/app';

firebase.initializeApp(firebaseConfig);
export default firebase.messaging;
