import React from "react";
import { Modal, Form, Input, Select, Card, Button, message } from "antd";
import { useSelector, useDispatch } from "react-redux";

import { reset } from "../../redux/cartSlice";
import { useNavigate } from "react-router-dom";

const CreateBill = ({ isModalOpen, handleCancel, handleOk }) => {
  // Sepete eklediğimiz ürünleri bu sayfada da görelim.
  const cart = useSelector((state) => state.cart);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onFinish = async (values) => {
    //console.log("Form içerisindeki girilen değerler: ", values);
    try {
      const res = await fetch(
        process.env.REACT_APP_SERVER_URL + "/api/bills/add-bill",
        {
          method: "POST",
          body: JSON.stringify({
            ...values,
            subTotal: cart.total,
            tax: ((cart.total * cart.tax) / 100).toFixed(2),
            totalAmount: (cart.total + (cart.total * cart.tax) / 100).toFixed(
              2
            ),
            cartItems: cart.cartItems,
          }),
          headers: { "Content-type": "application/json; charset=UTF-8" },
        }
      );

      if (res.status === 200) {
        message.success("Fatura başarıyla oluşturuldu");
        dispatch(reset());
        navigate("/bills");
      }
    } catch (error) {
      message.error("Bir şeyler yanlış gitti");
      console.log(error);
    }
  };

  return (
    <Modal
      title="Fatura Oluştur"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={false}
    >
      <Form layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Müşteri Adı"
          name={"customerName"}
          rules={[
            {
              required: true,
              message: "Müşteri adı girilmesi zorunludur!",
            },
          ]}
        >
          <Input placeholder="Bir müşteri adı yazınız" />
        </Form.Item>

        <Form.Item
          label="Tel No"
          name={"customerPhoneNumber"}
          rules={[
            {
              required: true,
              message: "Telefon numarası girilmesi zorunludur!",
            },
          ]}
        >
          <Input placeholder="Bir tel no yazınız" maxLength={11} />
        </Form.Item>

        <Form.Item
          label="Ödeme Yöntemi"
          name={"paymentMode"}
          rules={[
            {
              required: true,
              message: "Ödeme yöntemi seçmek zorunludur!",
            },
          ]}
        >
          <Select placeholder="Ödeme Yöntemi Seçiniz">
            <Select.Option value="Nakit">Nakit</Select.Option>
            <Select.Option value="Kredi Kartı">Kredi Kartı</Select.Option>
            <Select.Option value="Veresiye">Veresiye</Select.Option>
          </Select>
        </Form.Item>

        <Card>
          <div className="flex justify-between items-center">
            <span>Ara Toplam</span>
            <span> {cart.total > 0 ? cart.total.toFixed(2) : 0}₺ </span>
          </div>
          <div className="flex justify-between items-center my-2">
            <span>KDV %{cart.tax} </span>
            <span className="text-red-700">
              {(cart.total * cart.tax) / 100 > 0
                ? `+${((cart.total * cart.tax) / 100).toFixed(2)}`
                : 0}
              ₺
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-bold">Genel Toplam</span>
            <b className="text-xl">
              {(cart.total + (cart.total * cart.tax) / 100).toFixed(2)} ₺
            </b>
          </div>
          <div className="flex justify-end">
            <Button type="primary mt-4" size="medium" htmlType="submit">
              Fatura Oluştur
            </Button>
          </div>
        </Card>
      </Form>
    </Modal>
  );
};

export default CreateBill;
