import React from "react";
import Container from "../shared/Container";
import { useOrderHttp } from "../shared/util/http-getOrder";
import OrderList from "./components/allOrder/OrderList";
import classes from "./halaman.module.css";
import "./tabel.css";
function Order(props) {
  const { data, pesanVerify } = useOrderHttp();
  const dataReverse = data.reverse();
  let dataorder = [];

  dataReverse.map((datas) => {
    if (props?.sukseskirim) {
      console.log(`tolol`);
      if (datas?.resiPengiriman && datas?.gambarResi.url) dataorder.push(datas);
    }
    if (props?.gagalkirim)
      if (datas?.resiPengiriman === null && !datas?.gambarResi.url) {
        console.log(datas);
        console.log(`goblok`);
        console.log(!datas?.resiPengiriman);
        dataorder.push(datas);
      }
    return dataorder;
  });

  const resultORderFix =
    props.gagalkirim || props.sukseskirim ? dataorder : dataReverse;
  return (
    <Container>
      <table className="table table-striped table-hover">
        <thead className={`${classes.borders} table-danger`}>
          <tr>
            <th scope="col">NO</th>
            <th scope="col">NO ORDER</th>
            <th scope="col">NAMA USER</th>
            <th scope="col">JUMLAH PRODUCT</th>
            <th scope="col">PENGIRIMAN</th>
            <th scope="col">DETAIL TRANSAKSI</th>
          </tr>
        </thead>
        <tbody>
          {resultORderFix.map((hasil, i) => (
            <OrderList
              key={i}
              no={i + 1}
              pengiriman={hasil?.resiPengiriman && hasil?.gambarResi && true}
              idOrder={hasil._id}
              namaOder={hasil.userId.namaUser}
              jumlahProduk={hasil.produks?.length}
            />
          ))}
        </tbody>
      </table>

      {pesanVerify !== null && (
        <h1 className={classes.authorder}>{pesanVerify}</h1>
      )}
    </Container>
  );
}

export default Order;
