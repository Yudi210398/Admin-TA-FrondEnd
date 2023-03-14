import React, { Fragment, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { isTotalDataHapus } from "../../Data/LoginSlice";
import { useDelete } from "../../shared/util/delete-alert";
import { useHttpAllAdminProduk } from "../../shared/util/http-getallAdminProduk";
import { useHttp } from "../../shared/util/http-hook";

export const TombolHapus = ({ idProduct }) => {
  const navigate = useNavigate();
  const { datas } = useHttpAllAdminProduk();
  const [data, setData] = useState([]);
  const { sendRequest } = useHttp();
  const token = useSelector((state) => state.authLogin);
  const dispatch = useDispatch();

  const oneDelete = useCallback(async () => {
    try {
      const hasil = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL_API}/hapusproduk`,
        "DELETE",
        JSON.stringify({ produkIds: idProduct }),
        {
          "Content-Type": "application/json",
          Authorization: `Cat ${token.tokenLogin}`,
        }
      );
      await setData(hasil);
      navigate("/products");
    } catch (err) {
      alert(err);
      console.log(err);
    }
  }, [idProduct, sendRequest, token, navigate]);

  useEffect(() => {
    const ondataHapusJumlah = (totalData) =>
      dispatch(isTotalDataHapus({ totalData }));
    ondataHapusJumlah(data.hasilproduk);
  }, [dispatch, data, datas]);

  const { dataRespone } = useDelete(
    "Hapus Produk",
    "Yakin Hapus Produk ? ",
    async () => await oneDelete()
  );

  return (
    <Fragment>
      <button onClick={dataRespone} className="btn btn-danger">
        Hapus Produk
      </button>
    </Fragment>
  );
};
