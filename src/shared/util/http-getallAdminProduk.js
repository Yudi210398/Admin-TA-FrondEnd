import { useEffect, useState } from "react";
import { useHttp } from "./http-hook";
import { useSelector } from "react-redux";
export function useHttpAllAdminProduk() {
  const { sendRequest, pesanVerify } = useHttp();
  const [datas, setDatas] = useState([]);
  const token = useSelector((state) => state.authLogin);
  try {
    useEffect(() => {
      const fetch = async () => {
        const hasil = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL_API}/allprodukadmin`,
          "GET",
          null,
          {
            "Content-Type": "application/json",
            Authorization: `Cat ${token.tokenLogin}`,
          }
        );
        setDatas(hasil.dataReal);
      };

      fetch();
    }, [sendRequest, token.tokenLogin]);
  } catch (err) {
    throw err.message;
  }
  return {
    pesanVerify,
    datas,
  };
}
