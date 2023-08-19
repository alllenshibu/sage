"use client";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

import CustomButton from "./CustomButton.jsx";

const NavBar = () => {
  const { data: session } = useSession();

  return (
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
      </nav>
    </header>
  );
};

export default NavBar;
