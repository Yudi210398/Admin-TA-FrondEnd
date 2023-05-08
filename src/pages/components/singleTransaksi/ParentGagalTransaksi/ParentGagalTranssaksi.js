import React from "react";
import { useParams } from "react-router-dom";
import Container from "../../../../shared/Container";
import { useOrderId } from "../../../../shared/util/http-getIdOrder";
import classes from "../../../singletransaksi.module.css";
import FormGagal from "./FormGagal";
const ParentGagalTranssaksi = () => {
  const { _gagalresi } = useParams();
  const { data, pesanVerify } = useOrderId(_gagalresi);
  console.log(data);
  return (
    <Container>
      <div className="row justify-content-center">
        <div className="col-12">
          <h1 className={classes.title}>PEMBATALAN TRANSAKSI</h1>
        </div>
        <div className="col-12">
          <hr />
        </div>
      </div>

      <FormGagal />
    </Container>
  );
};

export default ParentGagalTranssaksi;
