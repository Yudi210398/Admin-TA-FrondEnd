import React from "react";
import { Link } from "react-router-dom";
import classses from "./order.module.css";
function OrderList({
  idOrder,
  orderSelesai,
  no,
  namaOder,
  pengiriman,
  dibatalkan,
}) {
  let pesanKirim;

  if (pengiriman && !dibatalkan)
    pesanKirim = <p className="text-success">SUDAH TERKIRIM</p>;
  if (!pengiriman && dibatalkan)
    pesanKirim = <p className="text-danger">PESANAN DIBATALKAN</p>;
  if (!pengiriman && !dibatalkan)
    pesanKirim = <p className="text-danger">BELUM TERKIRIM </p>;

  return (
    <tr className={classses.besar}>
      <th scope="row">{no}</th>
      <td>{idOrder}</td>
      <td>{namaOder}</td>
      <td>{pesanKirim}</td>
      <td>
        {orderSelesai === "Telah terima" ? (
          <p className="text-success">SUDAH SELESAI</p>
        ) : (
          <p className="text-danger"> BELUM SELESAI</p>
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
