import React from "react";
import useConvert from "../hooks/useConvert";

export default function Converter({ number }) {
  const convertedNumber = useConvert(number);

  return <h1>{convertedNumber}</h1>;
}
