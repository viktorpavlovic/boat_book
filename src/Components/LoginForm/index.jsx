import React, { useContext, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { signInWithEmailAndPassword } from "firebase/auth";
import { applicationContext } from "../../context";
import { auth } from "../../firebase";
import * as yup from "yup";
import "./login-form.scss";

const LoginForm = () => {
  const { setAccessToken, setUserUid, navigate } = useContext(applicationContext);
  const [wrongCredentials, setWrongCredentials] = useState("");
  const defaultLoginValue = {
    email: "",
    password: "",
  };
  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .required("Please enter your email")
      .email("Please enter valid email"),
    password: yup
      .string()
      .required("Please choose your password")
      .min(6, "Minimum 6 characters"),
  });
  const signIn = (values) => {
    signInWithEmailAndPassword(auth, values?.email, values?.password)
      .then((userCredential) => {
        setAccessToken(userCredential.user.accessToken);
        setUserUid(userCredential.user.uid);
        if (userCredential?.user?.accessToken) {
          localStorage.setItem(
            "accessToken",
            JSON.stringify(userCredential?.user?.accessToken)
          );
        }
        navigate("/reservation");
      })
      .catch(() => {
        setWrongCredentials("Please insert correct credentials");
      });
    // console.log(user);
  };

  return (
    <div className="div-login-form">
      <Formik
        initialValues={defaultLoginValue}
        validationSchema={validationSchema}
        onSubmit={signIn}
      >
        <section>
          <Form>
            <h1>LogIn</h1>
            <Field type="text" name="email" placeholder="Email" />
            <p className="error-handle">
              <ErrorMessage name="email" />
            </p>
            <Field type="password" name="password" placeholder="Password" />
            <p className="error-handle">
              <ErrorMessage name="password" />
            </p>
            <button type="submit" className="submit-btn login">
              LogIn
            </button>
            <p className="error-handle">{wrongCredentials}</p>
          </Form>
        </section>
      </Formik>
    </div>
  );
};

export default LoginForm;
