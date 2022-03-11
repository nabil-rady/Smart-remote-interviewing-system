const onMessageListener = (messaging) =>
  new Promise((resolve) => {
    messaging.onMessage((payload) => {
      resolve(payload);
    });
  });

const setFirebaseMessageListenerEvent = (messaging) => {
  return onMessageListener(messaging);
};

const getFirebaseToken = (messaging) => {
  return messaging.getToken();
};

export { setFirebaseMessageListenerEvent, getFirebaseToken };
