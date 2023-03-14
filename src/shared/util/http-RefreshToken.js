import { useEffect, useState } from "react";
import { useHttp } from "./http-hook";
import { useSelector } from "react-redux";

export function useHttpRefreshToken() {
  const { sendRequest, pesanVerify } = useHttp();
  const [datas, setDatas] = useState([]);
  const { refreshToken, login } = useSelector((state) => state.authLogin);

  try {
    useEffect(() => {
      const fetch = async () => {
        const hasil = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL_API}/refreshtoken`,
          "POST",
          JSON.stringify({ tokenrefresh: refreshToken }),
          {
            "Content-Type": "application/json",
          }
        );
        setDatas(hasil.aksentoken);
      };
      fetch();
      if (login) {
        const dataInterval = setInterval(async function () {
          fetch();
        }, 870000);
        return () => {
          clearInterval(dataInterval);
        };
      }
    }, [sendRequest, refreshToken, login]);
  } catch (err) {
    throw err.message;
  }
  return {
    pesanVerify,
    datas,
  };
}
