import React, { Fragment } from "react";
import classes from "../../../src/pages/singletransaksi.module.css";
import { currency } from "../../pages/SingleTransaksi";
import TombolEdit from "./TombolEdit";
import { TombolHapus } from "./TombolHapus";
export const TransaksiProdukDetail = ({ data }) => {
  const ukuranFungsi = () => {
    let dataUkuran = "";

    if (data?.ukuran?.celana?.length === 0) {
      const bajus = data?.ukuran?.kemBatJas[0];
      for (const key in bajus)
        if (key !== "_id") dataUkuran += ` ${bajus[key]} `;
    } else {
      const celana = data?.ukuran?.celana[0];

      for (const key in celana)
        if (key !== "_id" && celana[key] !== "")
          dataUkuran += ` ${celana[key]} `;
    }
    return dataUkuran;
  };

  const hasilSplit = data?.deskripsi?.split("\n");

  const dataGambarKetSort = data?.gambarDanKeterangan?.map((datas, i) => (
    <img
      key={i}
      width="100px"
      height="100px"
      src={datas?.url}
      className={`rounded float-start ${classes.down}`}
      alt="gambarcheckout"
    />
  ));

  const dataGambarKet =
    data?.gambarDanKeterangan?.length === 0
      ? "Tidak ada gambar"
      : dataGambarKetSort;

  return (
    <Fragment>
      <div className={`row ${classes.content}`}>
        <div className="col-4">
          <h1 className={classes.subtitle}>ID Pakaian</h1>
        </div>

        <div className="col-8">
          <h1 className={classes.datas}>: {data?.idProduct}</h1>
        </div>

        <div className="col-4">
          <h1 className={classes.subtitle}>Nama Pakaian</h1>
        </div>

        <div className="col-8">
          <h1 className={classes.datas}>: {data?.namaPakian}</h1>
        </div>

        <div className="col-4">
          <h1 className={classes.subtitle}>Jenis Pakaian</h1>
        </div>

        <div className="col-8">
          <h1 className={classes.datas}>: {data?.jenisPakaian}</h1>
        </div>

        <div className="col-4">
          <h1 className={classes.subtitle}>Stock</h1>
        </div>

        <div className="col-8">
          <h1 className={classes.datas}>: {data?.stock}</h1>
        </div>

        <div className="col-4">
          <h1 className={classes.subtitle}>Harga</h1>
        </div>

        <div className="col-8">
          <h1 className={classes.datas}>: {currency(data.harga)}</h1>
        </div>

        <div className="col-4">
          <h1 className={classes.subtitle}>Ukuran</h1>
        </div>

        <div className="col-8">
          <h1 className={classes.datas}>: {ukuranFungsi()}</h1>
        </div>

        <div className="col-4">
          <h1 className={classes.subtitle}>Gambar</h1>
        </div>
        <div className="col-8">
          {data?.gambar?.map((datas, i) => (
            <img
              key={i}
              width="100px"
              height="100px"
              src={datas?.url}
              className={`rounded float-start ${classes.down}`}
              alt="gambarcheckout"
            />
          ))}
        </div>

        <div className="col-4">
          <h1 className={classes.subtitle}>Gambar Thumbnail</h1>
        </div>
        <div className="col-8">
          {data?.gambarThumbnail?.map((datas, i) => (
            <img
              key={i}
              width="100px"
              height="100px"
              src={datas?.url}
              className={`rounded float-start ${classes.down}`}
              alt="gambarcheckout"
            />
          ))}
        </div>

        <div className="col-4">
          <h1 className={classes.subtitle}>Gambar dan Keterangan</h1>
        </div>
        <div className="col-8">
          <h1 className={classes.datas}> {dataGambarKet}</h1>
        </div>

        <div className="col-4">
          <h1 className={classes.subtitle}>Deskripsi Produk</h1>
        </div>
        <div className="col-8">
          {hasilSplit?.map((data, i) => (
            <h1 key={i} className={classes.datas}>
              {data}
            </h1>
          ))}
        </div>
      </div>
      <br />
      <br />
      <br />
      <div className={`row ${classes.content} justify-content-center`}>
        <div className="col-3 justify-content-center">
          <TombolEdit allData={data} />
        </div>

        <div className="col-3 justify-content-center">
          <TombolHapus idProduct={data.idProduct} />
        </div>
      </div>
      <br />
    </Fragment>
  );
};
