import React from 'react';
import { BrowserRouter, Routes, Route  } from 'react-router-dom';
import Home from '../pages/Home';
import PokemonPage from '../pages/PokemonPage';

const AppRoutes: React.FC = () => {
    return (
        <BrowserRouter>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pokemon/:name" element={<PokemonPage />} />           
        </Routes>
        </BrowserRouter>
        
    );
};

export default AppRoutes;