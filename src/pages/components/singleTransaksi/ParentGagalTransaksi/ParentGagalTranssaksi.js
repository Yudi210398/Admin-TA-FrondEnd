import React from "react";
import { useParams } from "react-router-dom";
import Container from "../../../../shared/Container";
import { useOrderId } from "../../../../shared/util/http-getIdOrder";
const ParentGagalTranssaksi = () => {
  const { _gagalresi } = useParams();
  const { data, pesanVerify } = useOrderId(_gagalresi);
  return <Container>ParentGagalTranssaksi</Container>;
};

export default ParentGagalTranssaksi;
