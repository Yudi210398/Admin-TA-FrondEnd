import React, { Fragment, useRef, useState } from "react";
import { ErrorMessage, Form, Formik } from "formik";
import * as Yup from "yup";
import classeses from "../../pages/components/Prodcut/Getproduct/ListProduk.module.css";

import {
  dropDowncheckbox,
  dropdownOptions,
  elementPakaian,
  gambarLoop,
  parseUkuran,
  yupImage,
} from "../../pages/components/Prodcut/tambahProduct/ListTambahProduct";
import TextError from "../../shared/formikUse/TextError";
import ImagePriview from "../../shared/imagePriview/ImageMultiple";
import { useHttp } from "../../shared/util/http-hook";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const yupObjectfungsi = (
  dataGambars,
  dataGambarsKeterangan,
  select = null
) => {
  return Yup.object({
    namaPakaian: Yup.string().required("Harus diIsi"),
    stockPakaian: Yup.number().min(1).required("Harus diIsi"),
    harga: Yup.number().min(1).required("Harus diIsi"),
    selectOtion: !select ? Yup.string().required("Harus diIsi") : Yup.string(),
    deskripsi: Yup.string().required("Harus Diisi"),
    checkboxOpsi: Yup.array()
      .required("Ukuran Harus Diisi")
      .test("CheckBox", "ukuran harus diisi", (value) => {
        if (value.length > 0) return true;
        return false;
      })
      .test("CheckBox", "data tidak boleh kosong", (value) => {
        for (let i = 1; i < value.length; i++) {
          if (value[i] !== value[0]) return true;
        }
        return false;
      }),
    gambarThumbnail: yupImage(true),
    gambar: dataGambars ? yupImage(true) : null,
    gambardanketerangan: dataGambarsKeterangan ? yupImage(true) : null,
  });
};

export const gambarselek = (gambarData, i) => (
  <img
    key={i}
    width="100px"
    height="100px"
    src={gambarData?.url}
    className={`rounded float-start ${classeses.gambarMargin}`}
    alt="gambarcheckout"
  />
);

const EditHalamanBajuJAsBatik = ({ data }) => {
  const token = useSelector((state) => state.authLogin);
  const navigate = useNavigate();
  const {
    sendRequest,
    setErrorValidate,

    setErorrPesan,
  } = useHttp();

  let hasilGamketlength = data?.gambarDanKeterangan?.length > 0;
  const [dataGambars, setDataGambars] = useState(null);
  const [dataGambarsKeterangan, setDataGambarsKeterangan] = useState(null);

  const allGambar = data?.gambar?.map((gambarData, i) =>
    gambarselek(gambarData, i)
  );

  const allGambarketerangan = data?.gambarDanKeterangan?.map((gambarData, i) =>
    gambarselek(gambarData, i)
  );

  const refs = useRef(null);
  const refs2 = useRef(null);
  const refs3 = useRef(null);

  const dataukuran = data?.ukuran?.kemBatJas[0];
  let tampungUkuran = [];

  for (let i in dataukuran) if (i !== "_id") tampungUkuran.push(dataukuran[i]);

  const initialValues = {
    namaPakaian: data?.namaPakian ? data?.namaPakian : "",
    stockPakaian: data?.stock ? data?.stock : "",
    harga: data?.harga ? data?.harga : "",
    selectOtion: data?.jenisPakaian ? data?.jenisPakaian : "",
    deskripsi: data?.deskripsi ? data?.deskripsi : "",
    checkboxOpsi: tampungUkuran,
    gambar: null,
    gambarThumbnail: null,
    gambardanketerangan: null,
  };
  const validationSchema = yupObjectfungsi(dataGambars, dataGambarsKeterangan);

  const onSubmit = async (values) => {
    let hasilgambar = gambarLoop(values.gambar);
    let hasilgambarKeterangan = gambarLoop(values.gambardanketerangan);
    let hasilgambarThumbnail = gambarLoop(values.gambarThumbnail);

    // ! Data Ukuran
    const { datas, datam, datal, dataxl } = parseUkuran(values);

    try {
      const formData = new FormData();
      formData.append("namaPakian", values.namaPakaian);
      formData.append("stock", values.stockPakaian);
      formData.append("jenisPakaian", values.selectOtion);
      formData.append("harga", values.harga);
      formData.append("produkIds", data?.idProduct);

      hasilgambarThumbnail.map((data) =>
        formData.append("gambarThumbnail", data)
      );

      if (dataGambars)
        hasilgambar.map((data) => formData.append("gambar", data));

      if (dataGambarsKeterangan)
        hasilgambarKeterangan.map((data) =>
          formData.append("gambarDanKeterangan", data)
        );

      formData.append("ukuranS", datas);
      formData.append("ukuranM", datam);
      formData.append("ukuranL", datal);
      formData.append("ukuranXL", dataxl);
      formData.append("deskripsi", values.deskripsi);
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL_API}/editproduk`,
        "POST",
        formData,
        {
          Authorization: `Cat ${token.tokenLogin}`,
        }
      );
      alert("Product Berhasil di Edit");
      await navigate("/products", { replace: true });
    } catch (err) {
      setErrorValidate(true);
      setErorrPesan(err);
      alert(err);
    }
  };
  return (
    <Fragment>
      <br />

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
        enableReinitialize={true}
      >
        {(formik) => {
          return (
            <Form>
              <div className="row">
                {elementPakaian(formik, dropdownOptions, dropDowncheckbox)}

                <div className="col-6">
                  <input
                    hidden
                    ref={refs}
                    control="input"
                    type="file"
                    label="Image Upload"
                    name="gambar"
                    error={formik?.errors.gambar}
                    toucheds={formik.touched.gambar?.toString()}
                    onBlur={formik.handleBlur}
                    onChange={(e) => {
                      formik.setFieldValue("gambar", e.target.files);
                    }}
                    multiple
                  />

                  <div>
                    <button
                      onClick={async () => {
                        await refs.current.click();

                        setDataGambars(true);
                      }}
                      className="btn btn-danger"
                      type="button"
                    >
                      Edit Gambar Pakaian
                    </button>
                  </div>
                  <ErrorMessage component={TextError} name="gambar" />
                  <br />
                  {formik.values.gambar && (
                    <ImagePriview data={true} gambar={formik.values.gambar} />
                  )}
                  <br />

                  {!dataGambars && allGambar}
                </div>

                <div className="col-6">
                  <input
                    hidden
                    ref={refs3}
                    control="input"
                    type="file"
                    label="Image Upload"
                    name="gambarThumbnail"
                    error={formik?.errors.gambarThumbnail}
                    toucheds={formik.touched.gambarThumbnail?.toString()}
                    onBlur={formik.handleBlur}
                    onChange={(e) => {
                      formik.setFieldValue("gambarThumbnail", e.target.files);
                    }}
                  />

                  <div>
                    <button
                      onClick={() => {
                        refs3.current.click();
                      }}
                      className="btn btn-warning"
                      type="button"
                    >
                      Gambar Thumbnail
                    </button>
                  </div>
                  <ErrorMessage component={TextError} name="gambarThumbnail" />
                  <br />
                  {formik.values.gambarThumbnail && (
                    <ImagePriview
                      data={true}
                      gambar={formik.values.gambarThumbnail}
                    />
                  )}
                  <br />
                </div>

                {hasilGamketlength && (
                  <div className="col-6">
                    <input
                      hidden
                      ref={refs2}
                      control="input"
                      type="file"
                      label="Image Upload"
                      name="gambardanketerangan"
                      error={formik?.errors.gambardanketerangan}
                      toucheds={formik.touched.gambardanketerangan?.toString()}
                      onBlur={formik.handleBlur}
                      onChange={(e) => {
                        formik.setFieldValue(
                          "gambardanketerangan",
                          e.target.files
                        );
                      }}
                      multiple
                    />

                    <div>
                      <button
                        onClick={() => {
                          setDataGambarsKeterangan(true);
                          refs2.current.click();
                        }}
                        className="btn btn-success"
                        type="button"
                      >
                        Gambar Pakaian Beberapa Warna
                      </button>
                    </div>
                    <ErrorMessage
                      component={TextError}
                      name="gambardanketerangan"
                    />
                    <br />
                    {formik.values.gambardanketerangan && (
                      <ImagePriview
                        data={false}
                        gambar={formik.values.gambardanketerangan}
                      />
                    )}
                    <br />
                    {!dataGambarsKeterangan && allGambarketerangan}
                  </div>
                )}
              </div>
              <br />
              <button className="btn btn-primary" type="submit">
                Submit
              </button>
            </Form>
          );
        }}
      </Formik>
      <br />
    </Fragment>
  );
};

export default EditHalamanBajuJAsBatik;
