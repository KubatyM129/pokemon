import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate  } from "react-router-dom";
import { gradientTypeMap, toTypeMap, typeColorMap } from '../util/colorMaps';


interface PokemonCardProps {
    name: string;
    url: string;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ url }) => {
    const [pokemonInfo, setPokemonInfo] = useState<any>(null);
    const [ dualType, setDualType ] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    let navigate = useNavigate();

    useEffect(() => {
        const fetchPokemon = async () => {
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Failed to fetch Pokémon');
                }
                const data = await response.json();
                setPokemonInfo(data);
            } catch (err) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('An unknown error occurred');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchPokemon();
    }, [url]);

    useEffect(() => {
        if (pokemonInfo && pokemonInfo.types.length > 1) {
            setDualType(true);
        }
    }, [pokemonInfo]);


    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!pokemonInfo) {
        return null;
    }

    const nameToUpperCase = pokemonInfo.name.charAt(0).toUpperCase() + pokemonInfo.name.slice(1);
    
    
    return (
        dualType && pokemonInfo.types[1]
            ? (
                <div>
                <div
                    className={`rounded-md bg-gradient-to-r ${gradientTypeMap[pokemonInfo.types[0].type.name] || ''} ${toTypeMap[pokemonInfo.types[1]?.type.name] || ''} p-1`}
                    onClick={() => navigate(`/pokemon/${pokemonInfo.name}`)}
                >
                    <div className="bg-gray-800 back hover:bg-indigo-500" key={pokemonInfo.id}>
                        <img src={pokemonInfo.sprites.front_default} alt={pokemonInfo.name} />
                        <h3>{nameToUpperCase.replace(/-/g, ' ')}</h3>
                    </div>
                </div>
                </div>
            )
            : (
                <div
                    className={`rounded-md ${typeColorMap[pokemonInfo.types[0].type.name] || 'bg-gray-500'} p-1`}
                    onClick={() => navigate(`/pokemon/${pokemonInfo.name}`)}
                >
                    <div className="bg-gray-800 back hover:bg-indigo-500" key={pokemonInfo.id}>
                        <img src={pokemonInfo.sprites.front_default} alt={pokemonInfo.name} />
                        <h3>{nameToUpperCase.replace(/-/g, ' ')}</h3>
                    </div>
                </div>
            )
    );
};

export default PokemonCard;