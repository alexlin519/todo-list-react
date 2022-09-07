/* eslint-disable react/jsx-no-comment-textnodes */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { deleteAllItems, toggleAllItems } from '../redux/actions';
import { RootState } from '../redux/store';
import { TodoItemType } from '../redux/types';
import NewItemForm from './NewItemForm';
import TodoItem from './TodoItem';

const TodoList: React.FC = (): JSX.Element => {
    const dispatch = useDispatch(); //todolist有更改界面的功能, 所以要dispatch
    const items: TodoItemType[] = useSelector(
        //todo list 从redux.store获取item, 用useSelector
        (state: RootState) => state.todoList.items //RootState在 store文件里已经定义
        //redux的  state.todoList.items 里面有更新, 会通知这个todolist
        //双向绑定
    );

    const dispatchDeleteAllItemsAction = (): void => {
        dispatch(deleteAllItems());
    };

    const dispatchToggleAllItemsAction = (): void => {
        dispatch(toggleAllItems());
    };

    const toggleAllItemsButton = (
        <input
            id="toggle-all-items-button"
            className="hide"
            type="checkbox"
            onClick={dispatchToggleAllItemsAction} //绑定event handler
        />
    );

    const todoItemJSXElements: JSX.Element[] = items.map(
        (
            item //JSX元素的array, 这个function在做数据转换
        ) => (
            <TodoItem
                name={item.name}
                done={item.done}
                id={item.id}
                key={item.id}
                createdOn={item.createdOn}
                doneOn={item.doneOn}
                updatedOn={item.updatedOn}
            />
        )
    ); // =>() 没有return keyword 也没有{}, 因为就一个return  ()内就算一个

    return (
        <div className="content-div">
            <div className="create-item-div">
                //满足前面的condition时 渲染后面的toggleAllItemsButton
                {items.length > 0 && toggleAllItemsButton}
                <NewItemForm />
            </div>
            <div className="item-list-div">
                <br />
                <ul>{todoItemJSXElements}</ul>
            </div>
            <a id="delete-all-items-button" onClick={dispatchDeleteAllItemsAction}>
                DELETE ALL
            </a>
        </div>
    );
};

export default TodoList;
