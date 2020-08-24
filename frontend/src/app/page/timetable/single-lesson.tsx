import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import classNames from 'classnames';
import ReactTooltip from 'react-tooltip';
import { Link } from 'react-router-dom';
import moment from 'moment';

import { TeacherModal } from 'app/components/modalContent/teacherModal';
import { StudentModal } from 'app/components/modalContent/studentModal';
import { navigationService } from 'app/service/navigation-service';

import { scheduleCalc } from './schedule-calc';

import styles from './lessons.module.scss';

interface Props {
    currentLesson: number;
    thisLesson: any;
    handleOpenClassroom: any;
    schedule: any | null;
    userRole: string[];
    date: string;
    homepage?: boolean;
    ifDayEnded: boolean;
}

const { lesson, activeLesson, endedLesson, lessonBarContent, lessonBar, lessonBarWithBreak, activeInSchedules, emptyLesson } = styles;

const SingleLesson: React.FC<Props> = (props) => {
    const { currentLesson, thisLesson, handleOpenClassroom, schedule, userRole, date, homepage, ifDayEnded } = props;
    const [modalVisible, setModalVisible] = useState(false);

    // define classNames
    const lessonClass = classNames(
        lesson,
        //active
        currentLesson === thisLesson.id && moment().format('DDD') === moment(date).format('DDD') && activeLesson,
        !homepage && activeInSchedules,
        //ended
        parseInt(moment().format('DDD'), 10) > parseInt(moment(date).format('DDD'), 10) && endedLesson,
        currentLesson > thisLesson.id && moment().format('DDD') === moment(date).format('DDD') && endedLesson,
        ifDayEnded && date === moment().format('YYYY-MM-DD') && endedLesson,
        // empty lesson
        thisLesson.id === -1 && emptyLesson,
    );
    const checkUserRoleForModal = (): boolean =>
        userRole.includes('STUDENT') || userRole.includes('PARENT');

    const showModal = (index: number) => {
        thisLesson.id !== -1 &&
            setModalVisible(!modalVisible);
    };

    // console.log(parseInt(moment(date).format('DDD'), 10))

    const checkLessonInformation = (): void => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        checkUserRoleForModal() ? showModal(thisLesson.id) : null;
    };

    const handleOk = () => {
        setModalVisible(!modalVisible);
    };

    const currentLessonInfo = thisLesson.lessonInformation
        .filter((lesson: Api.LessonInformationDto) => lesson.date === date)[0];
    return (
        <>
            <Modal
                visible={modalVisible}
                footer={null}
                onCancel={handleOk}
                okButtonProps={{
                    children: 'Custom OK',
                }}
            >
                {checkUserRoleForModal() ?
                    (<StudentModal
                        subject={thisLesson.subject}
                        onClose={handleOk}
                        lessonInformation={thisLesson.lessonInformation
                            .filter((lesson: Api.LessonInformationDto) => lesson.date === date)}
                        classId={thisLesson.id}
                        date={date}
                    />) :
                    (<TeacherModal subject={thisLesson.subject} lessonId={thisLesson.id} onClose={handleOk} date={date}
                        lessonInformation={thisLesson.lessonInformation
                            .filter((lesson: Api.LessonInformationDto) => lesson.date === date)} />)}
            </Modal>
            <div className={lessonClass} key={thisLesson.id}>
                <div className={lessonBar}>
                    <div className={lessonBarWithBreak}>
                        <div
                            data-tip={thisLesson.id === -1 ? "No Lesson" : null}
                            className={lessonBarContent + ' ' + (checkUserRoleForModal() ? styles.pointer : null)}
                            onClick={!thisLesson.lessonInformation[0] && checkUserRoleForModal() ? null : () => showModal(thisLesson.id)}
                            style={{
                                height: scheduleCalc.getLessonLength(schedule),
                                cursor: !thisLesson.lessonInformation[0] ? 'default' : 'cursor,'
                            }}
                        >
                            {checkUserRoleForModal() ? <h1>{thisLesson.subject}</h1> :
                                <h1>{thisLesson.className + " " + thisLesson.subject}</h1>}
                            <div className={styles.assignments}>
                                {
                                    currentLessonInfo?.assignment?.includes('Homework') &&

                                    <i style={{ color: 'white' }} className="far fa-file-alt " />}
                                {currentLessonInfo?.assignment?.includes('Test') &&
                                    <i style={{ backgroundColor: 'red', color: 'black' }} className="far fa-file-alt" />

                                }
                            </div>
                            {checkUserRoleForModal() ? null
                                : <div className={styles.editModal}>
                                    <i className="fas  fa-lg fa-plus-circle" />
                                </div>}
                            {thisLesson.id === currentLesson && moment().format('W') === moment(date).format('W') ?
                                (<Link to={navigationService.redirectToVideoChat(currentLesson)}>
                                    {homepage ?

                                        (
                                            <>
                                                <img
                                                    alt="Lesson camera icon"
                                                    src={'icons/camera.svg'}
                                                />
                                                <Button
                                                    type="primary"
                                                    shape="round"
                                                    className={styles.toVideoButton}
                                                >
                                                    Join a Class
                                                </Button>
                                            </>
                                        )

                                        : (
                                            <div style={{ display: 'flex' }}>
                                                <img
                                                    alt="Lesson modal icon"
                                                    src={'icons/camera.svg'}
                                                /> <span>live</span>
                                            </div>

                                        )}
                                </Link>)
                                : null}
                        </div>
                        {thisLesson.id === -1 && <ReactTooltip />}
                        <span
                            data-tip="Break"
                            style={{ height: scheduleCalc.getBreakTime(schedule, thisLesson.time) }}
                            className={styles.breakSpan}
                        >   {
                                scheduleCalc.getBreakTime(schedule, thisLesson.time) > 20 ?
                                    (
                                        <span className={styles.longBreak}>Long break</span>
                                    ) : null
                            }
                        </span>
                        <ReactTooltip />
                    </div>
                </div>
            </div>
        </ >

    );

};

export { SingleLesson };
