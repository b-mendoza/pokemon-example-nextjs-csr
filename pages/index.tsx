import debounce from 'lodash.debounce';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import Link from 'next/link';
import { useMemo } from 'react';
import { Col, Container, FormControl, Row } from 'react-bootstrap';
import useSWR from 'swr';

import { searchPokemons } from 'services/searchPokemons';

import { SearchPokemonsAPIResponse } from 'typings/api';

const LazyPokemonCard = dynamic(() => import('components/PokemonCard'));

function Home() {
  const { mutate, data: response } = useSWR<SearchPokemonsAPIResponse, Error>(
    `/api/search?q=${encodeURI('')}`,
  );

  const pokemonList = response?.pokemonList;

  const debouncedHandleSearch = useMemo(
    () =>
      debounce<
        NonNullable<React.ComponentProps<typeof FormControl>['onChange']>
      >(async (event) => {
        const input = event.target as HTMLInputElement;

        const inputValue = input.value;

        try {
          const data = await searchPokemons(inputValue);

          await mutate(data, false);
        } catch {
          console.error('__ERROR__', 'Fetching more Pokemons');
        }
      }, 500),
    [mutate],
  );

  return (
    <>
      <Head>
        <title>Pokemon</title>
      </Head>

      <main>
        <Container className="p-0">
          <FormControl
            aria-label="Search"
            className="mb-4"
            disabled={!pokemonList}
            placeholder="Search"
            onChange={debouncedHandleSearch}
          />

          {pokemonList ? (
            pokemonList.length ? (
              <Row xs={1} md={2} lg={3} xl={4}>
                {pokemonList.map((pokemon) => {
                  const { id, name } = pokemon;

                  return (
                    <Col key={id} className="mb-4">
                      <Link
                        href={`/pokemon/${encodeURI(name.english)}`}
                        prefetch={false}
                      >
                        <a>
                          <LazyPokemonCard {...pokemon} />
                        </a>
                      </Link>
                    </Col>
                  );
                })}
              </Row>
            ) : null
          ) : (
            <h1>Loading . . .</h1>
          )}
        </Container>
      </main>

      <style jsx>{`
        main {
          padding: 1.5rem;
        }
      `}</style>
    </>
  );
}

export default Home;
