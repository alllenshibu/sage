"use client";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

import Logo from "../assets/brain-pic.png";
import { FaGoogle } from "react-icons/fa";

import CustomButton from "./CustomButton.jsx";

const NavBar = () => {
  const { data: session } = useSession();

  return (
    <header className="w-full h-16 md:h-20 sticky top-0 bg-white z-10 flex items-center justify-between md:px-6">
      <Link href="/" className="flex justify-center items-center relative">
        <Image src={Logo} alt="logo" height={58} className="object-contain" />
        <h1 className="text-2xl font-semibold absolute left-16">Sage</h1>
      </Link>

      <CustomButton
        title={session && session.user ? "Sign Out" : "Sign In"}
        btnType="button"
        containerStyles="transition-all text-white rounded-full bg-blue-500 min-w-[130px] gap-1 hover:bg-blue-400"
        handleClick={() =>
          session && session.user ? signOut() : signIn("google")
        }
      >
        <FaGoogle />
      </CustomButton>
    </header>
  );
};

export default NavBar;
