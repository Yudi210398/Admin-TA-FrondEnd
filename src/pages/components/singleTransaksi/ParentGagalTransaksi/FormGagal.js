import React, { useRef } from "react";
import { yupImage } from "../../Prodcut/tambahProduct/ListTambahProduct";
import FormikControl from "../../../../shared/formikUse/FormikControl";
import * as Yup from "yup";
import TextError from "../../../../shared/formikUse/TextError";

import ImagePriviewSingleImage from "../../../../shared/imagePriview/ImagePriviewSingleImage";
import { Formik, Form, ErrorMessage } from "formik";
import { useHttp } from "../../../../shared/util/http-hook";
import { useNavigate, useParams } from "react-router-dom";

const FormGagal = () => {
  const navigate = useNavigate();
  const refs = useRef(null);
  const { sendRequest } = useHttp();

  const { _gagalresi } = useParams();
  const initialValues = {
    alasanDibatalkan: "",
    gambarTranferRefundBatal: null,
  };

  const validationSchema = Yup.object({
    alasanDibatalkan: Yup.string().required("Harus diisi"),
    gambarTranferRefundBatal: yupImage(true),
  });

  const onSubmit = async (values) => {
    try {
      const formData = new FormData();

      formData.append("alasanDibatalkan", values.alasanDibatalkan);

      formData.append(
        "gambarTranferRefundBatal",
        values.gambarTranferRefundBatal
      );

      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL_API}/orderdibatalkan/${_gagalresi}`,
        "POST",
        formData
      );
      alert("Berhasil nambah resi");
      navigate("/oder", { replace: true });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {(formik) => {
        return (
          <Form>
            <div className="row">
              <div className="col-6">
                <FormikControl
                  control="textarea"
                  type="text"
                  label="Alasan Dibatalkan"
                  name="alasanDibatalkan"
                  placeholder="masukan data"
                  toucheds={formik.touched.alasanDibatalkan?.toString()}
                  error={formik.errors.alasanDibatalkan}
                />
              </div>

              <div className="col-6">
                <input
                  hidden
                  ref={refs}
                  control="input"
                  type="file"
                  label="Image Upload"
                  name="gambarTranferRefundBatal"
                  error={formik?.errors.gambarTranferRefundBatal}
                  toucheds={formik.touched.gambarTranferRefundBatal?.toString()}
                  onBlur={formik.handleBlur}
                  onChange={(e) => {
                    formik.setFieldValue(
                      "gambarTranferRefundBatal",
                      e.target.files[0]
                    );
                  }}
                />

                <div>
                  <button
                    onClick={() => refs.current.click()}
                    className="btn btn-success"
                    type="button"
                  >
                    Gambar Tranfer Refund Batal
                  </button>
                </div>
                <ErrorMessage
                  component={TextError}
                  name="gambarTranferRefundBatal"
                />
                <br />
                {formik.values.gambarTranferRefundBatal && (
                  <ImagePriviewSingleImage
                    gambar={formik.values.gambarTranferRefundBatal}
                  />
                )}
              </div>

              <div className="col-6">
                <button className="btn btn-primary" type="submit">
                  Submit
                </button>
              </div>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default FormGagal;
