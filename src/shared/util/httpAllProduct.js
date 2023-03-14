import { useEffect, useState } from "react";
import { useHttp } from "./http-hook";

export function useHttpAllProduk() {
  const { sendRequest, pesanVerify } = useHttp();
  const [data, setData] = useState([]);
  try {
    useEffect(() => {
      const fetch = async () => {
        const hasil = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL_API}/allproduct`
        );
        setData(hasil.dataReal);
      };
      fetch();
    }, [sendRequest]);
  } catch (err) {
    throw err.message;
  }
  return {
    pesanVerify,
    data,
  };
}
