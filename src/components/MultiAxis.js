import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Coincontextdata } from "./CryptoContext";

import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
} from "chart.js";
import { Chart } from "react-chartjs-2";
import { useEffect } from "react";
import axios from "axios";

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController
);

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Chart Analysis",
    },
  },
};

export default function MultiAxis() {
  const { currency, daydata } = Coincontextdata();
  const { id } = useParams();
  const [coindata, setCoindata] = useState([]);
  
{/* here call the data of api of chart  */}
  useEffect(() => {
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency}&days=${daydata}`
      )
      .then((res) => {
        setCoindata(res.data.prices);
      });
  }, [daydata]);
  console.log("chart", coindata);
//maping a api data with chart data
  const labels = coindata.map((key) => {
    let date = new Date(key[0]);
    let time =
      date.getHours() > 12
        ? `${date.getHours() - 12}:${date.getMinutes()}pm`
        : `${date.getHours()}:${date.getMinutes()}am`;
    return daydata === "1" ? time : date.toLocaleDateString();
  });

  const data = {
    labels,
    datasets: [
      {
        type: "line",
        data: coindata.map((coin) => coin[1]),
        label: `Show`,
        borderWidth: 2,
        fill: true,

        borderColor: "purple",
        backgroundColor: "purple",
      },
    ],
    datasets1: [
      {
        type: "Bar",
        data: coindata.map((coin) => coin[1]),
        label: `Show`,
        borderWidth: 2,

        borderColor: "blue",
        backgroundColor: "gold",
      },
    ],
  };

  return <Chart type="bar"  options={options} data={data} />;
}
