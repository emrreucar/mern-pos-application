import { Button, Form, Input, Carousel, Checkbox, message } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import AuthCarousel from "../../components/auth/AuthCarousel";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    //console.log(values);
    try {
      const res = await fetch(
        process.env.REACT_APP_SERVER_URL + "/api/auth/login",
        {
          method: "POST",
          body: JSON.stringify(values),
          headers: { "Content-type": "application/json; charset=UTF-8" },
        }
      );

      // Sisteme giren kullanıcıyı localstorage'e kaydedelim. Tabi res.status=200 döndükten sonra
      const user = await res.json();
      //console.log(user);

      if (res.status === 200) {
        localStorage.setItem(
          "posUser",
          JSON.stringify({
            username: user.username,
            email: user.email,
          })
        );

        message.success("Giriş işlemi başarılı");
        navigate("/");
      } else if (res.status === 404) {
        message.error("Kullanıcı bulunamadı");
      } else if (res.status === 403) {
        message.error("Şifre yanlış");
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
          <Form
            layout="vertical"
            onFinish={onFinish}
            initialValues={{
              remember: false,
            }}
          >
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

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full"
                size="large"
              >
                Giriş Yap
              </Button>
            </Form.Item>

            <Form.Item name={"remember"}>
              <div className="flex justify-between items-center">
                <Checkbox>Beni Hatırla</Checkbox>
                <Link to={"/"} className="text-blue-500">
                  Şifrenizi mi unuttunuz?
                </Link>
              </div>
            </Form.Item>
          </Form>

          <div className="flex justify-center absolute left-0 bottom-10 w-full">
            Henüz bir hesabınız yok mu?
            <Link className="text-blue-600 ml-1" to={"/register"}>
              Şimdi Kaydol
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

export default Login;
