import { Layout, Menu, notification } from 'antd';
import { createContext, useEffect, useMemo, useState } from "react";
import { onMessageListener, askForPermissionToReceiveNotifications } from "./Helpers/Firebase";

import Api from "./Helpers/Api";
import Dashboard from "./Components/Dashboard";

const Context = createContext({ name: 'Default' });

interface MessagePayloadType {
    notification: {
        body: string;
        title: string;
    }
};

function App() {

    const { Content, Footer, Header } = Layout;
    const [macAddress, setMacAddress] = useState<string>("default");
    const [api, contextHolder] = notification.useNotification();

    /**
     * Ask for User Permission
     */
    useEffect(() => {
        askForPermissionToReceiveNotifications().then((token) => {
            setMacAddress(token);
        });
    }, []);

    useEffect(() => {
        if (macAddress !== 'default') {
            Api.post("user", { token: macAddress }).then(() => {
                console.log('Token Saved');
            }).catch((error) => {
                console.error('Token Save', error.message);
            });
        }
    }, [macAddress]);

    /**
     * Message Listener Callback
     */
    onMessageListener().then((message: unknown) => {
        const typedMessage = message as MessagePayloadType;
        api.info({
            message: typedMessage.notification.title,
            description: typedMessage.notification.body
        });
    }).catch((error: Error) => {
        api.error({
            message: 'Error',
            description: error.message
        });
    });

    const contextValue = useMemo(() => ({ name: 'Ant Design' }), []);

    return (
        <Context.Provider value={contextValue}>
            {contextHolder}
            <Layout>
                <Header style={{ display: 'flex', alignItems: 'center' }}>
                    <div className="demo-logo" />
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}
                        items={[]} style={{ flex: 1, minWidth: 0 }} />
                </Header>
                <Content style={{ padding: '0 48px' }}>
                    <Dashboard macAddress={macAddress} />
                </Content>
                <Footer style={{ textAlign: 'center' }}>
                    Devloped by Tpss
                </Footer>
            </Layout>
        </Context.Provider>
    );
}

export default App;
