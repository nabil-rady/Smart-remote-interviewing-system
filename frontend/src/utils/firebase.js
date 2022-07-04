import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { initializeApp } from 'firebase/app';
const firebaseConfig = {
  apiKey: 'AIzaSyDuqj0k4SCgC-KQjHnZhV4dLxMDI8NaiS8',
  authDomain: 'vividly-notification.firebaseapp.com',
  projectId: 'vividly-notification',
  storageBucket: 'vividly-notification.appspot.com',
  messagingSenderId: '964487453958',
  appId: '1:964487453958:web:6aec3a85035401f4e4d287',
  measurementId: 'G-J37GV7XH33',
};

initializeApp(firebaseConfig);
const messaging = getMessaging();
export const requestForToken = async () => {
  let currentToken = await getToken(messaging, {
    vapidKey:
      'BLnEuxOsyO88f7HpkkWh5ZiNUSgdy6zVUs9S7FZmikAHd7ku2J5MZSIUZYuHGL2tXc_9YxMQ4jxSohqvLYX0u8w',
  });
  if (currentToken) {
    console.log('Current token for client: ', currentToken);
    return currentToken;
  } else {
    console.log(
      'No registration token available. Request permission to generate one.'
    );
  }
};
export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
  });
