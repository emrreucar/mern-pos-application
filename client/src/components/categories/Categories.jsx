import React, { useState, useEffect } from "react";
import { PlusOutlined, EditOutlined } from "@ant-design/icons";
import Add from "./Add";
import Edit from "./Edit";
import "./style.css";

const Categories = ({ categories, setCategories, setFiltered, products }) => {
  const [isAddModalOpen, setAddIsModalOpen] = useState(false);
  const [isEditModalOpen, setEditIsModalOpen] = useState(false);
  const [categoryTitle, setCategoryTitle] = useState("Tümü");

  useEffect(() => {
    if (categoryTitle === "Tümü") {
      setFiltered(products);
    } else {
      setFiltered(products.filter((item) => item.category === categoryTitle));
    }
  }, [products, setFiltered, categoryTitle]);

  //console.log(categoryTitle);

  return (
    <ul className="flex md:flex-col gap-4 text-lg">
      {categories.map((item) => (
        <li
          className={`category-item ${item.title === categoryTitle && "!bg-pink-700"}`}
          key={item._id}
          onClick={() => setCategoryTitle(item.title)}
        >
          <span> {item.title} </span>
        </li>
      ))}

      <li
        className="category-item !bg-purple-800 hover:opacity-90"
        onClick={() => setAddIsModalOpen(true)}
      >
        <PlusOutlined className="md:text-2xl" />
      </li>

      <li
        className="category-item !bg-orange-800 hover:opacity-90"
        onClick={() => setEditIsModalOpen(true)}
      >
        <EditOutlined />
      </li>
      <Add
        isAddModalOpen={isAddModalOpen}
        setAddIsModalOpen={setAddIsModalOpen}
        categories={categories}
        setCategories={setCategories}
      />
      <Edit
        isEditModalOpen={isEditModalOpen}
        setEditIsModalOpen={setEditIsModalOpen}
        categories={categories}
        setCategories={setCategories}
      />
    </ul>
  );
};

export default Categories;
