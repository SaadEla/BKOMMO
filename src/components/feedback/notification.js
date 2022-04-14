import {notification} from 'antd';

export default notification;

const openNotificationWithIcon = (type, message, description) => {
    notification[type]({
        message,
        description,
        duration: 10,
        placement: 'bottomRight'
    });
};

export {openNotificationWithIcon}