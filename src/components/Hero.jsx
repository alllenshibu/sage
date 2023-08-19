"use client";

import Image from "next/image";

import Link from "next/link";

import HeroImage from "@/assets/hero.png";

import { CustomButton } from "@/components";

const Hero = () => {
  const handleScroll = () => {
    const nextSection = document.getElementById("discover");

    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="h-[540px] flex flex-col md:flex-row justify-center items-center">
      <div className="flex flex-col gap-2 pl-8 md:pl-24 pt-12 md:pt-8 leading-8">
        <h1 className="text-2xl md:text-5xl font-semibold">
          Comprehensive Corporate
          <br /> Well-being Solutions
        </h1>
        <p className="text-xl font-medium">
          Nurturing minds,Boosting success,Innovating well-being in the
          corporate world
        </p>
        <Link
          href="/dashboard"
          className="transition-all hover:bg-blue-500 bg-blue-600 mt-4 w-max text-white text-lg rounded-3xl px-4 py-2"
        >
          Explore your mind
        </Link>
      </div>
      <Image src={HeroImage} width={800} />
    </div>
  );
};

export default Hero;
