import React from "react";
import Container from "../../shared/Container";
import classes from "../../../src/pages/singletransaksi.module.css";
import { useHttpProductDetail } from "../../shared/util/http-detailProduk";
import EditCelana from "../components/EditCelana";
import EditHalamanBajuJAsBatik from "../components/EditHalamanBajuJAsBatik";
const HalamanEditProduk = () => {
  const { datas } = useHttpProductDetail();
  let dataUkuranPakaianEdit =
    datas?.jenisPakaian === "celana" ? (
      <EditCelana data={datas} />
    ) : (
      <EditHalamanBajuJAsBatik data={datas} />
    );
  return (
    <Container>
      <div className="row justify-content-center">
        <div className="col-12">
          <h1 className={classes.title}>EDIT PRODUK</h1>
        </div>
      </div>
      <hr />

      {dataUkuranPakaianEdit}
      <br />
    </Container>
  );
};

export default HalamanEditProduk;
