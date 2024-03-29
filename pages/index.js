import Head from 'next/head'

import { useQuery } from 'urql';
import { PRODUCT_QUERY } from '../lib/query';

import Product from '../components/Product';

export default function Home() {

  const [results] = useQuery({ query: PRODUCT_QUERY });
  const { data, fetching, error } = results;


  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh No.. {error.message}</p>;

  const products = data.products.data;

  return (
    <div className="">
      <Head>
        <title>Zapcart</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/images/zapkart.png" />
      </Head>

      <main>
        <div className='mt-8 grid gap-8 grid-cols-auto-fit 
        '>
          {
            products.map((product) => (
              <Product key={product.attributes.slug} product={product} />
            ))
          }
        </div>
      </main>


    </div>
  );
}
