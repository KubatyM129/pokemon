import React from 'react';
import AppRoutes from './routing/AppRoutes';
import './App.css';

const App: React.FC = () => {
    return (
        <div className="w-full flex flex-col">
            <AppRoutes />
        </div>
    );
};

export default App;