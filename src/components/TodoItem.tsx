import classNames from 'classnames';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { deleteItem, toggleItem, updateItem } from '../redux/actions';
import { TodoItemType } from '../redux/types';
import TodoItemDetails from './TodoItemDetails';

type TodoItemProps = TodoItemType;

const TodoItem: React.FC<TodoItemProps> = (props: TodoItemProps): JSX.Element => {
    const dispatch = useDispatch(); //用于帮助我们连接reducer
    const [editingMode, setEditingMode] = useState(false);
    const [editedItemName, setEditItemName] = useState(props.name);
    const [showItemDetails, setShowItemDetails] = useState(false);

    const quitEditingMode = (): void => {
        setEditingMode(false);
        setEditItemName(props.name);
    };

    const dispatchToggleItemAction = (): void => {
        dispatch(toggleItem(props.id));
    };
    const dispatchUpdateItemAction = (): void => {
        dispatch(updateItem({ id: props.id, name: editedItemName }));
    };

    const dispatchDeleteItemAction = (): void => {
        dispatch(deleteItem(props.id));
    };

    const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>): void => {
        if (e.key === 'Enter') {
            if (editedItemName) {
                dispatchUpdateItemAction();
            } else {
                dispatchDeleteItemAction();
            }
        } else if (e.key === 'Escape') {
            quitEditingMode();
        }
    };

    const handleFocusOut = (): void => {
        if (editedItemName) {
            dispatchUpdateItemAction();
        } else {
            dispatchDeleteItemAction();
        }
        quitEditingMode();
    };
    // handle change evnet for the  updatediteminput element
    const handleTyping = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setEditItemName(e.target.value); //双向数据绑定
    };

    const startTypeing = (): void => {
        setEditingMode(true);
    };

    // handle click event for showItemDetailsButton element
    const toggleShowItemDetails = (): void => {
        setShowItemDetails(!showItemDetails);
    };

    const toggleItemCheckbox = (
        <input
            type="checkbox"
            className="toggle-item-checkbox"
            onChange={dispatchToggleItemAction}
            checked={props.done}
        />
    );

    const updateItemInput = (
        <input
            autoFocus //autoFocus = true 简写 鼠标变光标
            type="text"
            value={editedItemName}
            onKeyUp={handleKeyUp}
            onBlur={handleFocusOut}
            className="update-item-input"
            onChange={handleTyping}
        />
    );

    //一个class里面加多个class
    const itemLabelClasses = classNames({
        'item-label': true,
        'item-strikethrough': props.done, //要不要划线? depends on props.done
    });

    const itemLabel = (
        <label onClick={startTypeing} className={itemLabelClasses}>
            {props.name}
        </label>
    );

    const deleteItemButton = (
        <button className="x-button" onClick={dispatchDeleteItemAction}>
            x
        </button>
    );

    const showItemDetailsButton = (
        <button className="show-item-details-button" onClick={toggleShowItemDetails}>
            ...
        </button>
    );

    if (!editingMode) {
        return (
            // 用fragment 绑定成一个元素 来return (无法return多个)
            <React.Fragment>
                <li>
                    {toggleItemCheckbox}
                    {itemLabel}
                    {deleteItemButton}
                    {showItemDetailsButton}
                </li>
                {showItemDetails && ( //&&指, showItemDetails是 true 才会做下面的渲染
                    <TodoItemDetails
                        done={props.done}
                        createdOn={props.createdOn}
                        doneOn={props.doneOn}
                        updatedOn={props.updatedOn}
                    />
                )}
            </React.Fragment>
        );
    } else {
        //在edit mode
        return (
            <li>
                {toggleItemCheckbox}
                {updateItemInput}
                {deleteItemButton}
            </li>
        );
    }
};

export default TodoItem;
