import Image from "next/image";
import Link from "next/link";
const GameCard = ({ title, desc, link, img }) => {
  return (
    <div className="w-[550px] flex m-auto gap-6 transition-all border-2 border-blue-500 hover:border-blue-300 rounded-xl p-4">
      <Image src={img} alt={title} width={200} height={200} />
      <div className="relative">
        <h1 className="text-2xl font-medium">{title}</h1>
        <p>{desc}</p>
        <Link href={link} className="absolute bottom-1 text-blue-900 font-bold">
          Go right away
        </Link>
      </div>
    </div>
  );
};

export default GameCard;
