"use client";
import { useState } from "react";

import Image from "next/image";
import Prize from "@/assets/prize-box.png";
import Badge from "@/assets/badge.png";

export default function Page() {
  const [show, setShow] = useState(false);
  return (
    <div className="pb-36">
      <h1 className="mt-16 text-3xl text-center font-semibold">
        {show ? "Congrats you just got a good one" : "Claim your reward"}
      </h1>
      <Image
        src={Badge}
        width={300}
        height={300}
        className={`m-auto mt-12 ${show ? "block" : "hidden"}`}
      />
      <Image
        src={Prize}
        width={300}
        height={300}
        className={`m-auto ${show ? "hidden" : "block"}`}
        onClick={() => setShow(true)}
      />
    </div>
  );
}
