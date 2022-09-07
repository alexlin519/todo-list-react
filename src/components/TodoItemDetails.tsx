import moment from 'moment';
import React from 'react';

import { TodoItemType } from '../redux/types';

interface TodoItemDetailsProps extends Omit<TodoItemType, 'name' | 'id'> {}

const formatDate = (date: Date): string =>
    moment(date).format('MMMM Do YYYY, h:mm:ss a');

const TodoItemDetails: React.FC<TodoItemDetailsProps> = (
    props: TodoItemDetailsProps
): JSX.Element => {
    const { done, createdOn, doneOn, updatedOn } = props;
    const style = {
        'marginLeft': 'calc(1rem + 0.5vw)',
    };
    return (
        <React.Fragment>
            <li style={style}>Created on: &nbsp; {formatDate(createdOn)}</li>
            {done && (
                <li style={style}>Done on: &nbsp; {formatDate(doneOn as Date)}</li>
            )}
            <li style={style}>Updated on: &nbsp; {formatDate(updatedOn)}</li>
        </React.Fragment>
    );
};

export default TodoItemDetails;
