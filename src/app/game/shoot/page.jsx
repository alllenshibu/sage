"use client";
import React, { useState, useRef } from "react";
import Image from "next/image";

import Duck from "@/assets/duck_image.png";

const App = () => {
  const [pos, setPos] = useState({ left: "0%", top: "28%" });
  const counter = useRef(0);

  function shootDuck() {
    if (counter.current === 0) {
      alert(
        "Click on the duck to shoot it. You have 10 seconds to shoot as many ducks as possible. Good luck!"
      );
      setTimeout(() => {
        alert("Time's up! You shot " + counter.current + " ducks.");
        counter.current = 0;
      }, 10000);
    }
    const left = Math.floor(Math.random() * 95) + "%";
    const top = Math.floor(Math.random() * 60 + 28) + "%";
    setPos({ left, top });
    counter.current++;
  }

  return (
    <div className="h-[540px] relative bg-[url('https://www.desktopbackground.org/download/1366x768/2014/07/26/799251_flappy-bird-charizard-edition-on-scratch_1920x1080_h.png')] cursor-[crosshair]">
      <h1 className="text-2xl text-center font-semibold pt-12">
        Shoot the duck
      </h1>
      <div className="text-2xl text-center">Score: {counter.current}</div>
      <Image
        src={Duck}
        className="absolute w-[80px] h-[80px]"
        style={{ left: pos.left, top: pos.top }}
        onClick={() => shootDuck()}
      />
    </div>
  );
};

export default App;
