import React from 'react';
import Avatar from 'antd/lib/avatar/avatar';
import { UserOutlined } from '@ant-design/icons';

import styles from './message.module.scss';

interface Props {
    text: string;
    author: string;
    date: string;
    channel: number;
    classroom: string;
    toRight: boolean;
}

const Message: React.FC<Props> = (
    { text, author, date, channel, classroom, toRight }) => {
    const monthNames = ['Jan', 'Feb', 'Mar', 'Ap', 'May', 'Jun',
        'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
    ];
    let dateDisplay = date;
    const today = new Date();
    if (dateDisplay.toString().length > 5) {
        const a = new Date(date);
        const minutes = a.getMinutes().toString().length === 1 ?
            '0' + a.getMinutes().toString()  : a.getMinutes().toString();

        if (a.getDate() < today.getDate()) {
            dateDisplay = monthNames[a.getMonth()] + ' ' + a.getDate() + ', ' + a.getHours().toString() + ':' + minutes;
            // return;
        }else{
            dateDisplay = a.getHours().toString()+ ':' + minutes
        }
    }
    return (
        <div className={toRight ? styles.containerR : styles.containerL}>
            {!toRight && <div className={styles.avatarBox}>
                <Avatar
                    className={styles.avatar}
                    size="large" icon={
                    <UserOutlined
                        className={styles.userIcon}
                        style={{ fontSize: '25px' }} />}
                    style={{ color: 'white' }}
                />
            </div>}

            <div>
                {!toRight && <span className={styles.author}>{author}</span>}
                <div className={styles.message}>
                    <p>{text}</p>
                    <p className={styles.timestamp}>{dateDisplay}</p>
                </div>

            </div>
        </div>
    );
};

export { Message };
