"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

import axios from "axios";

export default function Page() {
  const [data, setData] = useState("");
  const router = useRouter();

  async function handleClick() {
    const res = await fetch("/api/counselling/request", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ subject: data }),
    });
    console.log(res);
    router.push("/dashboard/employee");
  }
  return (
    <div className="h-[540px] px-28 pt-12">
      <h1 className="text-3xl font-semibold mb-6 pl-4">What's on your mind</h1>
      <textarea
        type="text"
        className="h-[300px] w-full rounded-xl py-6 px-4 border-2 border-black outline-none focus:border-blue-500"
        value={data}
        onChange={(event) => setData(event.target.value)}
      />
      <button
        type="submit"
        className="transition-all w-max mt-6 ml-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-xl"
        onClick={handleClick}
      >
        Submit
      </button>
    </div>
  );
}
