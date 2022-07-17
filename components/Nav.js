import Link from "next/link";
import Image from "next/image";
import {FiShoppingBag,FiShoppingCart} from "react-icons/fi";

export default function Nav(){

    return (
    
        <div className="flex text-md font-medium h-24 items-center justify-between">
        <Link href={'/'}>

        <div className="relative">
          <div class="absolute top-0 left-10 w-12 h-12 bg-purple-300 rounded-full
          filter blur-xl opacity-80 animate-blob animation-delay-2000"></div>

          <div class="absolute top-0 right-4 w-12 h-12 bg-rose-300 rounded-full
          filter blur-xl opacity-80 animate-blob animation-delay-4000"></div>

          <div class="absolute top-0 left-20 -bottom-2 w-12 h-12 bg-cyan-300 rounded-full
          filter blur-xl opacity-80 animate-blob animation-delay-7000"></div>

          <div className=" bg-transparent z-40 flex justify-between items-center">
            <Image className=" rounded-full" src={`/images/zapkart.png`}
                width="54"
                height="54"
              />
              <span className="flex text-white justify-between items-center font-bold text-2xl ml-4">
                Zap<FiShoppingCart className="mx-1" />Kart
              </span>
          </div>
        </div>
        </Link>

        {/* Left Section */}
        <div className="flex relative text-white items-center justify-around">
          
          <div class="absolute top-0 -left-2 w-12 h-12 bg-gray-100 rounded-full
          filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>

          <div class="absolute top-0 right-8 w-12 h-12 bg-rose-400 rounded-full
          filter blur-xl opacity-70 animate-blob animation-delay-7000"></div>

          <div class="absolute top-0 left-8 -bottom-2 w-12 h-12 bg-cyan-300 rounded-full
          filter blur-xl opacity-70 animate-blob animation-delay-3000"></div>

          <div className="ml-2 relative flex flex-col items-center">
              <FiShoppingBag/>
              <h3 className="text-white">cart</h3>
          </div>
        </div>
      </div>
      
    );
}