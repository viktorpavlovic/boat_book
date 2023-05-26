import React, { useContext, useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { applicationContext } from "../../context";
import auth from "../../firebase";
import * as yup from "yup";
import "./login-form.scss";

const LoginForm = () => {
  const { setAccessToken, navigate } = useContext(applicationContext);
  const [existingUser, setExistingUser] = useState("");
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
  const handleSubmit = (values) => {
    createUserWithEmailAndPassword(auth, values?.email, values?.password)
      .then((userCredential) => {
        setAccessToken(userCredential.user.accessToken);
        if (userCredential?.user?.accessToken) {
          localStorage.setItem(
            "accessToken",
            JSON.stringify(userCredential?.user?.accessToken)
          );
        }
        navigate("/reservation");
      })
      .catch(() => {
        setExistingUser("Use another email");
      });
    console.log("values", values);
  };

  return (
    <div className="div-login-form">
      <Formik
        initialValues={defaultLoginValue}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
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
            <p className="error-handle">{existingUser}</p>
          </Form>
        </section>
      </Formik>
    </div>
  );
};

export default LoginForm;
