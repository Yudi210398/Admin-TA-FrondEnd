import React, { Fragment, useState } from "react";
import { useParams } from "react-router-dom";
import Container from "../shared/Container.js";
import { useOrderId } from "../shared/util/http-getIdOrder.js";
import GagalTransaksi from "./components/singleTransaksi/GagalTransaksi.js";
import ListTransaksi from "./components/singleTransaksi/ListTransaksi.js";
import ModalTransaksi from "./components/singleTransaksi/ModalTransaksi.js";
import SuksesTransaksi from "./components/singleTransaksi/SuksesTransaksi.js";
import classes from "./singletransaksi.module.css";

export const currency = (daTa) =>
  new Intl.NumberFormat("id", {
    style: "currency",
    currency: "IDR",
    maximumSignificantDigits: 3,
  }).format(daTa);

function SingleTransaksi() {
  const [modalShow, setModalShow] = useState(false);
  const [modalShowResi, setModalShowResi] = useState(false);

  const { idorder } = useParams();

  const { data, pesanVerify } = useOrderId(idorder);
  console.log(data?.buktiTranfer);

  const terkirimAcc = data?.resiPengiriman && data?.gambarResi.url && true;

  return (
    <Container>
      <div className="row justify-content-center">
        <div className="col-12">
          <h1 className={classes.title}>DETAIL TRANSAKSI</h1>
        </div>

        <div className="col-12">
          <hr />
        </div>
      </div>

      {pesanVerify !== null && (
        <h1 className={`text-center ${classes.pesanverify}`}>DATA TIDAK ADA</h1>
      )}
      {pesanVerify === null && (
        <Fragment>
          <div className={`row ${classes.content}`}>
            <div className="col-4">
              <h1 className={classes.subtitle}>NO ORDER</h1>
            </div>

            <div className="col-8">
              <h1 className={classes.datas}>{data?._id}</h1>
            </div>

            <div className="col-4">
              <h1 className={classes.subtitle}>NAMA CUSTOMER</h1>
            </div>

            <div className="col-8">
              <h1 className={classes.datas}>{data?.userId.namaUser}</h1>
            </div>

            <div className="col-4">
              <h1 className={classes.subtitle}>ALAMAT CUSTOMER</h1>
            </div>

            <div className="col-8">
              <h1 className={classes.datas}>
                {data?.userId.alamat.rumah[0].provinsiKota},
                {` ${data?.userId.alamat.rumah[0].kecamatan}`},
                {` ${data?.userId.alamat.rumah[0].alamatLengkap}`},
                {` ${data?.userId.alamat.rumah[0].patokan}`}
              </h1>
            </div>

            <div className="col-4">
              <h1 className={classes.subtitle}>TELEPON CUSTOMER</h1>
            </div>

            <div className="col-8">
              <h1 className={classes.datas}>
                {data?.userId.alamat.rumah[0].handphone}
              </h1>
            </div>

            <div className="col-4">
              <h1 className={classes.subtitle}>TOTAL PEMBAYARAN</h1>
            </div>

            <div className="col-8">
              <h1 className={classes.datas}>
                {` ${currency(data?.totalHarga)} `} (sudah termasuk ongkir)
              </h1>
            </div>

            <div className="col-4">
              <h1 className={classes.subtitle}>BUKTI TRANSFER</h1>
            </div>

            <div className="col-8">
              <img
                onClick={() => setModalShow(true)}
                width="150px"
                height="150px"
                src={data?.buktiTranfer?.url}
                className={`rounded float-start ${classes.gambar}`}
                alt="gambarTransaksi"
              />
            </div>

            <ModalTransaksi
              labelmodal={!modalShowResi ? "Bukti Transfer" : "Resi Pengiriman"}
              bukti={!modalShowResi ? data?.buktiTranfer : data.gambarResi}
              show={modalShow}
              onHide={() => {
                setModalShowResi(false);
                setModalShow(false);
              }}
            />

            <div className="col-4">
              <h1 className={classes.subtitle}>TANGGAL DAN WAKTU</h1>
            </div>

            <div className="col-8">
              <h1 className={classes.datas}>{data?.tanggal}</h1>
            </div>

            {terkirimAcc && (
              <Fragment>
                <div className="col-4">
                  <h1 className={classes.subtitle}>NO RESI</h1>
                </div>

                <div className="col-8">
                  <h1 className={classes.datas}>{data?.resiPengiriman}</h1>
                </div>

                <div className="col-4">
                  <h1 className={classes.subtitle}>GAMBAR RESI</h1>
                </div>

                <div className="col-8">
                  <img
                    onClick={() => {
                      setModalShow(true);
                      setModalShowResi(true);
                    }}
                    width="150px"
                    height="150px"
                    src={data?.gambarResi?.url}
                    className={`rounded float-start ${classes.gambar}`}
                    alt="gambarTransaksi"
                  />
                </div>

                {/* <ModalTransaksi
                  bukti={data?.gambarResi}
                  show={modalShow}
                  onHide={() => setModalShow(false)}
                /> */}
              </Fragment>
            )}
          </div>
          <h1 className={`${classes.content} ${classes.subtitle}`}>PRODUK</h1>
          <br />
          <br />

          <div className={`row ${classes.content}`}>
            {data?.produks.map((data, i) => (
              <ListTransaksi
                key={i}
                quantity={data?.quantity}
                datas={data}
                noteProduk={data?.noteProduk}
                ukuran={data?.ukuran}
                namaPakian={data?.produk.namaPakian}
                harga={data.produk.harga}
                gambarDanKeterangan={data.produk.gambarDanKeterangan}
                gambar={data.produk.gambar}
              />
            ))}
          </div>

          {!terkirimAcc && (
            <Fragment>
              <br />
              <br />
              <br />
              <br />
              <div className={`row ${classes.content} justify-content-center`}>
                <div className="col-6">
                  <SuksesTransaksi idData={data?._id} />
                </div>

                <div className="col-6">
                  <GagalTransaksi />
                </div>
              </div>
            </Fragment>
          )}
          <br />

          <br />
        </Fragment>
      )}
    </Container>
  );
}

export default SingleTransaksi;
