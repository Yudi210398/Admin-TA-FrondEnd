import React from "react";
import Container from "../../../shared/Container";
import ListTambahProduct from "../../components/Prodcut/tambahProduct/ListTambahProduct";
import { Tab, Tabs } from "react-bootstrap";
import { LiatTambahCelana } from "../../components/Prodcut/tambahProduct/LiatTambahCelana";

const ProductTambah = () => {
  return (
    <Container>
      <Tabs
        defaultActiveKey="home"
        id="justify-tab-example"
        className="mb-3"
        justify
      >
        <Tab eventKey="home" title="TAMBAH UKURAN KEMEJA, BATIK, JAS">
          <ListTambahProduct />
        </Tab>
        <Tab eventKey="profile" title="TAMBAH UKURAN CELANA">
          <LiatTambahCelana />
        </Tab>
      </Tabs>
    </Container>
  );
};

export default ProductTambah;
