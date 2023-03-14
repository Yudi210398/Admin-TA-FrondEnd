import { useState, useEffect } from "react";
import { useHttp } from "./http-hook";
import { useSelector } from "react-redux";
export function useOrderId(iddata) {
  const { sendRequest, pesanVerify } = useHttp();
  const [data, setData] = useState(null);
  const token = useSelector((state) => state.authLogin);
  try {
    useEffect(() => {
      const fetch = async () => {
        const hasil = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL_API}/dataiduser/${iddata}`,
          "GET",
          null,
          {
            "Content-Type": "application/json",
            Authorization: `Cat ${token.tokenLogin}`,
          }
        );
        setData(hasil.orderid[0]);
      };
      fetch();
    }, [sendRequest, iddata, token]);
  } catch (err) {
    throw err.message;
  }

  return {
    data,
    pesanVerify,
  };
}
