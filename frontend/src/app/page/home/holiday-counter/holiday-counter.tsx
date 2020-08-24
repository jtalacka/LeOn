import React from 'react';

import styles from './holiday-counter.module.scss';

// const time = Math.round((Date.parse(new Date('2020-12-24')) - Date.parse(new Date())) / 1000 / 86400);
const deadline = new Date('2020-12-24');
const today = new Date();
const time = Math.round(Math.abs((deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)));

const HolidayCounter: React.FC = () =>

    (
        <div>
            <img
                alt="Teacher board"
                src={'images/teacher-board.svg'}
                className={styles.holidayCounterboard}
            />
            <div className={styles.holidayCountertitleWrapper}>
            <span >Left till Christmas!</span>
            </div>
            <span className={styles.holidayCounternumber}>{time}</span>
            <span className={styles.holidayCounterday}>Days</span>
        </div>
    );

export { HolidayCounter };