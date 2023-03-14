import React, { Fragment } from "react";
import classes from "./listLogin.module.css";
import * as Yup from "yup";
import { Formik, Form } from "formik";
import FormikControl from "../../../shared/formikUse/FormikControl";
import Alert from "react-bootstrap/Alert";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBCard,
  MDBCardImage,
  MDBCardBody,
} from "mdb-react-ui-kit";
import { useHttp } from "../../../shared/util/http-hook";
import { useDispatch } from "react-redux";
import { isLogin } from "../../../Data/LoginSlice";
import { useNavigate } from "react-router-dom";

const ListLogin = () => {
  const seminggutoken = new Date().getTime() + 604800000;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onLogin = (tokenLogin, refreshToken, login) =>
    dispatch(isLogin({ tokenLogin, refreshToken, login }));

  const {
    sendRequest,
    setErrorValidate,
    errorPesan,
    errorValidate,
    setErorrPesan,
  } = useHttp();
  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("email gk sesuai")
      .required("Penting Harus di isi"),
    password: Yup.string()
      .required("Required")
      .min(5, `minimal password 5 huruf`),
  });

  const onSubmit = async (values) => {
    try {
      const hasilLogin = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL_API}/adminlogin`,
        "POST",
        JSON.stringify({ email: values.email, password: values.password }),
        {
          "Content-Type": "application/json",
        }
      );

      onLogin(hasilLogin.token, hasilLogin.refreshToken, true);

      localStorage.setItem(
        "dataAdmin",
        JSON.stringify({
          token: hasilLogin.token,
          refreshtoken: hasilLogin.refreshToken,
          login: true,
          waktuExpieyed: seminggutoken,
        })
      );

      navigate("/data", { replace: true });
    } catch (err) {
      setErorrPesan(err);
      setErrorValidate(true);
    }
  };

  return (
    <Fragment>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />

      <MDBContainer className={classes.hidden}>
        <MDBCard>
          <MDBRow className="g-0">
            <MDBCol md="6">
              <MDBCardImage
                src="https://images.unsplash.com/photo-1633655442432-620aa55d7ac1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=876&q=80"
                alt="login form"
                className={`rounded-start w-100 ${classes.styleImg}`}
              />
            </MDBCol>

            <MDBCol md="6">
              <MDBCardBody className="d-flex flex-column">
                <div className="d-flex flex-row mt-2">
                  <MDBIcon
                    fas
                    icon="cubes fa-3x me-3"
                    style={{ color: "#ff6219" }}
                  />
                  <span className="h1 fw-bold mb-0">LORD'S ADMIN</span>
                </div>

                <h5
                  className="fw-normal my-4 pb-3"
                  style={{ letterSpacing: "1px" }}
                >
                  Sign into your account
                </h5>
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
                >
                  {(formik) => {
                    return (
                      <Form>
                        <FormikControl
                          control="input"
                          type="email"
                          label="Email"
                          name="email"
                          placeholder="masukan data"
                          toucheds={formik.touched.email?.toString()}
                          error={formik.errors.email}
                        />
                        <FormikControl
                          control="input"
                          type="password"
                          label="Password"
                          name="password"
                          autoComplete="on"
                          placeholder="masukan data"
                          toucheds={formik.touched.password?.toString()}
                          error={formik.errors.password}
                        />

                        <div className="d-grid gap-2">
                          <button type="submit" className="btn btn-primary">
                            LOGIN
                          </button>
                        </div>
                      </Form>
                    );
                  }}
                </Formik>
              </MDBCardBody>
            </MDBCol>
          </MDBRow>
        </MDBCard>
      </MDBContainer>
    </Fragment>
  );
};

export default ListLogin;
