import { Button, message } from "antd";
import React from "react";
import {
  ClearOutlined,
  PlusCircleOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { deleteCart, increase, decrease, reset } from "../../redux/cartSlice";
import { useNavigate } from 'react-router-dom';

const CartTotals = () => {
  const cart = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  return (
    <div className="cart h-full max-h-[calc(100vh_-_90px)] flex flex-col">
      <h2 className="bg-blue-600 text-center py-4 text-white font-bold tracking-wide">
        Sepetteki Ürünler
      </h2>

      <ul className="cart-items px-2 flex flex-col gap-y-3 py-2 overflow-y-auto">
        {cart.cartItems.length > 0 ? (
          cart.cartItems.map((item) => (
            <li className="cart-item flex justify-between" key={item._id}>
              {/* cart item left */}
              <div className="flex items-center">
                <img
                  src={item.img}
                  alt="appleimage"
                  className="w-16 h-16 object-cover cursor-pointer"
                  onClick={() => {
                    if (
                      window.confirm(
                        "Ürünü silmek istediğinizden emin misiniz?"
                      )
                    ) {
                      dispatch(deleteCart(item));
                      message.success("Ürün başarıyla silindi");
                    }
                  }}
                />
                <div className="flex flex-col ml-2">
                  <b> {item.title} </b>
                  <span>
                    {item.price}₺ x {item.quantity}
                  </span>
                </div>
              </div>
              {/* cart item right */}
              <div className="flex items-center">
                <Button
                  type="primary"
                  size="small"
                  className="w-full flex items-center justify-center !rounded-full"
                  icon={<MinusCircleOutlined />}
                  onClick={() => {
                    if (item.quantity === 1) {
                      if (window.confirm("Ürün silinsin mi?")) {
                        dispatch(decrease(item));
                      }
                    }
                    if (item.quantity > 1) {
                      dispatch(decrease(item));
                    }
                  }}
                />
                <span className="font-bold w-6 inline-block text-center">
                  {" "}
                  {item.quantity}{" "}
                </span>
                <Button
                  type="primary"
                  size="small"
                  className="w-full flex items-center justify-center !rounded-full"
                  icon={<PlusCircleOutlined />}
                  onClick={() => dispatch(increase(item))}
                />
              </div>
            </li>
          )).reverse()
        ) : (
          <p>Sepetinizde hiç ürün yok!</p>
        )}
      </ul>

      <div className="car-totals mt-auto">
        <div className="border-t border-b">
          <div className="flex justify-between p-2">
            <b>Ara Toplam</b>
            <span> {cart.total.toFixed(2)}₺</span>
          </div>
          <div className="flex justify-between p-2">
            <b>KDV %{cart.tax} </b>
            <span className="text-red-700">
              {" "}
              {(cart.total * cart.tax) / 100 > 0
                ? `+${((cart.total * cart.tax) / 100).toFixed(2)}`
                : 0}
              ₺
            </span>
          </div>
        </div>
        <div className="border-b mt-4">
          <div className="flex justify-between p-2">
            <b className="text-xl text-green-500">Genel Toplam</b>
            <span className="text-xl">
              {" "}
              {(cart.total + (cart.total * cart.tax) / 100).toFixed(2)} ₺
            </span>
          </div>
        </div>
        <div className="py-4 px-2">
          <Button
            className="w-full"
            type="primary"
            size="large"
            disabled={cart.cartItems.length > 0 ? false : true}
            onClick={() => navigate("/cart") }
          >
            Sipariş Oluştur
          </Button>
          <Button
            className="w-full mt-2 flex items-center justify-center"
            type="primary"
            danger
            disabled={cart.cartItems.length > 0 ? false : true}
            size="large"
            icon={<ClearOutlined />}
            onClick={() => {
              if (
                window.confirm("Sepeti boşaltmak istediğinizden emin misiniz?")
              ) {
                dispatch(reset());
                message.success("Tüm ürünler başarıyla silindi");
              }
            }}
          >
            Temizle
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartTotals;
