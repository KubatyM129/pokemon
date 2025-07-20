export interface Pokemon {
    sprites: any; //placeholder 
    id: number;
    name: string;
    image: string;
    types: Array<PokemonType>;
    stats: Array<PokemonStat>;
    abilities: Array<PokemonAbility>;
    height: number;
    weight: number;
}

export interface PokemonType {
    slot: number;
    type: {
        name: string;
        url: string;
    };
}

export interface PokemonStat {
    base_stat: number;
    effort: number;
    stat: {
        name: string;
        url: string;
    };
}

export interface PokemonAbility {
    is_hidden: boolean;
    slot: number;
    ability: {
        name: string;
        url: string;
    };
}