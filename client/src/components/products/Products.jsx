import React, {useState } from "react";
import ProductItem from "./ProductItem";
import { PlusOutlined, EditOutlined } from "@ant-design/icons";
import Add from "./Add";
import { useNavigate } from "react-router-dom";

const Products = ({ categories, filtered, products, setProducts, search }) => {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const navigate = useNavigate("");

  return (
    <div className="product-wrapper grid grid-cols-card gap-4">
      {filtered
      .filter((product) => product.title.toLowerCase().includes(search))
      .map((item) => (
        <ProductItem item={item} key={item._id} />
      ))}

      <div className="flex items-center justify-center gap-2">
        <div
          className="product-item border bg-purple-800 hover:shadow-lg cursor-pointer transition-all select-none flex justify-center items-center hover:opacity-90"
          onClick={() => setIsAddModalOpen(true)}
        >
          <PlusOutlined className="text-white md:text-3xl text-4xl " />
        </div>
        <div
          className="product-item border bg-orange-800 hover:shadow-lg cursor-pointer transition-all select-none flex justify-center items-center hover:opacity-90"
          onClick={() => navigate("/products")}
        >
          <EditOutlined className="text-white md:text-3xl text-4xl" />
        </div>
      </div>
      <Add
        isAddModalOpen={isAddModalOpen}
        setIsAddModalOpen={setIsAddModalOpen}
        categories={categories}
        products={products}
        setProducts={setProducts}
      />
    </div>
  );
};

export default Products;
