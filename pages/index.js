import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import Header from "./Components/Header.js";
import Posts from "./Components/Posts.js";
import Search from "./Components/Search.js";
import Sort from "./Components/Sort.js";
import { useQuery } from "@apollo/client";

const ALL_POKEMONS = gql`
  query pokemons($first: Int!) {
    pokemons(first: $first) {
      id
      number
      name
      types
      image
    }
  }
`;

export default function Home() {
  const { loading, error, data } = useQuery(ALL_POKEMONS, {
    variables: {
      first: 200,
    },
  });

  if (loading) {
    return (
      <div class="box">
        <div class="plane"></div>
      </div>
    );
  }
  if (error) {
    return <div>Error ....</div>;
  }

  return (
    <>
      <Header />
      {/* <Search /> */}
      <div className="bg-white pt-4" id="pokemons">
        {/* <Sort /> */}
        <Posts posts={data.pokemons} />
      </div>
    </>
  );
}

export async function getStaticProps() {
  var page = 20;
  const client = new ApolloClient({
    uri: "https://graphql-pokemon2.vercel.app/.",
    cache: new InMemoryCache(),
  });

  const data = await client.query({
    query: gql`
    query pokemons{
      pokemons(first: ${page}){
        id
        number
        name
        types
        image
      }
    }
    `,
  });

  return {
    props: {
      posts: data.data.pokemons,
      page: page,
    },
  };
}
