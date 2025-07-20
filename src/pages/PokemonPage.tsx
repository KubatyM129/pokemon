import React from 'react';
import { useParams } from 'react-router-dom';
import PokemonDetail from '../components/PokemonDetail';

const PokemonPage: React.FC = () => {
    const { name } = useParams<{ name: string }>();

    return (
        <div>
            <p className="text-5xl" >Pokémon Details</p>
            <PokemonDetail name={name} />
        </div>
    );
};

export default PokemonPage;