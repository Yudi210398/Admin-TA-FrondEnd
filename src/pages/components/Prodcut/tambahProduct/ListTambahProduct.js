import React, { Fragment, useRef } from "react";
import FormikControl from "../../../../shared/formikUse/FormikControl";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import classes from "./listProductTambah.module.css";
import TextError from "../../../../shared/formikUse/TextError";
import { Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import ImagePriview from "../../../../shared/imagePriview/ImageMultiple";
import { useHttp } from "../../../../shared/util/http-hook";
import { useSelector } from "react-redux";
export const FORMATIMAGES = ["image/jpg", "image/jpeg", "image/png"];

export const parseUkuran = (values) => {
  const datas = values.checkboxOpsi.find((e) => e === "S");
  const datam = values.checkboxOpsi.find((e) => e === "M");
  const datal = values.checkboxOpsi.find((e) => e === "L");
  const dataxl = values.checkboxOpsi.find((e) => e === "XL");

  return {
    datas,
    datam,
    datal,
    dataxl,
  };
};

export const dropDowncheckbox = [
  { key: "S", value: "S" },
  { key: "M", value: "M" },
  { key: "L", value: "L" },
  { key: "XL", value: "XL" },
];

export const dropdownOptions = [
  {
    key: "Select an option",
    value: "",
  },

  {
    key: "Kemeja",
    value: "kemeja",
  },

  {
    key: "Batik",
    value: "batik",
  },

  {
    key: "Jas",
    value: "jas",
  },
];

export const yupImage = (data) => {
  if (data === true)
    return Yup.mixed()
      .required("Masukan Gambar Cuk")
      .test("FILE_SIZE", "File size is too big", (value) => {
        if (value && value?.length > 0) {
          for (let i = 0; i < value.length; i++) {
            if (value[i].size > 5242880) {
              return false;
            }
          }
        }
        return true;
      })
      .test("FILE_TYPE", "Invalid file format selected", (value) => {
        if (value && value.length > 0) {
          for (let i = 0; i < value.length; i++) {
            if (
              value[i].type !== "image/png" &&
              value[i].type !== "image/jpg" &&
              value[i].type !== "image/jpeg"
            ) {
              return false;
            }
          }
        }
        return true;
      })
      .test("File-Empty", "Gambar Tidak Boleh Kosong", (value) => {
        if (value?.length === 0) return false;
        return true;
      });
  else
    return Yup.mixed()
      .test("FILE_SIZE", "File size is too big", (value) => {
        if (value && value?.length > 0) {
          for (let i = 0; i < value.length; i++) {
            if (value[i].size > 5242880) {
              return false;
            }
          }
        }
        return true;
      })
      .test("FILE_TYPE", "Invalid file format selected", (value) => {
        if (value && value.length > 0) {
          for (let i = 0; i < value.length; i++) {
            if (
              value[i].type !== "image/png" &&
              value[i].type !== "image/jpg" &&
              value[i].type !== "image/jpeg"
            ) {
              return false;
            }
          }
        }
        return true;
      });
};

export const gambarLoop = (values) => {
  let hasilgambar = [];
  for (const key in values) if (key > -1) hasilgambar.push(values[key]);
  return hasilgambar;
};

export const gambarPakianForm = (formik, refs) => {
  return (
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
          Gambar Pakaian
        </button>
      </div>
      <ErrorMessage component={TextError} name="gambar" />
      <br />
      {formik.values.gambar && (
        <ImagePriview data={true} gambar={formik.values.gambar} />
      )}
      <br />
    </div>
  );
};

export const elementPakaian = (formik, dropdownOptions, dropDowncheckbox) => {
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
          label="Masukan Harga Pakaian"
          name="harga"
          toucheds={formik.touched.harga?.toString()}
          error={formik.errors.harga}
        />
      </div>

      <div className="col-6">
        <FormikControl
          control="select"
          label="Pilih Jenis Pakaian"
          name="selectOtion"
          options={dropdownOptions}
          toucheds={formik.touched.selectOtion?.toString()}
          error={formik.errors.selectOtion}
        />
      </div>

      <div className="col-6">
        <FormikControl
          control="textarea"
          label="Deskripsi Produk"
          name="deskripsi"
          placeholder="masukan data"
          toucheds={formik.touched.deskripsi?.toString()}
          error={formik.errors.deskripsi}
        />
      </div>

      <div className="col-6">
        <FormikControl
          control="checkbox"
          label="Ukuran Pakaian"
          name="checkboxOpsi"
          options={dropDowncheckbox}
          toucheds={formik.touched.checkboxOpsi?.toString()}
          error={formik.errors.checkboxOpsi}
        />
      </div>
    </Fragment>
  );
};

const ListTambahProduct = () => {
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

  const initialValues = {
    namaPakaian: "",
    stockPakaian: "",
    selectOtion: "",
    harga: "",
    gambar: null,
    gambardanketerangan: null,
    gambarThumbnail: null,
    checkboxOpsi: "",
    deskripsi: "",
  };

  const validationSchema = Yup.object({
    namaPakaian: Yup.string().required("Harus diIsi"),
    stockPakaian: Yup.number().min(1).required("Harus diIsi"),
    selectOtion: Yup.string().required("Harus diIsi"),
    harga: Yup.number().min(1).required("Harus diIsi"),
    checkboxOpsi: Yup.array().required("Ukuran Harus Diisi"),
    gambarThumbnail: yupImage(true),
    gambar: yupImage(true),
    gambardanketerangan: yupImage(false),

    deskripsi: Yup.string().required("Harus Diisi"),
  });

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

      hasilgambar.map((data) => formData.append("gambar", data));

      hasilgambarKeterangan.map((data) =>
        formData.append("gambarDanKeterangan", data)
      );

      hasilgambarThumbnail.map((data) =>
        formData.append("gambarThumbnail", data)
      );

      formData.append("ukuranS", datas);
      formData.append("ukuranM", datam);
      formData.append("ukuranL", datal);
      formData.append("ukuranXL", dataxl);
      formData.append("deskripsi", values.deskripsi);

      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL_API}/allproduct`,
        "POST",
        formData,
        {
          Authorization: `Cat ${token.tokenLogin}`,
        }
      );
      alert("Product Berhasil Ditambah");
      await navigate("/", { replace: true });
    } catch (err) {
      setErrorValidate(true);
      setErorrPesan(err);
    }
  };

  return (
    <Fragment>
      <br />
      <h1 className={classes.title + ` text-center`}>TAMBAH PRODUK</h1>
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
                    {elementPakaian(formik, dropdownOptions, dropDowncheckbox)}

                    {gambarPakianForm(formik, refs)}

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

export default ListTambahProduct;
