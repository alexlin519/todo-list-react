export interface TodoItemType {
    name: string;
    done: boolean;
    id: string;
    createdOn: Date;
    doneOn: Date | undefined;
    updatedOn: Date;
}

export interface TodoListState {
    items: TodoItemType[];
}

export const todoListActionTypes = {
    ADD_ITEM: 'ADD_ITEM',
    DELETE_ITEM: 'DELETE_ITEM',
    DELETE_ALL_ITEMS: 'DELETE_ALL_ITEMS',
    TOGGLE_ITEM: 'TOGGLE_ITEM',
    TOGGLE_ALL_ITEMS: 'TOGGLE_ALL_ITEMS',
    UPDATE_ITEM: 'UPDATE_ITEM',
};

export interface AddItemAction {
    type: typeof todoListActionTypes.ADD_ITEM;
    payload: {
        name: string;
        id: string;
        createdOn: Date;
    };
}

export interface DeleteItemAction {
    type: typeof todoListActionTypes.DELETE_ITEM;
    payload: {
        id: string;
    };
}

export interface DeleteAllItemsAction {
    type: typeof todoListActionTypes.DELETE_ALL_ITEMS;
}

export interface ToggleAllItemsAction {
    type: typeof todoListActionTypes.TOGGLE_ALL_ITEMS;
    payload: {
        doneOn: Date;
    };
}

export interface ToggleItemAction {
    type: typeof todoListActionTypes.TOGGLE_ITEM;
    payload: {
        id: string;
        doneOn: Date;
    };
}

export interface UpdateItemAction {
    type: typeof todoListActionTypes.UPDATE_ITEM;
    payload: {
        id: string;
        name: string;
        updatedOn: Date;
    };
}

export type TodoListAction =
    | AddItemAction
    | DeleteItemAction
    | DeleteAllItemsAction
    | ToggleItemAction
    | ToggleAllItemsAction
    | UpdateItemAction;
