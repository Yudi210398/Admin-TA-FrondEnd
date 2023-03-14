import React from "react";
import Container from "../../../shared/Container";
import { useHttpAllAdminProduk } from "../../../shared/util/http-getallAdminProduk";

import GetAllProduct from "../../components/Prodcut/Getproduct/GetAllProduct";

const ParentGetProduct = () => {
  const { datas, pesanVerify } = useHttpAllAdminProduk();
  return (
    <Container>
      {datas.length > 0 && <GetAllProduct allProduct={datas} />}

      <br />
      <br />
      {datas.length === 0 && (
        <h1
          style={{ color: "red", fontFamily: "cursive", fontSize: "20px" }}
          className="text-center"
        >
          {pesanVerify?.toUpperCase()} ATAU TOKEN SUDAH KADALUARSA
        </h1>
      )}
    </Container>
  );
};

export default ParentGetProduct;
