import React, { useRef } from "react";
import { Button, Modal } from "antd";
import { useReactToPrint } from 'react-to-print';

const PrintBill = ({ isModalOpen, handleCancel, handleOk, customer }) => {
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  })

  return (
    <Modal
      title="Fatura Yazdır"
      open={isModalOpen}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={false}
      width={800}
    >
      <section className="py-20 bg-black" ref={componentRef}>
        <div className="max-w-5xl mx-auto bg-white px-6">
          <article className="overflow-hidden">
            <div className="logo my-6">
              <h2 className="text-4xl font-bold text-slate-700 md:text-left text-center">
                Meredev
              </h2>
            </div>

            <div className="bill-details md:text-left text-center">
              <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-12">
                <div className="text-md text-slate-500">
                  <p className="font-bold text-slate-700">Fatura Detayı</p>
                  <p className="font-semibold text-green-500"> {customer?.customerName} </p>
                  <p> {customer?.customerPhoneNumber} </p>
                  <p> {customer?.paymentMode} </p>
                </div>
                <div className="text-md text-slate-500">
                  <p className="font-bold text-slate-700">Fatura</p>
                  <p>Meredev A.Ş</p>
                  <p>Fake Street 007 SK.</p>
                  <p>Frisco</p>
                  <p>CA 0000</p>
                </div>
                <div className="text-md text-slate-500">
                  <div className="mb-4">
                    <p className="font-bold text-slate-700">Fatura Numarası:</p>
                    <p> 000{Math.floor(Math.random() * 100)} </p>
                  </div>
                  <div>
                    <p className="font-bold text-slate-700">Sipariş Tarihi</p>
                    <p>
                      {customer && customer.createdAt && (
                        <p> {customer.createdAt.substring(0, 10)} </p>
                      )}
                    </p>
                  </div>
                </div>
                <div className="text-md text-slate-500">
                  <div className="mb-4">
                    <p className="font-bold text-slate-700">Şartlar</p>
                    <p>10 Gün</p>
                  </div>
                  <div>
                    <p className="font-bold text-slate-700">Vade</p>
                    <p>29.06.2024</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bill-table-area mt-8">
              <table className="min-w-full divide-y divide-slate-500 overflow-hidden">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 text-left text-sm font-normal text-slate-700 sm:pl-6 md:pl-0 sm:table-cell hidden "
                    >
                      Görsel
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 text-left text-sm font-normal text-slate-700 sm:pl-6 md:pl-0 sm:table-cell hidden "
                    >
                      Başlık
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 text-center text-sm font-normal text-slate-700 sm:pl-6 md:pl-0 sm:table-cell hidden "
                    >
                      Fiyat
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 text-center text-sm font-normal text-slate-700 sm:pl-6 md:pl-0 sm:table-cell hidden "
                    >
                      Adet
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 text-end text-sm font-normal text-slate-700 sm:pl-6 md:pl-0 sm:table-cell hidden "
                    >
                      Toplam
                    </th>
                  </tr>
                </thead>



                <tbody>
                  {customer?.cartItems.map((item) => (
                    <tr>
                      <td className="py-4 pr-3">
                        <img
                          src={item.img}
                          alt="img"
                          className="w-12 h-12 object-cover"
                        />
                      </td>
                      <td className="py-4">
                        <span className="font-medium"> {item.title} </span>
                      </td>
                      <td className="py-4 text-center">
                        <span> {item.price.toFixed(2)}₺</span>
                      </td>
                      <td className="py-4 text-center">
                        <span>{item.quantity}</span>
                      </td>
                      <td className="py-4 text-end">
                        <span> {(item.price * item.quantity).toFixed(2)}₺ </span>
                      </td>
                    </tr>
                  ))}
                </tbody>




                <tfoot>
                  <tr>
                    <th className="text-right pt-6" colSpan="4" scope="row">
                      Ara Toplam
                    </th>
                    <th className="text-right pt-6 font-normal" scope="row">
                      {customer?.subTotal.toFixed(2)}₺
                    </th>
                  </tr>
                  <tr>
                    <th className="text-right pt-4" colSpan="4" scope="row">
                      KDV
                    </th>
                    <th
                      className="text-right pt-4 font-normal text-red-700"
                      scope="row"
                    >
                      {customer?.tax}₺
                    </th>
                  </tr>
                  <tr>
                    <th
                      className="text-right pt-4 pb-4"
                      colSpan="4"
                      scope="row"
                    >
                      Genel Toplam
                    </th>
                    <th className="text-right font-normal" scope="row">
                      {customer?.totalAmount.toFixed(2)}₺
                    </th>
                  </tr>
                </tfoot>




              </table>
              <div className="border-t pt-9 border-slate-400">
                <div className="py-9 font-light text-slate-700">
                  <p>
                    Ödeme koşulları 14 gündür. Paketlenmemiş Borçların Geç
                    Ödenmesi Yasası 0000'e göre, serbest çalışanların bu süreden
                    sonra borçların ödenmemesi durumunda 00.00 gecikme ücreti
                    talep etme hakkına sahip olduklarını ve bu noktada bu ücrete
                    ek olarak yeni bir fatura sunulacağını lütfen unutmayın.
                    Revize faturanın 14 gün içinde ödenmemesi durumunda, vadesi
                    geçmiş hesaba ek faiz ve %8 yasal oran artı %0,5 Bank of
                    England tabanı olmak üzere toplam %8,5 uygulanacaktır.
                    Taraflar Kanun hükümleri dışında sözleşme yapamazlar.
                  </p>
                </div>
              </div>
            </div>
          </article>
        </div>
      </section>
      <div className="flex justify-end mt-4">
        <Button type="primary" size="large" className="px-4" onClick={handlePrint}>
          Yazdır
        </Button>
      </div>
    </Modal>
  );
};

export default PrintBill;
