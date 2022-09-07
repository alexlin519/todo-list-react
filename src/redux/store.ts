import { applyMiddleware, combineReducers, createStore, Middleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducers from './reducers';

const rootReducer = combineReducers({
    todoList: reducers,
});

export type RootState = ReturnType<typeof rootReducer>;

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type, @typescript-eslint/explicit-module-boundary-types
export const configureStore = () => {
    const middlewares: Middleware[] = [];
    const middleWareEnhancer = applyMiddleware(...middlewares);
    const store = createStore(rootReducer, composeWithDevTools(middleWareEnhancer));
    return store;
};
