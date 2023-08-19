import React from "react";
import Link from "next/link";

const Card = ({ title, link }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg h-36 w-1/3 m-2">
      <h2 className="text-lg font-medium mb-4">{title}</h2>
      <Link
        href={link}
        className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg"
      >
        Go to {title}
      </Link>
    </div>
  );
};

export default Card;
