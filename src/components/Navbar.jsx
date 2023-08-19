"use client";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

import Logo from "../assets/brain-pic.png";

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
        rightIcon={
          "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/882px-Google_%22G%22_Logo.svg.png?20230305195327"
        }
        title={session && session.user ? "Sign Out" : "Sign In"}
        btnType="button"
        containerStyles="text-primary-blue rounded-full bg-white min-w-[130px]"
        handleClick={() =>
          session && session.user ? signOut() : signIn("google")
        }
      />
    </header>
  );
};

export default NavBar;
