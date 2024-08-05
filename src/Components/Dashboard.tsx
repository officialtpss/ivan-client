import { Breadcrumb, theme, Avatar, Button, Flex, List } from 'antd';

import Api from "../Helpers/Api";
import { useCallback, useEffect, useState } from 'react';

interface RecordType {
    UserId: number;
    body: string
    id: number
    isRead: boolean
    title: string
    userId: number
}

const Dashboard = ({ macAddress }: { macAddress: string; }) => {

    const [records, setRecords] = useState<Array<RecordType>>([]);
    const { token: { colorBgContainer, borderRadiusLG }, } = theme.useToken();

    const testNotificationData = [{
        title: "What is Lorem Ipsum?",
        body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard"
    },
    {
        title: "Why do we use it?",
        body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard"
    },
    {
        title: "Where can I get some?",
        body: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard"
    }];

    const fetchNotifications = useCallback(() => {
        Api.post('notifications', { token: macAddress }).then(({ data }) => {
            setRecords(data?.data?.Notifications);
        });
    }, [macAddress]);

    useEffect(() => {
        fetchNotifications();
    }, [fetchNotifications]);

    const buttonHandler = (title = "Test", body = "Testing goes here") => {
        console.log('Button Clicked');
        Api.post('send/notification', { title, body, token: macAddress }).then((response) => {
            console.log('buttonHandler', response);
            fetchNotifications();
        }).catch((error) => {
            console.error('buttonHandler', error.message);
        });
    };

    const readMeHandler = (e: any, id: number) => {
        e.preventDefault();
        Api.get(`notification/${id}/read`).then((response) => {
            console.log('readMeHandler', response);
            fetchNotifications();
        });
    };

    return (
        <>
            <Breadcrumb items={[{ title: 'Home' }, { title: 'List' }]} style={{ margin: '16px 0' }} />
            <div style={{ background: colorBgContainer, minHeight: 280, padding: 24, borderRadius: borderRadiusLG, }}>

                <p>Device Address:</p>
                <br />
                <p>{macAddress}</p>

                <Flex vertical={true} gap={"middle"}>

                    <Flex gap="small" wrap>
                        <Button type="primary" onClick={() => buttonHandler(testNotificationData[0].title, testNotificationData[0].body)}>Button 1</Button>
                        <Button onClick={() => buttonHandler(testNotificationData[1].title, testNotificationData[1].body)}>Button 2</Button>
                        <Button type="dashed" onClick={() => buttonHandler(testNotificationData[2].title, testNotificationData[2].body)}>Button 3</Button>
                    </Flex>

                    <List
                        header={<div>Notifications</div>}
                        itemLayout="horizontal"
                        dataSource={records}
                        renderItem={(item, index) => (
                            <List.Item
                                actions={(item.isRead) ? [] : [<a onClick={(e) => readMeHandler(e, item.id)} href='/#' key="list-loadmore-edit">Read</a>]}>
                                <List.Item.Meta avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} />}
                                    title={`${item.title} - ${(item.isRead) ? "Read" : "Unread"}`} description={item.body} />
                            </List.Item>
                        )}
                    />

                </Flex>

            </div>
        </>
    );
};

export default Dashboard;