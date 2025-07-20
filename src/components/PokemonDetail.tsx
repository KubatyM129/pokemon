import React, { useEffect, useState } from 'react';
import Loader from '../components/Loader';
import type { Pokemon } from '../interfaces/pokemon';
import { gradientTypeMap, toTypeMap, typeColorMap } from '../util/colorMaps'; 

interface PokemonDetailProps {
    name?: string;
}

const POKEMON_API = import.meta.env.VITE_POKEMON_API ;
const PokemonDetail: React.FC<PokemonDetailProps> = ({name}) => {
    const [dualType, setDualType] = useState<boolean>(false);
    const [pokemon, setPokemon] = useState<Pokemon>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPokemonDetail = async () => {
            try {
                const response = await fetch(POKEMON_API+`/pokemon/${name}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch Pokémon details');
                }
                const data = await response.json();
                setPokemon(data);
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

        fetchPokemonDetail();
    }, [name]);


    useEffect(() => {
            if (pokemon && pokemon.types.length > 1) {
                setDualType(true);
            }
        }, [pokemon]);


    if (loading) return <Loader />;
    if (error) return <div>Error: {error}</div>;

    const nameToUpperCase = pokemon?.name ? pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1) : '';


    return (
        dualType ?
        (
            pokemon ? (
                <div className={`flex flex-col items-center w-full rounded-md max-w-md mx-auto my-4 bg-gradient-to-r ${gradientTypeMap[pokemon.types[0].type.name] || ''} ${toTypeMap[pokemon.types[1].type.name] || ''} p-1`}>
                    <>
                    <div className='bg-gray-800 back flex flex-col items-center w-full'>
                        <p className="text-4xl">{nameToUpperCase.replace(/-/g, ' ')}</p>
                        <img className='justify-center' src={pokemon.sprites.front_default} alt={pokemon.name} />
                        <div className='grid grid-cols-2 border-y border-gray-400 w-full max-w-md '>
                            <div className='col-span-2 border-y border-gray-400'>Types</div>
                            {pokemon.types.map((typeInfo) => (
                                <div className='' key={typeInfo.type.name}>{typeInfo.type.name}</div>
                            ))}
                        </div>
                        <div className='grid grid-cols-2 border-y border-gray-400 w-full max-w-md '>
                            <div className='col-span-2 border-y border-gray-400'>Stats</div>
                            {pokemon.stats.map((statInfo) => (
                                <div key={statInfo.stat.name} className='col-span-2 grid grid-cols-2'>
                                    <div className='basin-2/3'>{statInfo.stat.name.replace(/-/g, ' ')}</div>
                                    <div className='basin-1/3'>{statInfo.base_stat}</div>
                                </div>
                            ))}
                        </div>
                        <div className='grid grid-cols-2 border-y border-gray-400 w-full max-w-md '>
                            <div className='col-span-2 border-y border-gray-400 justify-items-center'>Abilities</div>
                            {pokemon.abilities.map((abilityInfo, idx) => {
                                const isOdd = pokemon.abilities.length % 2 === 1;
                                const isLast = idx === pokemon.abilities.length - 1;
                                const className = isOdd && isLast ? 'col-span-2' : '';
                                return (
                                    <p className={className} key={abilityInfo.ability.name}>
                                        {abilityInfo.ability.name.replace(/-/g, ' ')}
                                    </p>
                                );
                            })}
                        </div>
                    </div>
                    </>
                </div>
            ) : (
                <div className="flex justify-center items-center h-screen">
                    <p>No Pokémon found</p>
                </div>
        )
        )
        : 
        (
            pokemon ? (
                <div className={`flex flex-col items-center w-full max-w-md mx-auto my-4 rounded-md ${typeColorMap[pokemon.types[0].type.name] || ''} p-1`}>
                    <>
                    <div className='bg-gray-800 back flex flex-col items-center w-full'>
                        <p className="text-4xl">{nameToUpperCase.replace(/-/g, ' ')}</p>
                        <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                        <div className='grid grid-cols-2 border-y border-gray-400 w-full max-w-md '>
                            <div className='col-span-2 border-y border-gray-400'>Types</div>
                            {pokemon.types.map((typeInfo) => (
                                <div className='col-span-2' key={typeInfo.type.name}>{typeInfo.type.name}</div>
                            ))}
                        </div>
                        <div className='grid grid-cols-2 border-y border-gray-400 w-full max-w-md '>
                            <div className='col-span-2 border-y border-gray-400'>Stats</div>
                            {pokemon.stats.map((statInfo) => (
                                <div key={statInfo.stat.name} className='col-span-2 grid grid-cols-2'>
                                    <div className='basin-2/3'>{statInfo.stat.name.replace(/-/g, ' ')}</div>
                                    <div className='basin-1/3'>{statInfo.base_stat}</div>
                                </div>
                            ))}
                        </div>
                        <div className='grid grid-cols-2 border-y border-gray-400 w-full max-w-md '>
                            <div className='col-span-2 border-y border-gray-400 justify-items-center'>Abilities</div>
                            {pokemon.abilities.map((abilityInfo, idx) => {
                                const isOdd = pokemon.abilities.length % 2 === 1;
                                const isLast = idx === pokemon.abilities.length - 1;
                                const className = isOdd && isLast ? 'col-span-2' : '';
                                return (
                                    <p className={className} key={abilityInfo.ability.name}>
                                        {abilityInfo.ability.name.replace(/-/g, ' ')}
                                    </p>
                                );
                            })}
                        </div>
                        <div className='grid grid-cols-2 border-y border-gray-400 w-full max-w-md '>
                            <div className='border-y border-r border-gray-400'>Height</div>
                            <div className='border-y border-l border-gray-400'>Weight</div>
                            <div className='border-r border-gray-400' key={pokemon.height}>{pokemon.height/10}m</div>
                            <div className='border-l border-gray-400' key={pokemon.weight}>{pokemon.weight/10}kg</div>
                        </div>
                        </div>
                    </>
                </div>
            ) : (
                <div className="flex justify-center items-center h-screen">
                    <p>No Pokémon found</p>
                </div>
        )
        )
        
        
            
    );
};

export default PokemonDetail;