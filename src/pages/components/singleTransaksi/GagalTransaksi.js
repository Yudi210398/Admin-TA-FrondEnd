import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const GagalTransaksi = ({ dataIdGagal }) => {
  console.log(dataIdGagal, `kocaks`);
  return (
    <Fragment>
      <Link to={`/gagaltransaksi/${dataIdGagal}`} className="btn btn-danger">
        Transaksi Gagal dan berikan Alasan
      </Link>
    </Fragment>
  );
};

export default GagalTransaksi;
