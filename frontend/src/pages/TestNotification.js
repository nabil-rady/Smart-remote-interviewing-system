// // import React, { useState } from 'react';
// // import { Button, Toast } from 'react-bootstrap';
// // import 'bootstrap/dist/css/bootstrap.min.css';
// // import firebase from 'firebase/compat/app';
// // import 'firebase/compat/messaging';

// // function NotificationTest() {
// //   const firebaseConfig = {
// //     apiKey: 'AIzaSyDuqj0k4SCgC-KQjHnZhV4dLxMDI8NaiS8',
// //     authDomain: 'vividly-notification.firebaseapp.com',
// //     projectId: 'vividly-notification',
// //     storageBucket: 'vividly-notification.appspot.com',
// //     messagingSenderId: '964487453958',
// //     appId: '1:964487453958:web:93e6d088edf1bb5fe4d287',
// //     measurementId: 'G-G29W0NWEVB',
// //   };

// //   firebase.initializeApp(firebaseConfig);
// //   const messaging = firebase.messaging();
// //   const [show, setShow] = useState(false);
// //   const [notification, setNotification] = useState({
// //     title: '',
// //     body: '',
// //   });

// //   const isTokenFound = false;

// //   const onMessageListener = () =>
// //     new Promise((resolve) => {
// //       messaging.onMessage((payload) => {
// //         resolve(payload);
// //       });
// //     });
// //   onMessageListener()
// //     .then((message) => {
// //       console.log(message);
// //       setNotification(message.notification);
// //       setShow(true);
// //     })
// //     .catch((err) => console.log('failed: ', err));
// //   messaging
// //     .getToken()
// //     .then((token) => {
// //       console.log(token);
// //     })
// //     .catch((err) => {
// //       console.log(err);
// //     });

// //   return (
// //     <div className="App">
// //       <Toast
// //         onClose={() => setShow(false)}
// //         show={show}
// //         delay={10000}
// //         autohide
// //         animation
// //         style={{
// //           position: 'absolute',
// //           top: 20,
// //           right: 20,
// //           minWidth: 200,
// //         }}
// //       >
// //         <Toast.Header>
// //           <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
// //           <strong className="mr-auto">{notification.title}</strong>
// //           <small>just now</small>
// //         </Toast.Header>
// //         <Toast.Body>{notification.body}</Toast.Body>
// //       </Toast>
// //       <header className="App-header">
// //         {isTokenFound && <h1> Notification permission enabled 👍🏻 </h1>}
// //         {!isTokenFound && <h1> Need notification permission ❗️ </h1>}
// //         <Button onClick={() => setShow(true)}>Show Toast</Button>
// //       </header>
// //     </div>
// //   );
// // }

// // export default NotificationTest;

// import React, { useState, useEffect } from 'react';
// import { Button, Toast } from 'react-bootstrap';
// import { requestForToken, onMessageListener } from '../utils/firebaseConfig';

// const Notification = () => {
//   const [notification, setNotification] = useState({ title: '', body: '' });
//   const [show, setShow] = useState(false);
//   // const notify = () => toast(<ToastDisplay />);
//   useEffect(() => {
//     if (notification?.title) {
//       notify();
//     }
//   }, [notification]);

//   requestForToken();

//   onMessageListener()
//     .then((payload) => {
//       setShow(true);
//       console.log(payload);
//       setNotification({
//         title: payload?.notification?.title,
//         body: payload?.notification?.body,
//       });
//     })
//     .catch((err) => console.log('failed: ', err));

//   return (
//     <div className="App">
//       <Toast
//         onClose={() => setShow(false)}
//         show={show}
//         delay={10000}
//         autohide
//         animation
//         style={{
//           position: 'absolute',
//           top: 20,
//           right: 20,
//           minWidth: 200,
//         }}
//       >
//         <Toast.Header>
//           <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" />
//           <strong className="mr-auto">{notification?.title}</strong>
//           <small>just now</small>
//         </Toast.Header>
//         <Toast.Body>{notification?.body}</Toast.Body>
//       </Toast>
//     </div>
//   );
// };

// export default Notification;
