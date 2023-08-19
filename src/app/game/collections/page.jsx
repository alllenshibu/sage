import Badge1 from "@/assets/badge.png";
import Badge2 from "@/assets/badge-2.png";
import Empty from "@/assets/empty.png";

import Image from "next/image";

export default function Page() {
  return (
    <div className="min-h-[540px]">
      <h1 className="text-center text-3xl my-4 font-semibold">Your badges</h1>
      <div className="grid grid-cols-6 place-items-center pt-6">
        <Image src={Badge1} width={100} height={100} />
        <Image src={Badge2} width={100} height={100} />
        <Image src={Empty} width={100} height={100} />
        <Image src={Empty} width={100} height={100} />
        <Image src={Empty} width={100} height={100} />
        <Image src={Empty} width={100} height={100} />
      </div>
    </div>
  );
}
