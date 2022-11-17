import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Coincontextdata } from "./CryptoContext";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useEffect } from "react";
import axios from "axios";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Title,
  Tooltip,
  Legend
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

export default function Chartcoin() {
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

//maping a api data with chart data which present in state

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
        data: coindata.map((coin) => coin[1]),
        label: `Show`,
        borderColor: "blue",
        backgroundColor: "blue",
      },
    ],
  };

  return <Bar options={options} data={data} />;
}
