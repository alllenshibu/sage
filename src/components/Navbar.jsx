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
        containerStyles="flex items-center justify-center px-4 py-2 mr-4 md:mr-2 transition-all text-white text-sm md:text-base rounded-full bg-blue-500 gap-1 hover:bg-blue-400"
        handleClick={() =>
          session && session.user
            ? signOut()
            : signIn("google", {
                callbackUrl: "http://127.0.0.1:3000/dashboard/",
              })
        }
      >
        <FaGoogle />
      </CustomButton>
    </header>
  );
};

export default NavBar;
