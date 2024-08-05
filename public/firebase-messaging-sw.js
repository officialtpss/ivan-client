
importScripts('https://www.gstatic.com/firebasejs/8.4.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.4.1/firebase-messaging.js');

firebase.initializeApp({
    apiKey: "AIzaSyAmFEE1CfdBG9OeHlH9JjVBESnqOtr62tE",
    authDomain: "ivan-react-app.firebaseapp.com",
    projectId: "ivan-react-app",
    storageBucket: "ivan-react-app.appspot.com",
    messagingSenderId: "845018454604",
    appId: "1:845018454604:web:36fe71685124fa4a8672e9"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
    
    console.log('Received background message ', payload);
    const notificationTitle = payload.notification.title;
    const notificationOptions = { body: payload.notification.body };
    self.registration.showNotification(notificationTitle, notificationOptions);
});