import Link from "next/link";
import Image from "next/image";
import { FiShoppingBag, FiShoppingCart } from "react-icons/fi";
import Cart from "./cart";
import User from "./User";
import { useStateContext } from "../lib/context";
import { useUser } from "@auth0/nextjs-auth0";
const { AnimatePresence, motion } = require("framer-motion");

export default function Nav() {

  const { showCart, totalQty, setShowCart } = useStateContext();
  const { user, error, isLoading } = useUser();

  return (

    <div className="flex text-md font-medium h-24 items-center justify-between">
      <Link href={'/'}>

        <div className="relative">
          <div className="absolute top-0 left-10 w-12 h-12 bg-purple-300 rounded-full
          filter blur-xl opacity-80 animate-blob animation-delay-2000"></div>

          <div className="absolute top-0 right-4 w-12 h-12 bg-rose-300 rounded-full
          filter blur-xl opacity-80 animate-blob animation-delay-4000"></div>

          <div className="absolute top-0 left-20 -bottom-2 w-12 h-12 bg-cyan-300 rounded-full
          filter blur-xl opacity-80 animate-blob animation-delay-7000"></div>

          <div className="flex justify-between items-center">
            <Image className=" rounded-full" src={`/images/zapkart.png`}
              width="44"
              height="44"
            />
            <span className="flex justify-between items-center font-bold text-3xl ml-4
            text-gradient bg-gradient-to-r from-green-500 via-danube-500 to-indigo-400">
              Zap<FiShoppingCart className="text-white mx-1" />Kart
            </span>
          </div>
        </div>
      </Link>

      {/* Left Section */}
      <div className="flex relative text-white items-center justify-between">

        <div className="absolute top-0 -left-2 w-12 h-12 bg-gray-100 rounded-full
          filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>

        <div className="absolute top-0 right-8 w-12 h-12 bg-rose-400 rounded-full
          filter blur-xl opacity-70 animate-blob animation-delay-7000"></div>

        <div className="absolute top-0 left-8 -bottom-2 w-12 h-12 bg-cyan-300 rounded-full
          filter blur-xl opacity-70 animate-blob animation-delay-3000"></div>

        <User />

        <div className="ml-2 relative flex flex-col items-center"
          onClick={() => setShowCart(true)}>
          {totalQty > 0
            &&
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute text-sm w-5 h-5 -top-1/4 -right-1/4 flex justify-center items-center 
              rounded-full bg-[#ff2626] pointer-events-none">{totalQty}</motion.span>}
          <FiShoppingBag />
          <h3 className="text-md text-gradient 
            bg-gradient-to-r from-pink-500 via-danube-500 to-yellow-400">cart</h3>
        </div>
      </div>
      <AnimatePresence>{showCart && <Cart />}</AnimatePresence>
    </div>

  );
}