import { v4 as uuid } from 'uuid';

import {
    AddItemAction,
    DeleteItemAction,
    TodoItemType,
    TodoListAction,
    todoListActionTypes,
    TodoListState,
    ToggleItemAction,
    UpdateItemAction,
} from './types';

const now: Date = new Date();

const initialState: TodoListState = {
    items: [
        {
            name: 'This is a done message',
            done: true,
            id: uuid(),
            createdOn: now,
            doneOn: undefined,
            updatedOn: now,
        },
        {
            name: 'This is an undone message',
            done: false,
            id: uuid(),
            createdOn: now,
            doneOn: undefined,
            updatedOn: now,
        },
    ],
};

export default (
    state: TodoListState = initialState,
    action: TodoListAction
): TodoListState => {
    //可以给它一个默认参数 initialS 在一开始的时候用
    // : 后面的是return 返回类型
    switch (action.type) {
        case todoListActionTypes.ADD_ITEM: {
            //用deconstruct的方法读取
            //const{name,id,createdOn} = action.payload; 但是这样会报错
            //因为现在action是TodoListAction, 是一个父级大union, 可能没有payload, 只有TodoListAction里面的AddItemAction有
            const { name, id, createdOn } = (action as AddItemAction).payload;
            const newItem = {
                name,
                done: false,
                id, //id:id的简写
                createdOn: createdOn,
                doneOn: undefined,
                updatedOn: createdOn,
            };

            //JavaScript spread operator
            return {
                items: [...state.items, newItem], // 就是原来的item 不变 (...表示), 然后新加property
            };
        }

        case todoListActionTypes.DELETE_ITEM: {
            const { id } = (action as DeleteItemAction).payload; // 类型转换
            // updatedItems 是个array [],   filter 函数返回bool, true的话包含stat.items
            const updatedItems: TodoItemType[] = state.items.filter(
                item => item.id !== id
            ); // 用了函数变量

            return {
                items: updatedItems,
            };
        }

        case todoListActionTypes.DELETE_ALL_ITEMS: {
            return {
                items: [],
            };
        }

        case todoListActionTypes.TOGGLE_ITEM: {
            const updatedItems: TodoItemType[] = state.items.map(item => {
                const { id, doneOn } = (action as ToggleItemAction).payload;
                if (item.id === id) {
                    if (item.done) {
                        //object spread operator
                        return { ...item, done: false, doneOn: undefined };

                        //为什么不直接改变item  item.done = false, item.doneOn = undefined
                        //因为是纯函数!! 不可对外界有影响
                    } else {
                        return { ...item, done: true, doneOn }; //doneOn:doneOn 简写
                    }
                } else {
                    return item;
                }
            });

            return {
                items: updatedItems,
            };
        }

        case todoListActionTypes.TOGGLE_ALL_ITEMS: {
            const numItems: number = state.items.length;
            let numDoneItems = 0;

            for (const message of state.items) {
                if (message.done === true) {
                    numDoneItems = numDoneItems + 1;
                }
            }

            const updatedItems: TodoItemType[] = state.items.map(item => {
                if (numDoneItems === numItems) {
                    // If all items are done,
                    // then make all items undone.
                    return { ...item, done: false };
                } else {
                    // Otherwise make all items done.
                    return { ...item, done: true };
                }
            });

            return {
                items: updatedItems,
            };
        }

        case todoListActionTypes.UPDATE_ITEM: {
            const updatedItems: TodoItemType[] = [...state.items];
            const { id, name, updatedOn } = (action as UpdateItemAction).payload;
            for (const message of updatedItems) {
                if (message.id === id) {
                    message.name = name;
                    message.updatedOn = updatedOn;
                }
            }
            return {
                items: updatedItems,
            };
        }

        default: {
            return state;
        }
    }
};
