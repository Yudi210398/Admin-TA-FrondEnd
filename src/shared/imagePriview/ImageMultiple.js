import React, { Fragment } from "react";

function ImagePriview(props) {
  let lihat;
  if (props.gambar[0]?.name) {
    lihat = Array.from(props.gambar).map((data, i) => (
      <img
        style={{ padding: "10px" }}
        key={i}
        src={data ? URL.createObjectURL(data) : null}
        alt="lihat"
        width="200px"
        height="200px"
      />
    ));
  }

  return <Fragment>{lihat}</Fragment>;
}

export default ImagePriview;
