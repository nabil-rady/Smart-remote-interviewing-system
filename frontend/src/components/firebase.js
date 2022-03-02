import firebase from 'firebase/compat/app';
import 'firebase/compat/messaging';

const firebaseConfig = {
  apiKey: 'AIzaSyDuqj0k4SCgC-KQjHnZhV4dLxMDI8NaiS8',
  authDomain: 'vividly-notification.firebaseapp.com',
  projectId: 'vividly-notification',
  storageBucket: 'vividly-notification.appspot.com',
  messagingSenderId: '964487453958',
  appId: '1:964487453958:web:93e6d088edf1bb5fe4d287',
  measurementId: 'G-G29W0NWEVB',
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();
// export const getToken = (setTokenFound) => {
//     return messaging.getToken({vapidKey: 'GENERATED_MESSAGING_KEY'}).then((currentToken) => {
//       if (currentToken) {
//         console.log('current token for client: ', currentToken);
//         setTokenFound(true);
//         // Track the token -> client mapping, by sending to backend server
//         // show on the UI that permission is secured
//       } else {
//         console.log('No registration token available. Request permission to generate one.');
//         setTokenFound(false);
//         // shows on the UI that permission is required
//       }
//     }).catch((err) => {
//       console.log('An error occurred while retrieving token. ', err);
//       // catch error while creating client token
//     });
// }

export default { messaging };
