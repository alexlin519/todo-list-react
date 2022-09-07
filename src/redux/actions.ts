import { v4 as uuid } from 'uuid';

import {
    AddItemAction,
    DeleteAllItemsAction,
    DeleteItemAction,
    todoListActionTypes,
    ToggleAllItemsAction,
    ToggleItemAction,
    UpdateItemAction,
} from './types';

//action creators
//用户输入名字 如何转换为 action obj?

export const AddItem = (name: string): AddItemAction => {
    return {
        type: todoListActionTypes.ADD_ITEM,
        payload: {
            name: name,
            id: uuid(),
            createdOn: new Date(),
        },
    };
};

export const deleteItem = (id: string): DeleteItemAction => {
    return {
        type: todoListActionTypes.DELETE_ITEM,
        payload: {
            id: id,
        },
    };
};

export const deleteAllItems = (): DeleteAllItemsAction => {
    return {
        type: todoListActionTypes.DELETE_ALL_ITEMS,
    };
};

export const toggleAllItems = (): ToggleAllItemsAction => {
    return {
        type: todoListActionTypes.TOGGLE_ALL_ITEMS,
        payload: {
            doneOn: new Date(),
        },
    };
};

export const toggleItem = (id: string): ToggleItemAction => {
    return {
        type: todoListActionTypes.TOGGLE_ITEM,
        payload: {
            id: id,
            doneOn: new Date(),
        },
    };
};
export const updateItem = ({
    id,
    name,
}: {
    id: string;
    name: string;
}): UpdateItemAction => {
    return {
        type: todoListActionTypes.UPDATE_ITEM,
        payload: {
            id: id,
            name: name,
            updatedOn: new Date(),
        },
    };
};
