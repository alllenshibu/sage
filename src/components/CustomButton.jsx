"use client";
import Image from "next/image";
import React from "react";

const Button = ({
  children,
  isDisabled,
  btnType,
  containerStyles,
  textStyles,
  title,
  rightIcon,
  handleClick,
}) => (
  <button
    disabled={isDisabled}
    type={btnType || "button"}
    className={`${containerStyles}`}
    onClick={handleClick}
  >
    <span className={`${textStyles}`}>{title}</span>
    {children}
  </button>
);

export default Button;
