import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
    apiKey: "AIzaSyAmFEE1CfdBG9OeHlH9JjVBESnqOtr62tE",
    authDomain: "ivan-react-app.firebaseapp.com",
    projectId: "ivan-react-app",
    storageBucket: "ivan-react-app.appspot.com",
    messagingSenderId: "845018454604",
    appId: "1:845018454604:web:36fe71685124fa4a8672e9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

const askForPermissionToReceiveNotifications = async () => {

    try {

        const permission = await Notification.requestPermission();

        if (permission === 'granted') {

            const vapObject = { vapidKey: "BDuvg6oBLy1LgyPciZw8WVk9sfxwAzfjc1BvhZQBsu3Rr64RVHBtuQUxuk5oou7LM7NZIfHYewvPvzPnD7phKzA" };

            return getToken(messaging, vapObject).then((currentToken) => currentToken).catch((error: any) => {
                throw error;
            });

        } else {
            return "default";
        }

    } catch (error: any) {
        throw new Error(error.message);
    }
};

export const onMessageListener = () =>
    new Promise((resolve) => {
        onMessage(messaging, (payload) => {
            resolve(payload);
        });
    });

export { messaging, askForPermissionToReceiveNotifications };
export default app;