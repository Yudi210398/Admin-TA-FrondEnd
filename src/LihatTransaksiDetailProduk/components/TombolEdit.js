import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import classes from "./editsyle.module.css";
const TombolEdit = ({ allData }) => {
  return (
    <Fragment>
      <Link
        to={`/editproduct/${allData?.idProduct}`}
        className={`btn btn-warning ${classes["edit-warning"]}`}
      >
        Edit Produk
      </Link>
    </Fragment>
  );
};

export default TombolEdit;
