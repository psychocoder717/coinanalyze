
// state management with createContect() and useContext hook;

import React from "react";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";

const Coincontext = createContext();
export default function CryptoContext({ children }) {
  const [currency, setCurrency] = useState("INR");
  const [symbol, setSymbol] = useState("₹");
  const [daydata, setDaydata] = useState("7");

  {/* here set a symbol of by change the currency */}
  useEffect(() => {
    if (currency === "INR") setSymbol("₹");
    else if (currency === "USD") setSymbol("$");
  }, [currency]);
{/* here sets a period or history of data like (1day,1week,1month,1year) */}

  useEffect(() => {
    if (daydata === "1");
    else if (daydata === "7");
    else if (daydata === "30");
    else if (daydata === "365");
  }, [daydata]);

  return (
    <>
       {/* here value provider for other components in our app */}

      <Coincontext.Provider
        value={{ currency, setCurrency, symbol, setDaydata, daydata }}
      >
        {children}
      </Coincontext.Provider>
    </>
  );
}

export const Coincontextdata = () => {
  return useContext(Coincontext);
};
