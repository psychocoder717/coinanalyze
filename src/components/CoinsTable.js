import React from "react";
import axios from "axios";
import "../components/common.css";
import { Select, MenuItem } from "@material-ui/core";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { CircularProgress } from "@material-ui/core";
import { Coincontextdata } from "./CryptoContext";

export default function CoinsTable() {
  const [coinsdata, setCoinsdata] = useState([]);
  const [flag, setFlag] = useState(false);
  const [handlesearch, setHandlesearch] = useState("");

  const { currency, symbol, setCurrency } = Coincontextdata();//its context provider (state management)

{/* call api using axios and useEffect*/}
  useEffect(() => {
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=100&page=1&sparkline=true`
      )
      .then((response) => {
        setCoinsdata(response.data);
        setFlag(true);
      });
  }, [currency]);

// function filters coins according to its first letter of name

  const Handlesearching = () => {
    return coinsdata.filter(
      (coin) =>
        coin.name.toLowerCase().includes(handlesearch) ||
        coin.image.toLowerCase().includes(handlesearch)
    );
  };
  return (
    <>
      <section class="text-gray-600 bg-black h-full body-font">
        <div className="body-list">
          <div class="container px-5 py-16 mx-auto">
            <div class="flex flex-col text-center w-full mb-20">
              <div className="namediv">
                <h1
                  class="sm:text-1xl relative text-center text-2xl 
       font-medium title-font mb-1 left-0 m- top-28 text-white"
                >
                  Coins
                </h1>
                    {/* search bar*/}
                <div class="form-floating mb-1 ">
                  <input
                    type="email"
                    class="form-control"
                    onChange={(e) => setHandlesearch(e.target.value)}
                    autoComplete="off"
                    id="floatingInput"
                    placeholder="name@example.com"
                  />
                  <label for="floatingInput">Search coins...</label>
                </div>
              </div>
            </div>


            {/* change the currency by select currency options */}
            <div className="curchangebtn">
              <Select
                variant="outlined"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={currency}
                style={{
                  width: 100,
                  height: 40,
                  position: "relative",
                  left: 300,
                  top: 40,
                  color: "black",
                  backgroundColor: "gold",
                }}
                onChange={(e) => setCurrency(e.target.value)}
              >
                <MenuItem value={"USD"}>USD</MenuItem>
                <MenuItem value={"INR"}>INR</MenuItem>
              </Select>
            </div>
            {!coinsdata | (flag === false) ? (
              <div className="loadertable">
                <CircularProgress
                  style={{
                    color: "gold",
                    position: "relative",
                    top: "300px",
                    left: "700px",
                  }}
                  size={70}
                  thickness={3}
                />
              </div>
            ) : (
              <div class="flex flex-wrap relative top-28 -m-1">
                {/* map data using handlesearching function which filters the coins according its name-first letter of coin*/}
                {Handlesearching().map((key) => {
                  return (
                    <>
                      <div class="p-2 lg:w-1/4 relative bottom-10 md:w-1/2 w-full">
                        <div class="h-full flex items-center border-gray-200 border p-2  rounded-lg">
                          <img
                            alt="team"
                            class="w-14 h-14 bg-gray-100 object-cover object-center flex-shrink-0 rounded-full mr-4"
                            src={key.image}
                          />
                          <Link to={`/coinsdata/${key.id}`}>
                            <div class="flex-grow items-center">
                              <h2 class="text-white relative top-1 title-font font-medium">
                                {key.name}
                              </h2>
                              <p class="text-blue-500 relative top-3 text-sm">
                                {symbol}
                                {key.current_price.toFixed(2)}
                              </p>
                            </div>
                            {key.price_change_percentage_24h > 0 ? (
                              <div className="per24hchange">
                                <p style={{ color: "green" }}>
                                  {key.price_change_percentage_24h}%
                                </p>
                              </div>
                            ) : (
                              <div className="per24hchange">
                                <p style={{ color: "red" }}>
                                  {key.price_change_percentage_24h}%
                                </p>
                              </div>
                            )}
                          </Link>
                        </div>
                      </div>
                    </>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
