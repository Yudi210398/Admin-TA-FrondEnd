import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const SuksesTransaksi = ({ idData }) => {
  return (
    <Fragment>
      <Link to={`/orderresi/${idData}`} className="btn btn-success">
        Transaksi Sukses dan Input Resi
      </Link>
    </Fragment>
  );
};

export default SuksesTransaksi;
