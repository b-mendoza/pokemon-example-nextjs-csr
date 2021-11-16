import { SearchPokemonsAPIResponse } from 'typings/api';

export const searchPokemons = async (searchQuery = '') => {
  const response = await fetch(`/api/search?q=${encodeURI(searchQuery)}`);

  return (await response.json()) as Promise<SearchPokemonsAPIResponse>;
};
