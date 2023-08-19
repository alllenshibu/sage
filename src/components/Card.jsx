import React from "react";
import Link from "next/link";
import Image from "next/image";

const Card = ({ title, link, img }) => {
  return (
    <div className="transition-all bg-white rounded-xl flex flex-col items-center w-[250px] h-[250px] shadow-lg m-2 hover:border-2 hover:border-blue-400">
      <Image src={img} className="w-full h-[120px] rounded-t-xl" />
      <div className="mt-4">
        <h2 className="text-lg text-center mb-4 font-medium">{title}</h2>
        <Link
          href={link}
          className="transition-all w-max bg-blue-600 hover:bg-blue-500 rounded-xl text-white font-medium py-2 px-4 "
        >
          Go to {title}
        </Link>
      </div>
    </div>
  );
};

export default Card;
