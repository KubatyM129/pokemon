import React from 'react';

const Loader: React.FC = () => {
    return (
        <div className="flex flex-col items-center w-full">
            <img className='max-w-32 max-h-32' src="\src\assets\pikachu.gif"/>
            <p>Loading...</p>
        </div>
    );
};

export default Loader;