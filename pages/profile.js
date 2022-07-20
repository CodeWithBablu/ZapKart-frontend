import Link from "next/link";

import { withPageAuthRequired, getSession } from "@auth0/nextjs-auth0";

import formatMoney from "../lib/formatMoney";

const stripe = require('stripe')(`${process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY}`);


export const getServerSideProps = withPageAuthRequired({

  async getServerSideProps(ctx) {
    const session = getSession(ctx.req, ctx.res);
    const stripeId = session.user[`${process.env.AUTH0_BASE_URL}/stripe_customer_id`];
    const paymentIntents = await stripe.paymentIntents.list({
      customer: stripeId,
    });

    return {
      props: {
        orders: paymentIntents.data,
      }
    }
  }
});


export default function Profile({ user, orders }) {

  return (
    user && (
      <div>
        <div className=" shadow-xl shadow-sky-300 p-3">
          <h2 className="text-cyan-400 text-xl font-bold mt-8">{user.name}</h2>
          <p className="text-rose-200 text-md font-bold mt-2">{user.email}</p>
          <div>
            {
              orders.map(order => (
                <div key={order.id} className="bg-slate-300 mt-4 px-2 md:px-6 py-4 
                flex flex-col justify-between">
                  <h1 className="text-black font-bold">Order Number : {order.id}</h1>
                  <h2 className="text-rose-700 font-bold">Amount : Rs. {formatMoney(order.amount)}</h2>
                  <h2 className="text-indigo-700 font-bold">Receipt Email : {order.receipt_email}</h2>
                </div>
              ))
            }
          </div>
        </div>
        <Link href={'/api/auth/logout'}>
          <button className="text-black text-lg font-mono font-bold mt-14 mb-14 py-2 px-6 w-44 bg-cyan-500">Logout!!</button>
        </Link>
      </div>

    )
  );
}