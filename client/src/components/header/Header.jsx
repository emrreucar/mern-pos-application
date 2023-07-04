import React from "react";
import { Input, Badge, message } from "antd";
import {
  SearchOutlined,
  HomeOutlined,
  ShoppingCartOutlined,
  CopyOutlined,
  UserOutlined,
  BarChartOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import "./index.css";

const Header = ({ setSearch }) => {
  const cart = useSelector((state) => state.cart);
  //console.log(cart.cartItems.length);
  const { pathname } = useLocation();
  const navigate = useNavigate();

  //console.log(pathName)

  const logOut = () => {
    if (window.confirm("Çıkış yapmak istediğinizden emin misiniz?")) {
      localStorage.removeItem("posUser");
      navigate("/login");
      message.success("Çıkış işlemi başarılı");
    }
  };

  return (
    <div className="border-b mb-6">
      <header className="py-4 px-6 flex items-center justify-between gap-10">
        <div className="logo">
          <Link to={"/"}>
            <h2 className="text-2xl font-medium md:text-4xl">Meredev</h2>
          </Link>
        </div>
        <div className="header-search flex-1 flex justify-center">
          <Input
            size="large"
            placeholder="Ürün Ara..."
            prefix={<SearchOutlined />}
            className="rounded-full max-w-[800px] "
            onChange={(e) => setSearch(e.target.value.toLowerCase())}
            onClick={() => {
              pathname !== "/" && navigate("/");
            }}
          />
        </div>
        <div className="menu-links">
          <Link
            to={"/"}
            className={`menu-link ${pathname === "/" && "active"}`}
          >
            <HomeOutlined className="md:text-2xl text-xl" />
            <span className="md:text-xs text-[10px]">Ana Sayfa</span>
          </Link>
          <Badge
            count={cart.cartItems.length}
            offset={[0, 0]}
            className="md:flex hidden"
          >
            <Link
              to={"/cart"}
              className={`menu-link ${pathname === "/cart" && "active"}`}
            >
              <ShoppingCartOutlined className="md:text-2xl text-xl" />
              <span className="md:text-xs text-[10px]">Sepet</span>
            </Link>
          </Badge>
          <Link
            to={"/bills"}
            className={`menu-link ${pathname === "/bills" && "active"}`}
          >
            <CopyOutlined className="md:text-2xl text-xl" />
            <span className="md:text-xs text-[10px]">Faturalar</span>
          </Link>
          <Link
            to={"/customers"}
            className={`menu-link ${pathname === "/customers" && "active"}`}
          >
            <UserOutlined className="md:text-2xl text-xl" />
            <span className="md:text-xs text-[10px]">Müşteriler</span>
          </Link>
          <Link
            to={"/statistics"}
            className={`menu-link ${pathname === "/statistics" && "active"}`}
          >
            <BarChartOutlined className="md:text-2xl text-xl" />
            <span className="md:text-xs text-[10px]">İstatistikler</span>
          </Link>
          <div onClick={logOut}>
            <Link className={`menu-link`}>
              <LogoutOutlined className="md:text-2xl text-xl" />
              <span className="md:text-xs text-[10px]">Çıkış</span>
            </Link>
          </div>
        </div>

        <Badge
          count={cart.cartItems.length}
          offset={[0, 0]}
          className="md:hidden flex"
        >
          <Link
            to="/cart"
            className={`menu-link ${pathname === "/cart" && "active"}`}
          >
            <ShoppingCartOutlined className="text-2xl" />
            <span className="md:text-xs text-[10px]">Sepet</span>
          </Link>
        </Badge>
      </header>
    </div>
  );
};

export default Header;
