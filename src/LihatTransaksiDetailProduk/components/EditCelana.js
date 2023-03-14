import React, { Fragment, useRef, useState } from "react";
import { ErrorMessage, Form, Formik } from "formik";
import {
  dataUkuranCelana,
  elementCelana,
  nilaiCelanaValue,
} from "../../pages/components/Prodcut/tambahProduct/LiatTambahCelana";
import TextError from "../../shared/formikUse/TextError";
import ImagePriview from "../../shared/imagePriview/ImageMultiple";
import { gambarselek, yupObjectfungsi } from "./EditHalamanBajuJAsBatik";
import { gambarLoop } from "../../pages/components/Prodcut/tambahProduct/ListTambahProduct";
import { useHttp } from "../../shared/util/http-hook";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const EditCelana = ({ data }) => {
  const token = useSelector((state) => state.authLogin);
  const navigate = useNavigate();
  const { sendRequest } = useHttp();
  let hasilGamketlength = data?.gambarDanKeterangan?.length > 0;
  const [dataGambars, setDataGambars] = useState(null);
  const [dataGambarsKeterangan, setDataGambarsKeterangan] = useState(null);

  const allGambar = data?.gambar?.map((gambarData, i) =>
    gambarselek(gambarData, i)
  );

  const allGambarketerangan = data?.gambarDanKeterangan?.map((gambarData, i) =>
    gambarselek(gambarData, i)
  );

  const refs2 = useRef(null);
  const refs3 = useRef(null);
  const refs = useRef(null);
  const dataukuran = data?.ukuran?.celana[0];
  let tampungUkuran = [];

  for (let i in dataukuran) if (i !== "_id") tampungUkuran.push(dataukuran[i]);

  const initialValues = nilaiCelanaValue(data, tampungUkuran);

  const validationSchema = yupObjectfungsi(
    dataGambars,
    dataGambarsKeterangan,
    true
  );

  const onSubmit = async (values) => {
    let hasilgambar = gambarLoop(values.gambar);

    let hasilgambarKeterangan = gambarLoop(values.gambardanketerangan);

    let hasilgambarThumbnail = gambarLoop(values.gambarThumbnail);

    try {
      const formData = new FormData();
      formData.append("namaPakian", values.namaPakaian);
      formData.append("stock", values.stockPakaian);
      formData.append("jenisPakaian", "celana");
      formData.append("harga", values.harga);
      formData.append("produkIds", data?.idProduct);

      hasilgambar.map((data) => formData.append("gambar", data));

      hasilgambarKeterangan.map((data) =>
        formData.append("gambarDanKeterangan", data)
      );

      hasilgambarThumbnail.map((data) =>
        formData.append("gambarThumbnail", data)
      );

      formData.append("ukuran28", dataUkuranCelana(values, "28"));
      formData.append("ukuran29", dataUkuranCelana(values, "29"));
      formData.append("ukuran30", dataUkuranCelana(values, "30"));
      formData.append("ukuran31", dataUkuranCelana(values, "31"));
      formData.append("ukuran32", dataUkuranCelana(values, "32"));
      formData.append("ukuran33", dataUkuranCelana(values, "33"));
      formData.append("ukuran34", dataUkuranCelana(values, "34"));
      formData.append("ukuran35", dataUkuranCelana(values, "35"));
      formData.append("ukuran36", dataUkuranCelana(values, "36"));
      formData.append("ukuran37", dataUkuranCelana(values, "37"));
      formData.append("ukuran38", dataUkuranCelana(values, "38"));
      formData.append("ukuran39", dataUkuranCelana(values, "39"));
      formData.append("ukuran40", dataUkuranCelana(values, "40"));
      formData.append("ukuran41", dataUkuranCelana(values, "41"));
      formData.append("ukuran42", dataUkuranCelana(values, "42"));

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
      console.log(`kocak`);
    } catch (err) {
      alert(err);
    }
  };

  return (
    <Fragment>
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
                {elementCelana(formik)}
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
                      onClick={() => {
                        setDataGambars(true);
                        refs.current.click();
                      }}
                      className="btn btn-danger"
                      type="button"
                    >
                      Gambar Celana
                    </button>
                  </div>
                  <ErrorMessage component={TextError} name="gambar" />
                  <br />
                  {formik.values.gambar && (
                    <ImagePriview gambar={formik.values.gambar} />
                  )}
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
                      onClick={() => refs3.current.click()}
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
                        Gambar Celana Beberapa Warna
                      </button>
                    </div>
                    <ErrorMessage
                      component={TextError}
                      name="gambardanketerangan"
                    />
                    <br />
                    {formik.values.gambardanketerangan && (
                      <ImagePriview
                        gambar={formik.values.gambardanketerangan}
                      />
                    )}
                    <br />
                    {!dataGambarsKeterangan && allGambarketerangan}
                  </div>
                )}
              </div>
              <button className="btn btn-danger" type="submit">
                Submit
              </button>
            </Form>
          );
        }}
      </Formik>
    </Fragment>
  );
};

export default EditCelana;
