import React, { Fragment, useRef } from "react";
import classes from "./listProductTambah.module.css";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import TextError from "../../../../shared/formikUse/TextError";
import ImagePriview from "../../../../shared/imagePriview/ImageMultiple";
import { useHttp } from "../../../../shared/util/http-hook";
import FormikControl from "../../../../shared/formikUse/FormikControl";
import { Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { gambarLoop, yupImage } from "./ListTambahProduct";
import { useSelector } from "react-redux";

const dropDowncheckbox = [
  { key: "28", value: "28" },
  { key: "29", value: "29" },
  { key: "30", value: "30" },
  { key: "31", value: "31" },
  { key: "32", value: "32" },
  { key: "33", value: "33" },
  { key: "34", value: "34" },
  { key: "35", value: "35" },
  { key: "36", value: "36" },
  { key: "37", value: "37" },
  { key: "38", value: "38" },
  { key: "39", value: "39" },
  { key: "40", value: "40" },
  { key: "41", value: "41" },
  { key: "42", value: "42" },
];

export const nilaiCelanaValue = (data, tampungdata = []) => {
  return {
    namaPakaian: data?.namaPakian ? data?.namaPakian : "",
    stockPakaian: data?.stock ? data?.stock : "",
    harga: data?.harga ? data?.harga : "",
    gambar: null,
    gambardanketerangan: null,
    gambarThumbnail: null,
    checkboxOpsi: tampungdata.length > 0 ? tampungdata : "",
    deskripsi: data?.deskripsi ? data?.deskripsi : "",
  };
};

export const dataUkuranCelana = (data, ukuran) => {
  return data.checkboxOpsi.find((e) => e === ukuran);
};

export const elementCelana = (formik) => {
  return (
    <Fragment>
      <div className="col-6">
        <FormikControl
          control="input"
          type="text"
          label="Nama Pakaian"
          name="namaPakaian"
          placeholder="masukan data"
          toucheds={formik.touched.namaPakaian?.toString()}
          error={formik.errors.namaPakaian}
        />
      </div>

      <div className="col-6">
        <FormikControl
          control="input"
          type="number"
          label="Stock Pakaian"
          name="stockPakaian"
          min={1}
          placeholder="masukan data"
          toucheds={formik.touched.stockPakaian?.toString()}
          error={formik.errors.stockPakaian}
        />
      </div>

      <div className="col-6">
        <FormikControl
          control="input"
          min={1}
          type="number"
          placeholder="masukan data"
          label="Masukan Harga Pakaian"
          name="harga"
          toucheds={formik.touched.harga?.toString()}
          error={formik.errors.harga}
        />
      </div>

      <div className="col-6">
        <FormikControl
          control="textarea"
          label="Deskripsi Produk"
          clasmargin="derect"
          name="deskripsi"
          placeholder="masukan data"
          toucheds={formik.touched.deskripsi?.toString()}
          error={formik.errors.deskripsi}
        />
      </div>

      <div className="col-6">
        <FormikControl
          control="checkbox"
          label="Ukuran Celana"
          name="checkboxOpsi"
          options={dropDowncheckbox}
          toucheds={formik.touched.checkboxOpsi?.toString()}
          error={formik.errors.checkboxOpsi}
        />
      </div>
    </Fragment>
  );
};

export const LiatTambahCelana = () => {
  const token = useSelector((state) => state.authLogin);
  const navigate = useNavigate();
  const {
    errorValidate,
    sendRequest,
    setErrorValidate,
    errorPesan,
    setErorrPesan,
  } = useHttp();

  const refs = useRef(null);
  const refs2 = useRef(null);
  const refs3 = useRef(null);

  const initialValues = nilaiCelanaValue();

  const validationSchema = Yup.object({
    namaPakaian: Yup.string().required("Harus diIsi"),
    stockPakaian: Yup.number().min(1).required("Harus diIsi"),
    harga: Yup.number().min(1).required("Harus diIsi"),
    checkboxOpsi: Yup.array()
      .required("Ukuran Harus Diisi")
      .test("Pilih Data", "Isi Boss", (value) => {
        if (value?.length === 0) return false;
        return true;
      }),
    gambar: yupImage(true),
    gambardanketerangan: yupImage(false),
    gambarThumbnail: yupImage(true),
    deskripsi: Yup.string().required("Harus Diisi"),
  });

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
        `${process.env.REACT_APP_BACKEND_URL_API}/allproduct`,
        "POST",
        formData,
        {
          Authorization: `Cat ${token.tokenLogin}`,
        }
      );
      await alert("Product Berhasil Ditambah");
      navigate("/", { replace: true });
    } catch (err) {
      setErorrPesan(err);
      console.log(err);
    }
  };

  return (
    <Fragment>
      <br />
      <h1 className={classes.title + ` text-center`}>TAMBAH PRODUK CELANA</h1>
      <br />

      <div className="row justify-content-center">
        <div className="col-10">
          {errorValidate && (
            <Alert
              variant="danger"
              onClose={() => setErrorValidate(false)}
              dismissible
            >
              <Alert.Heading>{errorPesan}</Alert.Heading>
            </Alert>
          )}

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
                          onClick={() => refs.current.click()}
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
                      <br />
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
                          formik.setFieldValue(
                            "gambarThumbnail",
                            e.target.files
                          );
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
                      <ErrorMessage
                        component={TextError}
                        name="gambarThumbnail"
                      />
                      <br />
                      {formik.values.gambarThumbnail && (
                        <ImagePriview
                          data={true}
                          gambar={formik.values.gambarThumbnail}
                        />
                      )}
                      <br />
                    </div>

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
                          onClick={() => refs2.current.click()}
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
                    </div>
                  </div>

                  <button className="btn btn-primary" type="submit">
                    Submit
                  </button>
                </Form>
              );
            }}
          </Formik>
          <br />
        </div>
      </div>
    </Fragment>
  );
};
