import Link from "next/link";

export default function Product({product}){

  const { title, price, image, slug } = product.attributes;
  const imgUrl= image.data.attributes.formats.small.url
  return (
    <div className="flex flex-col items-center relative bg-gray-300 font-bold">
      <div className="">
        <Link href={`/products/${slug}`}>
          <img className=" p-2 md:h-72 md:w-72 cursor-pointer" src={imgUrl} alt="" />
        </Link>
      </div>
        <h2 className="p-2">{title}</h2>
        <h3>{price}</h3>
    </div>
  );
}