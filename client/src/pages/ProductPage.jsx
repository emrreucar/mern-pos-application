import React from "react";
import Header from "../components/header/Header";
import Edit from "../components/products/Edit";

const ProductPage = () => {
  return (
    <>
      <Header />
      <div>
        <h1 className="text-4xl font-bold text-center mb-6">Ürünler</h1>
        <Edit/>
      </div>
    </>
  );
};

export default ProductPage;
