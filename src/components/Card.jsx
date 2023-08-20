import React from "react";
import Link from "next/link";
import Image from "next/image";

const Card = ({ title, desc, link, img }) => {
  return (
    <Link href={link}>
      <div className="transition-all bg-white rounded-xl flex flex-col items-center w-[250px] h-[250px] shadow-lg m-2 hover:scale-[1.02]">
        <Image src={img} className="w-full h-[120px] rounded-t-xl" />
        <div className="mt-4 px-4">
          <h2 className="text-lg font-medium">{title}</h2>
          <p className="text-justify text-sm">{desc}</p>
        </div>
      </div>
    </Link>
  );
};

export default Card;
