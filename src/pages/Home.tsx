import React from 'react';
import PokemonList from '../components/PokemonList';

const Home: React.FC = () => {
    return (
        <div>
            <p className='text-6xl mb-3'>Mini Bulbapedia</p>
            <PokemonList />
        </div>
    );
};

export default Home;