const onMessageListener = (messaging) =>
  new Promise((resolve) => {
    messaging.onMessage((payload) => {
      resolve(payload);
    });
  });

const setFirebaseMessageListenerEvent = (messaging) => {
  return onMessageListener();
};

const getFirebaseToken = (messaging) => {
  return messaging.getToken();
};

export { setFirebaseMessageListenerEvent, getFirebaseToken };
