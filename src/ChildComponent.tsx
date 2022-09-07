/* eslint-disable @typescript-eslint/explicit-function-return-type */
import React, { useState } from 'react';

interface ChildComponentProps {
    message: string;
}

const ChildComponent: React.FC<ChildComponentProps> = (
    props: ChildComponentProps
) => {
    const [count, setCount] = useState(1);
    const { message } = props;
    const handleAdd = () => setCount(count + 1);
    const handleSubtract = () => setCount(count - 1);

    return (
        <div>
            <h3>
                Message prop passed from parent component:{' '}
                <span style={{ color: 'red' }}>{message}</span>
            </h3>
            <h3>counter: {count}</h3>
            <button onClick={handleAdd}>+</button>
            <button onClick={handleSubtract}>-</button>
        </div>
    );
};

export default ChildComponent;
