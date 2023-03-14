import React, { useRef } from "react";
import { ErrorMessage, Form, Formik } from "formik";
import Container from "../../../../shared/Container";
import * as Yup from "yup";
import classes from "../../../singletransaksi.module.css";
import { yupImage } from "../../Prodcut/tambahProduct/ListTambahProduct";
import FormikControl from "../../../../shared/formikUse/FormikControl";
import TextError from "../../../../shared/formikUse/TextError";
import ImagePriviewSingleImage from "../../../../shared/imagePriview/ImagePriviewSingleImage";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useHttp } from "../../../../shared/util/http-hook";
import { useSelector } from "react-redux";

const ParerntSuksesTransaksi = () => {
  const navigate = useNavigate();
  const token = useSelector((state) => state.authLogin);
  const { sendRequest } = useHttp();
  const { _resi } = useParams();

  const refs = useRef(null);
  const initialValues = {
    resiPengiriman: "",
    gambarResi: null,
  };

  const validationSchema = Yup.object({
    resiPengiriman: Yup.string().required("Harus diisi"),
    gambarResi: yupImage(true),
  });

  const onSubmit = async (values) => {
    try {
      const formData = new FormData();

      formData.append("resiPengiriman", values.resiPengiriman);

      formData.append("gambarResi", values.gambarResi);

      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL_API}/orderresi/${_resi}`,
        "POST",
        formData,
        {
          Authorization: `Cat ${token.tokenLogin}`,
        }
      );
      alert("Berhasil nambah resi");
      navigate("/oder", { replace: true });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      <div className="row justify-content-center">
        <div className="col-12">
          <h1 className={classes.title}>RESI TRANSAKSI</h1>
        </div>

        <div className="col-12">
          <hr />
        </div>
      </div>
      <br />
      <div className="row">
        <div className="col-6">
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {(formik) => {
              return (
                <Form>
                  <FormikControl
                    control="input"
                    type="text"
                    label="Resi Pengiriman"
                    name="resiPengiriman"
                    placeholder="masukan data"
                    toucheds={formik.touched.resiPengiriman?.toString()}
                    error={formik.errors.resiPengiriman}
                  />
                  <br />
                  <input
                    hidden
                    ref={refs}
                    control="input"
                    type="file"
                    label="Image Upload"
                    name="gambarResi"
                    error={formik?.errors.gambarResi}
                    toucheds={formik.touched.gambarResi?.toString()}
                    onBlur={formik.handleBlur}
                    onChange={(e) => {
                      formik.setFieldValue("gambarResi", e.target.files[0]);
                    }}
                  />

                  <div>
                    <button
                      onClick={() => refs.current.click()}
                      className="btn btn-success"
                      type="button"
                    >
                      Gambar Resi Pengiriman
                    </button>
                  </div>
                  <ErrorMessage component={TextError} name="gambarResi" />
                  <br />
                  {formik.values.gambarResi && (
                    <ImagePriviewSingleImage
                      gambar={formik.values.gambarResi}
                    />
                  )}
                  <br />
                  <button className="btn btn-primary" type="submit">
                    Submit
                  </button>
                </Form>
              );
            }}
          </Formik>
        </div>
      </div>
    </Container>
  );
};

export default ParerntSuksesTransaksi;
