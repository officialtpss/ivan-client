import { useEffect, useState } from "react";
import { onMessageListener, askForPermissionToReceiveNotifications } from "./Helpers/Firebase";
import './App.css';

function App() {

    const [macAddress, setMacAddress] = useState("default");

    useEffect(() => {
        askForPermissionToReceiveNotifications().then(({ token, message }) => {
            console.log('askForPermissionToReceiveNotifications', message);
            setMacAddress(token);
        });

    }, []);

    useEffect(() => {
        onMessageListener().then((message) => {
            console.log('message', message);
        }).catch(err => console.log('failed: ', err));
    }, [onMessageListener]);

    console.log('macAddress', macAddress);
    
    return (
        <div className="App">
            Code will go here!
        </div>
    );
}

export default App;
