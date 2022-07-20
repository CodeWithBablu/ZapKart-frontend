import { useStateContext } from "../lib/context";
import { FiShoppingBag, FiShoppingCart } from "react-icons/fi";
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai";
import getStripe from "../lib/getStripe";

//framer motion
const { motion } = require('framer-motion');

//Animation variants
const card = {
  hidden: { opacity: 0, scale: 0.8 },
  show: { opacity: 1, scale: 1 },
}

const cards = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: {
      delayChildren: 0.4,
      staggerChildren: 0.1,
    }
  },
}


export default function Cart() {
  // qty, showCart, toggleCart, 
  const { cartItems, setShowCart, totalPrice, onAdd, onRemove } = useStateContext();

  //Payment
  const handleCheckout = async () => {
    const stripe = await getStripe();

    const response = await fetch('/api/stripe', {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cartItems),
    }
    );

    const data = await response.json();
    await stripe.redirectToCheckout({ sessionId: data.id });
  }

  return (

    // wrapper
    <motion.div
      key="wrapper"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex justify-end fixed right-0 
      top-0 h-screen w-full bg-black/50 z-20" onClick={() => setShowCart(false)}>
      {/* main cart section */}
      <motion.div
        key="cart"
        initial={{ x: "50%" }}
        animate={{ x: "0%" }}
        exit={{ x: "50%" }}
        transition={{ type: "tween" }}
        className="relative bg-[#f1f1f1] w-4/5 p-2 sm:w-3/5 sm:p-4 md:p-8 lg:w-2/5 overflow-y-scroll" onClick={(e) => e.stopPropagation()}>
        {
          cartItems.length < 1 ?
            (
              <motion.div
                key="emptyCart"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="absolute top-0 flex flex-col justify-center items-center
                h-full w-full -translate-x-2/4">
                <h1 className="text-lg p-4">You have more shopping to do 😋️</h1>
                <FiShoppingBag className="text-6xl" />
              </motion.div>
            ) :
            (
              <motion.div
                layout
                variants={cards}
                initial="hidden"
                animate="show"
              >
                {
                  cartItems.map((item) => {

                    return (
                      <motion.div
                        layout
                        variants={card}
                        key={item.slug} className="flex text-white items-center justify-around rounded-lg
                        shadow-lg shadow-rose-500 overflow-hidden bg-[#1e1f1e] py-8 px-4 my-6">
                        <img className=" border border-rose-300 w-20 object-cover" src={item.image.data.attributes.formats.thumbnail.url} alt="" />
                        <div className="flex flex-col w-2/4 justify-between">
                          <h2 className="text-white">{item.title}</h2>
                          <h2 className="text-gray-300">Rs.{item.price}</h2>
                          <div className="flex items-center space-x-1">
                            <span>Quantity : </span>
                            <button>
                              <AiFillMinusCircle onClick={() => onRemove(item, - 1)} />
                            </button>
                            <p>{item.quantity}</p>
                            <button>
                              <AiFillPlusCircle onClick={() => onAdd(item, 1)} />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )
                  }
                  )
                }
              </motion.div>
            )
        }
        {
          cartItems.length > 0 &&
          (
            <motion.div
              layout
            >
              <h3 className="mt-4">SubTotal: Rs.{totalPrice}</h3>
              <button onClick={handleCheckout} className=" w-full mt-4 p-2 text-white bg-black
                  cursor-pointer border-none">Purchase</button>
            </motion.div>
          )
        }
      </motion.div>
      {/* main cart section end */}
    </motion.div >
  );
}