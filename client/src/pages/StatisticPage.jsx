import React, { useState, useEffect } from "react";
import Header from "../components/header/Header";
import StaticCard from "../components/statistics/StatisticCard";
import { Area, Pie } from "@ant-design/plots";

const StatisticPage = () => {
  const [data, setData] = useState([]);
  const [products, setProducts] = useState([]);
  const user = JSON.parse(localStorage.getItem("posUser"));
  //console.log(user);

  // toplam ürünü yazdırmak için
  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await fetch(
          process.env.REACT_APP_SERVER_URL + "/api/products/get-all"
        );
        const data = await res.json();
        setProducts(data);
        //console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    getProducts();
  }, []);

  useEffect(() => {
    asyncFetch();
  }, []);

  const asyncFetch = () => {
    fetch(process.env.REACT_APP_SERVER_URL + "/api/bills/get-all")
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => {
        console.log("fetch data failed", error);
      });
  };

  const config = {
    data,
    xField: "customerName",
    yField: "subTotal",
    xAxis: {
      range: [0, 1],
    },
  };

  const config2 = {
    appendPadding: 10,
    data,
    angleField: "subTotal",
    colorField: "customerName",
    radius: 1,
    innerRadius: 0.6,
    label: {
      type: "inner",
      offset: "-50%",
      content: "{value}",
      style: {
        textAlign: "center",
        fontSize: 18,
      },
    },
    interactions: [
      {
        type: "element-selected",
      },
      {
        type: "element-active",
      },
    ],
    statistic: {
      title: false,
      content: {
        style: {
          whiteSpace: "pre-wrap",
          overflow: "",
          textOverflow: "ellipsis",
        },
        content: "Toplam\nDeğer",
      },
    },
  };

  const totalAmount = () => {
    const amount = data.reduce((total, item) => item.totalAmount + total, 0);
    return `${amount.toFixed(2)}₺`;
  };

  return (
    <>
      <Header />
      <div className="px-6 md:pb-0 pb-20">
        <h1 className="text-4xl font-bold text-center mb-4">İstatistiklerim</h1>
        <div className="statistic-section">
          <h2 className="text-lg">
            Hoş geldin, &nbsp;
            <span className="text-green-500 font-bold text-xl">
              {user.username}.
            </span>
          </h2>

          <div className="statistic-cards grid xl:grid-cols-4 md:grid-cols-2 my-10 md:gap-10 gap-4">
            <StaticCard
              title={"Toplam Müşteri"}
              amount={data?.length}
              img={"images/user.png"}
            />
            <StaticCard
              title={"Toplam Kazanç"}
              amount={totalAmount()}
              img={"images/money.png"}
            />
            <StaticCard
              title={"Toplam Satış"}
              amount={data?.length}
              img={"images/sale.png"}
            />
            <StaticCard
              title={"Toplam Ürün"}
              amount={products?.length}
              img={"images/product.png"}
            />
          </div>
          <div className="flex justify-between items-center gap-10 lg:flex-row flex-col">
            <div className="lg:w-1/2 lg:h-72 h-52">
              <Area {...config} />
            </div>
            <div className="lg:w-1/2 lg:h-72 h-52 ">
              <Pie {...config2} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StatisticPage;
