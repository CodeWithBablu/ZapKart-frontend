import '../styles/globals.css'
import Head from 'next/head';
import { Provider, createClient } from "urql";
import { UserProvider } from '@auth0/nextjs-auth0';
import { Toaster } from 'react-hot-toast';

import Nav from '../components/Nav';

import { StateContext } from '../lib/context';

const client = createClient({ url: process.env.NEXT_PUBLIC_BACKEND_API });

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Head>
        <title>Zapcart</title>
        <link rel="icon" href="/images/zapkart.png" />
      </Head>
      <UserProvider>
        <StateContext>
          <Provider value={client}>
            <Toaster />
            <Nav />
            <Component {...pageProps} />
          </Provider>
        </StateContext>
      </UserProvider>
    </div>
  );
}

export default MyApp
