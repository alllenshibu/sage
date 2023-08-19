"use client";
import Link from "next/link";
import { signIn } from "next-auth/react";
import Image from "next/image";

import CustomButton from "./CustomButton.jsx";

const NavBar = () => (
  <header className="w-full  absolute z-10">
    <nav className="max-w-[1440px] mx-auto flex justify-between items-center sm:px-16 px-6 py-4 bg-transparent">
      <Link href="/" className="flex justify-center items-center">
        <Image
          src="/sage.png"
          alt="logo"
          width={118}
          height={18}
          className="object-contain"
        />
      </Link>

      <CustomButton
        title="Sign in"
        btnType="button"
        containerStyles="text-primary-blue rounded-full bg-white min-w-[130px]"
        handleClick={() => {
          signIn("google");
        }}
      />
    </nav>
  </header>
);

export default NavBar;
