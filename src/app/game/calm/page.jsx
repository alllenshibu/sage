"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const page = () => {
  const [counter, setCounter] = useState(10);
  const router = useRouter();
  useEffect(() => {
    const interval = setInterval(() => {
      setCounter(counter - 1);
    }, 1000);

    if (counter === 0) {
      clearInterval(interval);
      router.push("/dashboard/employee");
    }

    return () => {
      clearInterval(interval);
    };
  }, [counter]);
  return (
    <div className="flex h-screen w-screen justify-center items-center absolute z-50 top-0 left-0 bg-white">
      <p className="animate-pulse text-5xl font-bold text-gray-700">
        Calm Down {counter}
      </p>
    </div>
  );
};

export default page;
