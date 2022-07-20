import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

const { motion } = require('framer-motion');

const stripe = require('stripe')(`${process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY}`)

export async function getServerSideProps(params) {

  const order = await stripe.checkout.sessions.retrieve(
    params.query.session_id,
    {
      expand: ["line_items"],
    }
  );

  return { props: { order } };
}

export default function Success({ order }) {

  return (
    <motion.div className="lg:mx-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.75 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2 }}
        className="flex flex-col items-center border-2 border-sky-300 shadow-2xl shadow-sky-400
        pt-2">
        <h1 className="text-cyan-400 text-2xl font-mono font-extrabold mt-2">Thank you for your Order!</h1>
        <h2 className="text-rose-200 mt-2">A confirmation email has been sent to</h2>
        <h2 className="text-sky-300">{order.customer_details.email}</h2>
        <div className="flex justify-around w-full md:w-4/5 lg:w-3/5 mt-4 mb-4">
          <div className="font-semibold px-2">
            <h3 className="text-white text-lg mb-2">Address</h3>
            {
              Object.entries(order.customer_details.address).map(([key, val]) => (
                <p className="text-[#837c7c]" key={key}>
                  <span className="text-cyan-300">{key}: </span>
                  <span className="text-slate-300">{val}</span>
                </p>
              ))
            }
          </div>
          <div className="font-semibold px-2">
            <h3 className="text-white text-lg mb-2">Products</h3>
            {
              order.line_items.data.map(item => (
                <div className="text-[#837c7c]" key={item.id}>
                  <p className="text-sky-400">Product : {item.description}</p>
                  <p className="text-amber-400 ml-2">Quantity : {item.quantity}</p>
                  <p className="text-rose-400 ml-2">Price : {item.price.unit_amount}</p>
                </div>
              ))
            }
          </div>
        </div>

        <Link href={'/'}>
          <button className="bg-white text-md px-4 shadow-lg shadow-rose-400 font-bold p-1 cursor-pointer mt-2">Continue Shopping</button>
        </Link>
        <br />
        <div className="pb-2">
          <Image src={'/images/kunfupanda.png'}
            width={400}
            height={370}
            alt='Kunfu-Panda'
          ></Image>
        </div>
      </motion.div>
    </motion.div >
  );
}