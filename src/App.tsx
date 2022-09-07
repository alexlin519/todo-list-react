import React from 'react';

import TodoList from './components/TodoList';

//在app里面写render!!
const App: React.FC = (): JSX.Element => {
    const header = (
        <div className="title-div">
            <span className="title">
                <a href="#">Your Todo List</a>
            </span>
            <span className="author">
                <a href="https://cgao.info">&nbsp; Chuntong Gao &nbsp;</a>
            </span>
        </div>
    );

    return (
        <div className="app-container">
            {header}
            <TodoList />
        </div>
    );
};

export default App;