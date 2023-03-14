import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHttp } from "./http-hook";
export function useAllCustomer() {
  const token = useSelector((state) => state.authLogin);
  const { sendRequest, pesanVerify } = useHttp();
  const [datas, setDatas] = useState([]);

  try {
    useEffect(() => {
      const fetch = async () => {
        const hasil = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL_API}/allcustomer`,
          "GET",
          null,
          {
            "Content-Type": "application/json",
            Authorization: `Cat ${token.tokenLogin}`,
          }
        );
        setDatas(hasil);
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
