import React from "react";
import { Link } from "react-router-dom";
import classses from "./order.module.css";
function OrderList({ idOrder, no, namaOder, pengiriman, jumlahProduk }) {
  return (
    <tr className={classses.besar}>
      <th scope="row">{no}</th>
      <td>{idOrder}</td>
      <td>{namaOder}</td>
      <td>{jumlahProduk} Product</td>
      <td>
        {pengiriman ? (
          <p className="text-success">SUDAH TERKIRIM</p>
        ) : (
          <p className="text-danger"> BELUM TERKIRIM</p>
        )}
      </td>
      <td>
        <Link to={`/oder/${idOrder}`} className="btn btn-success">
          Lihat Transaksi
        </Link>
      </td>
    </tr>
  );
}

export default OrderList;
