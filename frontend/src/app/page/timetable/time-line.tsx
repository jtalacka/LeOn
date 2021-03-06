import React, { useEffect, useState } from 'react';
import moment from 'moment';
import classNames from 'classnames';

import { scheduleCalc } from './schedule-calc';

import styles from './lessons.module.scss';

interface Props {
    schedule: Api.ScheduleDto[];
    itemsInList: number;
}

const TimeLine: React.FC<Props> = (props) => {
    const { schedule, itemsInList } = props;
    const { timeLine, timeLineLong } = styles;

    const [top, setTop] = useState(0);
    // const [top, setTop] = useState(0);
    // const [opacity, setOpacity] = useState('0');

    const startTimeInMins = scheduleCalc.getDayStart(schedule) - 10;
    const endTimeInMins = scheduleCalc.getDayEnd(schedule, itemsInList) + 10;
    const [long, setLong] = useState(false);

    useEffect(() => {
        const time = moment().format('HH:mm');
        // setTop(scheduleCalc.convertTimeToMinutes(moment().format('HH:mm')) - scheduleCalc.getDayStart(schedule));
        if (scheduleCalc.convertTimeToMinutes(time) > 0) {
            setTop(
                // scheduleCalc.convertTimeToMinutes(time) - scheduleCalc.getDayStart(schedule),
                scheduleCalc.convertTimeToMinutes(time) - 480,
            );
        } else {
            setTop(-1000);
        }
        setTimeout(() => {
            setLong(true);
        }, 500);
    }, []);

    const timeLineClass = classNames(
        timeLine,
        long && timeLineLong,
    );
    useEffect(() => {
        const interval = setInterval(() => {

            const time = moment().format('HH:mm');
            const minutes = scheduleCalc.convertTimeToMinutes(time);
            if (minutes > 0) {
                setTop(
                    minutes - 480,
                );
            } else { setTop(-1000); }
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, [top]);

    const timeInMins = scheduleCalc.convertTimeToMinutes(moment().format('HH:mm'));

    if (endTimeInMins > timeInMins && timeInMins > startTimeInMins) {
        return (
            <span
                className={timeLineClass}
                style={{ top }}
            >
                <div>{moment().format('HH:mm')}<span /></div>
            </span>
        );
    } else {
        return <></>;
    }
};

// @ts-ignore
export { TimeLine };
