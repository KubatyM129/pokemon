import React, { useEffect, useState } from 'react';
import PokemonCard from './PokemonCard';
import Loader from './Loader';

const PAGE_SIZE = 60;
const POKEMON_API = import.meta.env.VITE_POKEMON_API ;
const POKEMON_AMOUNT = 1025; // There is more pokemon in API, but over 1025 are just weird variants that you can encounter in the games, like 15 different pikachu

interface PokemonListItem  {
    name: string;
    url: string;
};

const PokemonList: React.FC = () => {
    const [pokemonList, setPokemonList] = useState<PokemonListItem[]>([]);
    const [filteredList, setFilteredList] = useState<PokemonListItem[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState<number>(1);
    const [search, setSearch] = useState<string>('');
    const [searchLoading, setSearchLoading] = useState<boolean>(false);
    
    useEffect(() => {
        const fetchPokemon = async () => {
            try {
                const response = await fetch(POKEMON_API+`/pokemon?limit=${POKEMON_AMOUNT}`); 
                if (!response.ok) {
                    throw new Error('Failed to fetch Pokémon');
                }
                const data = await response.json();
                setPokemonList(data.results);
                setFilteredList(data.results);
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
    }, []);

    useEffect(() => {
        let handler: ReturnType<typeof setTimeout>;
        if (search === '' || search.length < 3) {
            setFilteredList(pokemonList);
            setPage(1);
            setSearchLoading(false);
            return;
        }
        setSearchLoading(true);
        handler = setTimeout(() => {
            const filtered = pokemonList.filter(p =>
                p.name.toLowerCase().includes(search.toLowerCase())
            );
            setFilteredList(filtered);
            setPage(1);
            setSearchLoading(false);
        }, 500);

        return () => clearTimeout(handler);
    }, [search, pokemonList]);

    const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            if (search.length < 3) {
                setFilteredList(pokemonList);
                setPage(1);
                setSearchLoading(false);
                return;
            }
            setSearchLoading(true);
            const filtered = pokemonList.filter(p =>
                p.name.toLowerCase().includes(search.toLowerCase())
            );
            setFilteredList(filtered);
            setPage(1);
            setSearchLoading(false);
        }
    };

    if (loading) {
        return <Loader />;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    
    const startIndex = (page - 1) * PAGE_SIZE;
    const endIndex = startIndex + PAGE_SIZE;
    const paginatedList = filteredList.slice(startIndex, endIndex);
    const totalPages = Math.ceil(filteredList.length / PAGE_SIZE);

    return (
        <div>
            <div className="flex justify-center mb-4">
                <input
                    type="text"
                    className="px-2 py-1 border rounded w-64"
                    placeholder="Search Pokémon..."
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                    onKeyDown={handleSearchKeyDown}
                />
            </div>
            {searchLoading ? (
                <Loader />
            ) : (
                <>
                    {paginatedList.length === 0 && !searchLoading ? (
                        <div className="text-center text-gray-500 ">No Pokémon found.</div>
                    ) : (
                        <div className="flex flex-row flex-wrap justify-center gap-2 my-4">
                            {paginatedList.map((pokemon, index) => (
                                <PokemonCard
                                    key={startIndex + index}
                                    name={pokemon.name}
                                    url={pokemon.url}
                                />
                            ))}
                        </div>
                    )}
                    <div className="flex justify-center items-center gap-2 mt-4">
                        <button
                            className="px-2 py-1 bg-gray-700 text-white rounded disabled:opacity-50"
                            onClick={() => setPage(page - 1)}
                            disabled={page === 1}
                        >
                            Prev
                        </button>
                        <span>Page {page} of {totalPages}</span>
                        <button
                            className="px-2 py-1 bg-gray-700 text-white rounded disabled:opacity-50"
                            onClick={() => setPage(page + 1)}
                            disabled={page === totalPages}
                        >
                            Next
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default PokemonList;