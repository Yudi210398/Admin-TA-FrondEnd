import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHttp } from "./http-hook";

export function useOrderHttp() {
  const token = useSelector((state) => state.authLogin);
  const { sendRequest, pesanVerify } = useHttp();
  const [data, setData] = useState([]);
  try {
    useEffect(() => {
      const fetch = async () => {
        const hasil = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL_API}/dataorder`,
          "GET",
          null,
          {
            "Content-Type": "application/json",
            Authorization: `Cat ${token.tokenLogin}`,
          }
        );
        setData(hasil.allDataOrder);
      };
      fetch();
    }, [sendRequest, token]);
  } catch (err) {
    throw err.message;
  }

  return {
    pesanVerify,
    data,
  };
}
