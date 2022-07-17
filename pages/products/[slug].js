import { useRouter } from "next/router";
import { useQuery } from "urql";

import {GET_PRODUCT_QUERY} from "../../lib/query"

//import icons
import {AiFillPlusCircle,AiFillMinusCircle} from "react-icons/ai"

//import context
import { useStateContext } from "../../lib/context";

export default function ProductDetails(){

    //use context
    const {qty,increaseQty,decreaseQty} = useStateContext();
    console.log(qty);

    //fetch the route
    const {query} = useRouter();

    // Fetch data from qraphql
    const [results]= useQuery({
        query: GET_PRODUCT_QUERY,
        variables: {
            slug: query.slug, 
        }   
    });

    const {data,fetching,error} = results;

    if(fetching) return <p>Loading...</p>;
    if(error) return <p>Oh No.. {error.message}</p>;

    //extract our data
    const {title, description, image} = data.products.data[0].attributes;


    return (
      <div className="flex justify-around mt-5">
        <img className=" w-auto h-auto rounded-xl" 
            src={image.data.attributes.formats.small.url} alt="" />
        <div className=" w-auto p-4 bg-slate-300 rounded-xl px-16">
          <h3 className=" text-2xl font-bold">{title}</h3>
          <p className=" text-md">{description}</p>
          <div className="flex items-center mt-2 ">
              <span className="text-xl font-bold font-mono">Quantity</span>
              <button className="flex text-2xl p-2 cursor-pointer"><AiFillMinusCircle onClick={decreaseQty}/></button>
              <p>{qty}</p>
              <button className="flex text-2xl p-2 cursor-pointer"><AiFillPlusCircle onClick={increaseQty}/></button>
          </div>
          <button className=" text-md text-white font-bold mt-3 w-3/5 py-3 rounded-md cursor-pointer bg-black">Add to Cart</button>
        </div>
      </div>
    );
}