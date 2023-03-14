import React from "react";
import Container from "../../shared/Container";
import { useHttpProductDetail } from "../../shared/util/http-detailProduk";
import classes from "../../../src/pages/singletransaksi.module.css";
import { TransaksiProdukDetail } from "../components/TransaksiProdukDetail";

const DetailTransaksiProduck = () => {
  const { datas } = useHttpProductDetail();
  return (
    <Container>
      <div className="row justify-content-center">
        <div className="col-12">
          <h1 className={classes.title}>DETAIL PRODUK</h1>
        </div>
      </div>
      <hr />

      <TransaksiProdukDetail data={datas} />
    </Container>
  );
};

export default DetailTransaksiProduck;
