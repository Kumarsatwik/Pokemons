import { ApolloClient, InMemoryCache, gql } from "@apollo/client";
import typeColor from "../ColorType/colors.js";
import Image from 'next/image';

export const getStaticPaths = async () => {
  const client = new ApolloClient({
    uri: "https://graphql-pokemon2.vercel.app/.",
    cache: new InMemoryCache(),
  });

  const response = await client.query({
    query: gql`
      query pokemons {
        pokemons(first: 200) {
          id
        }
      }
    `,
  });
  const posts = response.data.pokemons;
  const path = posts.map((data) => {
    return {
      params: {
        id: data.id,
      },
    };
  });

  return {
    paths: path,
    fallback: false,
  };
};

export async function getStaticProps({ params }) {
  if (!params || !params.id) {
    throw new Error("Invalid input: id is required");
  }

  console.log("param", params.id);

  const client = new ApolloClient({
    uri: "https://graphql-pokemon2.vercel.app/.",
    cache: new InMemoryCache(),
    onError: ({ networkError, graphQLErrors }) => {
      console.log("graphQLErrors", graphQLErrors);
      console.log("networkError", networkError);
    },
  });

 
  const data = await client.query({
    query: gql`
      query pokemon($id: String!) {
        pokemon(id: $id) {
          id
          name
          number
          weight {
            minimum
            maximum
          }
          height {
            minimum
            maximum
          }
          classification
          types
          resistant
          weaknesses
          fleeRate
          maxCP
          maxHP
          image
          
        }
      }
    `,
    variables: {
      id: params.id,
    },
    });
    // console.log("data post ",data);
  return {
    props: {
      data,
    },
  };
}

const Home = ({ data }) => {
  const post = data.data.pokemon;
  
  return (
    <section className="bg-white min-h-screen">
      <div className="h-10 py-10">
        <h1 className="text-center text-3xl font-bold ">
          {post.name} <label className="text-gray-400">#{post.number}</label>
        </h1>
      </div>
      <div className="grid lg:grid-cols-2 sm:grid-cols-1 mt-10  h-3/6">
          <div className=" border w-5/6 ml-10 p-3 ">
          <Image
            src={post.image} 
            width={300}
            height={400}
            className=" mx-auto h-[400px]  " alt=""
            />
          </div>
        
        <div className=" px-10 text-xl mr-10 h-[4/6]">
            <div className="flex flex-wrap bg-[#30a7d7] rounded-md px-10 mb-5">

                <div className="p-4">
                    <p className="font-semibold text-white">Height</p>
                    <p className="text-sm">Minimum : {post.height.minimum}</p>
                    <p className="text-sm">Maximum : {post.height.maximum}</p>
                </div>
                <div className="p-4">
                    <p className="font-semibold text-white">Weight</p>
                    <p className="text-sm">Minimum : {post.weight.minimum}</p>
                    <p className="text-sm">Maximum : {post.weight.maximum}</p>
                </div>
                <div className="p-4">
                    <p className="font-semibold text-white">FleeRate</p>
                    <p className="text-sm">{post.fleeRate}</p>
                </div>
                <div className="p-4">
                    <p className="font-semibold text-white">Classification</p>
                    <p className="text-sm">{post.classification}</p>
                </div>
                <div className="p-4">
                    <p className="font-semibold text-white">maxCP</p>
                    <p className="text-sm">{post.maxCP}</p>
                </div>
                <div className="p-4">
                    <p className="font-semibold text-white">maxHP</p>
                    <p className="text-sm">{post.maxHP}</p>
                </div>
                
            </div>

          <div>
            <h1>Types</h1>
            <section className="flex my-2 gap-x-2   ">
              {post.types.map((type, index) => {
                return (
                  <p
                    key={index}
                    className={`text-sm px-2 rounded ${typeColor[type]} ml-1`}
                  >
                    {type}
                  </p>
                );
              })}
            </section>
            <h1>Resistant</h1>
            <section className="flex mt-2 gap-x-2">
              {post.resistant.map((type, index) => {
                return (
                  <p
                    key={index}
                    className={`text-sm px-2 rounded ${typeColor[type]} ml-1`}
                  >
                    {type}
                  </p>
                );
              })}
            </section>
          </div>

          <div className="flex flex-wrap"></div>
        </div>
      </div>
    </section>
  );
};
export default Home;
