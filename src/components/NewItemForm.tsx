import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import { AddItem } from '../redux/actions';

const NewItemForm = (): JSX.Element => {
    const dispatch = useDispatch(); //需要修改global state
    const [input, setInput] = useState('');
    const [typing, setTyping] = useState(false); //2个inital state
    const createItemFormRef = useRef<HTMLFormElement>(null);

    const dispatchAddItemAction = (): void => {
        dispatch(AddItem(input));
    };

    // 变成初始状态
    //dom manipulation
    const clearForm = (): void => {
        setInput('');
        setTyping(false);
        //需要直接操作dom!!!  创建createItemFormRef
        if (createItemFormRef.current) {
            //检查 可能是none
            createItemFormRef.current.reset();
        }
    };

    // handle submit event for createItemForm element
    //用户点击加号/enter来创建item
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault(); //FormEvent默认是刷新页面 我们不要
        dispatchAddItemAction();
        clearForm();
    };

    // handle focus event for the input element inside createItemForm element
    //鼠标点击输入框
    const handleFocus = (): void => {
        setTyping(true);
    };

    // handle change event for the input element inside createItemForm element
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setInput(e.target.value);
    };

    // handle focusout event for the input element inside createItemForm element
    //鼠标点击输入框外, 就不希望再type
    const handleFocusOut = (): void => {
        if (!input) {
            setTyping(false);
        }
    };

    //开始写 JXS元素
    const createItemForm = (
        //记得绑定ref ref={createItemFormRef}

        // typing button 是type="submit", 说明点击button就会触发submit event (enter默认就是submit 不要我们再写了))
        <form id="create-item-form" ref={createItemFormRef} onSubmit={handleSubmit}>
            <input
                id="create-item-input"
                type="text"
                placeholder="Add a new item"
                onFocus={handleFocus}
                onChange={handleChange}
                onBlur={handleFocusOut}
                value={input}
            />
            {typing && (
                <button id="create-item-button" type="submit">
                    +
                </button>
            )}
        </form>
    );

    const clearFormButton = (
        <button className="x-button" onClick={clearForm}>
            x
        </button>
    );

    return (
        <React.Fragment>
            {createItemForm}
            {clearFormButton}
        </React.Fragment>
    );
};

export default NewItemForm;
