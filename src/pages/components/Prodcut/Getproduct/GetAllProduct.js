import React, { Fragment } from "react";
import classes from "../tambahProduct/listProductTambah.module.css";
import ListProduct from "./ListProduct";
import classess from "./ListProduk.module.css";
const GetAllProduct = ({ allProduct }) => {
  return (
    <Fragment>
      <br />
      <h1 className={classes.title + ` text-center`}>SEMUA PRODUK</h1>
      <div className={`row justify-content-center ${classess.posisi}`}>
        {allProduct?.map((data, i) => {
          return (
            <ListProduct
              key={i}
              namaPakaian={data?.namaPakian}
              gambar={data?.gambar[0]}
              stock={data?.stock}
              idProduct={data?.idProduct}
            />
          );
        })}
      </div>
    </Fragment>
  );
};

export default GetAllProduct;
