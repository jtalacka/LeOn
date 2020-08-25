import * as React from 'react';

import {
    Actions, INITIAL_SESSION, INITIAL_CURRENT_LESSON, INITIAL_SCHEDULE, Session, settingsContext, INITIAL_MESSAGES,
} from 'app/context';

interface State {
    session: Session;
    lessons: Api.LessonDto[];
    currentLesson: number;
    schedule: Api.ScheduleDto[];
    messagesList: Api.ChatMessagesDto[];
}

class AppStore extends React.Component<{}, State> {

    public readonly state: State = {
        session: INITIAL_SESSION,
        lessons: null,
        currentLesson: INITIAL_CURRENT_LESSON,
        schedule: INITIAL_SCHEDULE,
        messagesList: INITIAL_MESSAGES,
    };

    public render(): React.ReactNode {
        const {
            children,
        } = this.props;

        const {
            session,
            lessons,
            currentLesson,
            schedule,
            messagesList,
        } = this.state;

        const actions: Actions = {
            updateSession: this.updateSession,
            updateLessons: this.updateLessons,
            updateCurrentLesson: this.updateCurrentLesson,
            updateSchedule: this.updateSchedule,
            updateMessages: this.updateMessages,
            sendMessage: this.sendMessage,
        };

        return (
            <settingsContext.Provider value={{ session, lessons, currentLesson, actions, schedule, messagesList }}>
                {children}
            </settingsContext.Provider>
        );
    }

    private readonly updateSession = (session: Session): void => {
        this.setState({ session });
    };

    private readonly updateLessons = (lessons: Api.LessonDto[]): void => {
        this.setState({ lessons });
    };

    private readonly updateCurrentLesson = (currentLesson: number): void => {
        this.setState({ currentLesson });
    };

    private readonly updateSchedule = (schedule: Api.ScheduleDto[]): void => {
        console.log('UPDATE SCHEDULE');
        this.setState({ schedule });
    };

    private readonly updateMessages = (newMessage: Api.ChatMessagesDto[]): void => {
        console.log('app store ', newMessage);
        // this.setState({ messagesList: [...newMessage] });
    };

    private readonly  sendMessage = (newMessage: Api.ChatMessagesDto[]): void => {
        console.log('app store ', newMessage);
    };
}

export { AppStore };
