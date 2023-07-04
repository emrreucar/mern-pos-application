import { Button, Form, Input, Carousel, message } from "antd";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import AuthCarousel from "../../components/auth/AuthCarousel";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    //console.log(values);
    setLoading(true);
    try {
      const res = await fetch(
        process.env.REACT_APP_SERVER_URL + "/api/auth/register",
        {
          method: "POST",
          body: JSON.stringify(values),
          headers: { "Content-type": "application/json; charset=UTF-8" },
        }
      );

      if (res.status === 200) {
        message.success("Kayıt işlemi başarılı");
        navigate("/login");
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      message.error("Bir şeyler yanlış gitti");
    }
  };

  return (
    <div className="h-screen">
      <div className="flex justify-between h-full">
        <div className="relative xl:px-20 px-10 w-full flex flex-col h-full justify-center">
          <h1 className="text-center text-5xl font-bold mb-2">Meredev</h1>
          <Form layout="vertical" onFinish={onFinish}>
            <Form.Item
              label="Kullancı Adı"
              name={"username"}
              rules={[
                {
                  required: true,
                  message: "Kullanıcı adı boş bırakılamaz!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Email"
              name={"email"}
              rules={[
                {
                  required: true,
                  message: "Email alanı boş bırakılamaz!",
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Şifre"
              name={"password"}
              rules={[
                {
                  required: true,
                  message: "Şifre alanı boş bırakılamaz!",
                },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item
              label="Şifre Tekrar"
              name={"passwordAgain"}
              dependencies={["password"]}
              rules={[
                {
                  required: true,
                  message: "Şifre tekrar alanı boş bırakılamaz!",
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Şifreler eşleşmedi!"));
                  },
                }),
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full"
                size="large"
                loading={loading}
              >
                Kaydol
              </Button>
            </Form.Item>
          </Form>

          <div className="flex justify-center absolute left-0 bottom-10 w-full">
            Bir hesabınız var mı?
            <Link className="text-blue-600 ml-1" to={"/login"}>
              Şimdi Giriş Yap
            </Link>
          </div>
        </div>
        <div className="xl:w-4/6 lg:w-3/5 md:w-1/2 md:flex hidden bg-[#6c63ff] h-full ">
          <div className="w-full h-full flex items-center">
            <div className="w-full">
              <Carousel className="!h-full px-6" autoplay>
                <AuthCarousel
                  img={"/images/responsive.svg"}
                  title={"Responsive"}
                  desc={"Tüm Cihaz Boyutlarıyla Uyumluluk"}
                />
                <AuthCarousel
                  img={"/images/statistic.svg"}
                  title={"İstatistikler"}
                  desc={"Geniş Tutulan İstatistikler"}
                />
                <AuthCarousel
                  img={"/images/customer.svg"}
                  title={"Müşteri Memnuniyeti"}
                  desc={"Deneyim Sonunda Üründen Memnun Müşteriler"}
                />
                <AuthCarousel
                  img={"/images/admin.svg"}
                  title={"Yönetim Paneli"}
                  desc={"Tek Yerden Yönetim"}
                />
              </Carousel>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
