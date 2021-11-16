import dynamic from 'next/dynamic';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Container } from 'react-bootstrap';
import useSWR from 'swr';

import { GetPokemonAPIResponse } from 'typings/api';

const LazyPokemonData = dynamic(() => import('components/PokemonData'));

function PokemonView() {
  const router = useRouter();

  const { name: pokemonName } = router.query;

  const { data: response, error } = useSWR<GetPokemonAPIResponse, Error>(
    router.isReady && typeof pokemonName === 'string'
      ? `/api/pokemon?name=${encodeURI(pokemonName)}`
      : null,
  );

  if (error) {
    return (
      <>
        <Head>
          <title>Pokemon</title>
        </Head>

        <main className="p-4">
          <Container>
            <h1>{error.message}</h1>
          </Container>
        </main>
      </>
    );
  }

  if (!response) {
    return (
      <>
        <Head>
          <title>Pokemon</title>
        </Head>

        <main className="p-4">
          <Container>
            <h1>Loading . . .</h1>
          </Container>
        </main>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>
          {'pokemon' in response ? response.pokemon.name : 'Pokemon'}
        </title>
      </Head>

      <main className="p-4">
        <Container>
          {'message' in response ? (
            <h1>{response.message}</h1>
          ) : (
            <>
              <LazyPokemonData {...response.pokemon} />

              <footer>
                <Link href="/">
                  <a>
                    <p>
                      <strong>Back to Home</strong>
                    </p>
                  </a>
                </Link>
              </footer>
            </>
          )}
        </Container>
      </main>
    </>
  );
}

export default PokemonView;
