import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import { variantsUsersList, variantsUser } from 'app/page/timetable/animation';

import styles from './video-chat-page.module.scss';

interface Props {
    activeUsers: any;
    isOpen: boolean;
}

const ActiveUsers: React.FC<Props> = (props) => (
    <motion.div
        initial={false}
        animate={props.isOpen ? 'open' : 'closed'}
        variants={variantsUsersList}
        className={styles.usersList}
    >
        {
            props.activeUsers.map((item: any, index: any) =>
                (
                    <motion.div
                        key={index}
                        className={styles.userRow}
                        variants={variantsUser}
                    >
                        <img
                            alt="avatar"
                            src={`/icons/avatars/test.svg`}
                            style={{
                                filter: item.active ? 'none' : 'grayscale(1)',
                                opacity: item.active ? 1 : '0.5',
                            }}
                        />
                        <h3 style={{ color: item.active ? '#252629' : '#A3A5A9' }}>
                            {item.firstName + ' ' + item.lastName}
                        </h3>
                    </motion.div>
                ),
            )
        }
    </motion.div >
);

export { ActiveUsers };
