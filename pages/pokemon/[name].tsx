import axios from 'axios';
import { Pokemon as PokemonType } from 'models';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Col, Container, Row } from 'react-bootstrap';
import { useQuery } from 'react-query';
import LinkTo from 'components/LinkTo';

const getPokemon = async (_: string, name: string) => {
  const { data } = await axios.get<PokemonType>(
    `/api/pokemon?name=${escape(name)}`,
  );

  return data;
};

function Pokemon() {
  const router = useRouter();

  const { data } = useQuery(['pokemonName', router.query.name], () =>
    getPokemon('pokemonName', router.query.name as string),
  );

  return (
    <>
      <div>
        <Head>
          <title>{(data ? data.name.english : null) || 'Pokemon'}</title>
        </Head>

        <Container>
          {data ? (
            <>
              <Row>
                <Col xs={6}>
                  <h1>{data.name.english}</h1>

                  <br />

                  {Object.entries(data.base).map(([key, value]) => (
                    <Row key={key}>
                      <Col xs={3}>
                        <p>{key}</p>
                      </Col>
                      <Col xs={4}>
                        <h5>{value}</h5>
                      </Col>
                    </Row>
                  ))}
                </Col>

                <Col xs={6}>
                  <Image
                    src={`/pokemon/${data.name.english
                      .toLowerCase()
                      .replace(' ', '-')}.jpg`}
                    height={350}
                    width={350}
                  />
                </Col>
              </Row>
            </>
          ) : null}

          <Link href="/">
            <a>
              <h3>Return to Home</h3>
            </a>
          </Link>
        </Container>
      </div>

      <style jsx>{`
        div {
          padding: 3rem;
        }
      `}</style>
    </>
  );
}

export default Pokemon;
