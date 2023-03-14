import React, { Fragment } from "react";
import classes from "./ListProduk.module.css";
import { Link } from "react-router-dom";

const ListProduct = ({ namaPakaian, gambar, stock, idProduct }) => {
  return (
    <Fragment>
      <div className={`${classes.posisi}`}></div>

      <div className={`col-2 ${classes.allMArgin}`}>
        <img
          width="100px"
          height="100px"
          src={gambar?.url}
          className={`rounded float-start ${classes.gambarMargin}`}
          alt="gambarcheckout"
        />
      </div>

      <div className={`col-4 ${classes.allMArgin}`}>
        <p className={classes.paraf}>{namaPakaian}</p>
      </div>

      <div className={`col-3 ${classes.allMArgin}`}>
        <p className={`${classes.paraf} text-center`}>Sisa Stock : {stock}</p>
      </div>

      <div className={`col-3 ${classes.allMArgin}`}>
        <Link
          onClick={() => console.log(idProduct)}
          to={`/detailproduct/${idProduct}`}
        >
          <button className={`btn btn-primary`}>Lihat Produk</button>
        </Link>
      </div>
    </Fragment>
  );
};

export default ListProduct;
