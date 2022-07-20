import { useRouter } from "next/router";
import { useQuery } from "urql";
import { toast } from "react-hot-toast";
import { useEffect } from "react";

import { GET_PRODUCT_QUERY } from "../../lib/query"

//import icons
import { AiFillPlusCircle, AiFillMinusCircle } from "react-icons/ai"

//import context
import { useStateContext } from "../../lib/context";

export default function ProductDetails() {

  //use context
  const { qty, increaseQty, decreaseQty, setQty, onAdd } = useStateContext();

  //Reset Qty
  useEffect(() => {
    setQty(1);
  }, []);

  //fetch the route
  const { query } = useRouter();

  // Fetch data from qraphql
  const [results] = useQuery({
    query: GET_PRODUCT_QUERY,
    variables: {
      slug: query.slug,
    }
  });

  const { data, fetching, error } = results;

  if (fetching) return <p>Loading...</p>;
  if (error) return <p>Oh No.. {error.message}</p>;

  //extract our data
  const product = data.products.data[0].attributes;
  const { title, description, image } = product;

  //create Toast
  const notify = () => {
    toast.success(`${title} added to cart`, {
      duration: 1500,
      icon: "👏️",
      style: {
        borderRadius: '10px',
        background: '#eaebe3',
        color: '#000000',
        fontSize: 18,
      },
    });
  }

  return (
    <div className="flex flex-col space-y-5 items-center lg:flex-row lg:justify-around lg:space-x-4 lg:space-y-0 mt-5">
      <img className="w-4/5 h-96 sm:w-auto lg:w-96 lg:h-96 rounded-xl object-cover"
        src={image.data.attributes.formats.small.url} alt="" />
      <div className="w-4/5 p-4 sm:w-full md:h-auto md:w-3/5 lg:h-96 lg:p-8 bg-slate-300 rounded-xl">
        <h3 className=" text-2xl font-bold">{title}</h3>
        <p className=" text-md">{description}</p>
        <div className="flex items-center mt-2 ">
          <span className="text-xl font-bold font-mono">Quantity</span>
          <button className="flex text-2xl p-2 cursor-pointer"><AiFillMinusCircle onClick={decreaseQty} /></button>
          <p>{qty}</p>
          <button className="flex text-2xl p-2 cursor-pointer"><AiFillPlusCircle onClick={increaseQty} /></button>
        </div>
        <button className=" text-md text-white font-bold mt-3 w-3/5 py-3 
          rounded-md cursor-pointer bg-black" onClick={() => {
            onAdd(product, qty);
            notify();
          }}>Add to Cart</button>
      </div>
    </div>
  );
}