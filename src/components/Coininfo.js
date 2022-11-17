import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import "../components/common.css";
import Chartcoin from "./Chartcoin";
import { Select, MenuItem } from "@material-ui/core";
import { CircularProgress } from "@material-ui/core";
import { Coincontextdata } from "./CryptoContext";
import Barchart from "./Barchart";
import MultiAxis from "./MultiAxis";
export default function Coininfo() {
  const { currency, symbol, setDaydata } = Coincontextdata();
  const { daydata } = Coincontextdata();
  const { id } = useParams();

  const [infodata, setInfodata] = useState([]);
  const [flag, setFlag] = useState(false);
  const [chartshow, SetChartshow] = useState("Line");
  {
    /* call api using axios and useEffect*/
  }
  useEffect(() => {
    axios
      .get(`https://api.coingecko.com/api/v3/coins/${id}`)
      .then((response) => {
        setInfodata([response.data]);
        setFlag(true);
     
      });
  }, [currency, chartshow]);

  console.warn("info", infodata);

  return (
    <>
      <div>
        {/* (UX- anhance user experiance) here i apply condition if api is call and data i present in state show the chart and other info otherwise circular progress is loading. */}
        {!infodata | (flag === false) ? (
          <div className="loader">
            {" "}
            <CircularProgress
              style={{
                color: "gold",
                position: "relative",
                top: "350px",
                left: "750px",
              }}
              size={70}
              thickness={2}
            />
          </div>
        ) : (
          <div className="chart-vis" style={{ position: "absolute" }}>
            {/* here its a select botton which provides (day,week,month,year) for chart */}
            <div className="btn-ifo" style={{}}>
              <Select
                variant="outlined"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={daydata}
                style={{
                  width: 100,
                  height: 40,
                  position: "relative",
                  left: 300,
                  top: -50,
                  color: "black",
                  backgroundColor: "yellow",
                }}
                onChange={(e) => setDaydata(e.target.value)}
              >
                <MenuItem value={"1"}>Day</MenuItem>
                <MenuItem value={"7"}>Week</MenuItem>
                <MenuItem value={"30"}>Month</MenuItem>
                <MenuItem value={"365"}>Year</MenuItem>
              </Select>

              {/* here its a select botton which provides different type charts(line,bar,multi-axis) for chart */}
              <Select
                variant="outlined"
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={chartshow}
                style={{
                  width: 100,
                  height: 40,
                  position: "relative",
                  left: 350,
                  top: -50,
                  color: "black",
                  backgroundColor: "yellow",
                }}
                onChange={(e) => SetChartshow(e.target.value)}
              >
                <MenuItem value={"Line"}>Line</MenuItem>
                <MenuItem value={"Bar"}>Bar</MenuItem>
                <MenuItem value={"M-Axis"}>M-Axis</MenuItem>
              </Select>
            </div>

            <div style={{ position: "relative", top: 50 }}>
              {/* here condition if user select chart type (Line,bar or m-axis) show the chart type according to it-thats user gets selected */}
              {chartshow === "Line" ? (
                <Chartcoin />
              ) : chartshow === "Bar" ? (
                <Barchart />
              ) : (
                <MultiAxis />
              )}
            </div>
          </div>
        )}
        <div className="coinchartdes">
          {/*here map the information about coin which display on page  */}

          {infodata.map((key) => {
            return (
              <>
                <div className="ifo-div">
                  <p className="name-coin">{key.name}</p>
                  <div>
                    hi
                    <img className="imgcoininfo" src={key.image.large} alt="" />
                  </div>

                  <div className="description-main">
                    <p
                      style={{
                        padding: "10px 20px",
                        width: "800px",
                        top: "-100px",
                        left: "300px",
                        position: "relative",
                        color: "gold",
                      }}
                    >
                      {key.description.en.split(". ")[0]}.
                    </p>

                    <p>
                      <span
                        style={{
                          fontSize: "20px",
                          position: "relative",

                          left: "320px",
                          position: "relative",
                          top: "10px",
                          color: "white",
                        }}
                      >
                        Market cap : {symbol}
                        {key.market_data.market_cap[currency.toLowerCase()]
                          .toString()
                          .slice(0, -6)}
                      </span>
                    </p>
                    <p>
                      <span
                        style={{
                          padding: "10px",
                          fontSize: "20px",
                          color: "white",
                          position: "relative",
                          top: "-130px",
                          left: "310px",
                        }}
                      >
                        Rank: {key.market_cap_rank}
                      </span>
                    </p>
                    <p>
                      <span
                        style={{
                          padding: "10px",
                          fontSize: "20px",
                          color: "white",
                          position: "relative",
                          top: "-110px",
                          left: "310px",
                        }}
                      >
                        Current price :{symbol}
                        {
                          key.market_data.current_price[currency.toLowerCase()]
                        }{" "}
                      </span>
                    </p>
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}
