import { useEffect, useState } from "react";
import { useHttp } from "./http-hook";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
export function useHttpProductDetail() {
  const { sendRequest, pesanVerify } = useHttp();
  const [datas, setDatas] = useState([]);
  const token = useSelector((state) => state.authLogin);
  const { _idProduct } = useParams();
  try {
    useEffect(() => {
      const fetch = async () => {
        const hasil = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL_API}/productdetailadmin/${_idProduct}`,
          "GET",
          null,
          {
            "Content-Type": "application/json",
            Authorization: `Cat ${token.tokenLogin}`,
          }
        );
        await setDatas(hasil.dataAmbil[0]);
      };

      fetch();
    }, [sendRequest, token.tokenLogin, _idProduct]);
  } catch (err) {
    throw err.message;
  }
  return {
    pesanVerify,
    datas,
  };
}
