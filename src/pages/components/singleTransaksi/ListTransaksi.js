import React, { Fragment } from "react";
import classes from "./listTransaksi.module.css";

export function dataGambar(data, datasingle, gambar) {
  const gambarNote = data?.filter((daGam) => {
    return daGam?.keterangan === datasingle;
  });
  return gambarNote.length === 0 ? gambar[0].url : gambarNote[0].url;
}
const ListTransaksi = ({
  quantity,
  noteProduk,
  ukuran,
  namaPakian,
  gambarDanKeterangan,
  gambar,
}) => {
  const gambarhasil = dataGambar(gambarDanKeterangan, noteProduk, gambar);

  return (
    <Fragment>
      <div className="col-2">
        <img
          width="100px"
          height="100px"
          src={gambarhasil}
          className={`rounded float-start ${classes.listgambar}`}
          alt="gambarcheckout"
        />
      </div>

      <div className={`col-3 ${classes.listmargin}`}>
        <p className={classes.marginp}> {namaPakian}</p>
      </div>

      <div className={`col-2 ${classes.listmargin}`}>
        <p className={classes.marginp}>Ukuran: {ukuran}</p>
      </div>

      <div className={`col-3 ${classes.listmargin}`}>
        <p className={classes.marginp}>Note: {noteProduk}</p>
      </div>

      <div className={`col-2 ${classes.listmargin}`}>
        <p className={classes.marginp}> Quantity: {quantity}</p>
      </div>
    </Fragment>
  );
};

export default ListTransaksi;
