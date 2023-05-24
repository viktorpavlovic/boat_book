import React from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import "./login-form.scss";

const LoginForm = () => {
  const navigate = useNavigate();
  const defaultLoginValue = {
    username: "",
    password: "",
  };
  const validationSchema = yup.object().shape({
    username: yup
      .string()
      .required("Please choose your username")
      .min(5, "Minimum 5 characters"),
    password: yup
      .string()
      .required("Please choose your password")
      .min(5, "Minimum 5 characters"),
  });
  const handleSubmit = (values) => {
    navigate("/reservation");
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
            <Field type="text" name="username" placeholder="Username" />
            <p className="error-handle">
              <ErrorMessage name="username" />
            </p>
            <Field type="password" name="password" placeholder="Password" />
            <p className="error-handle">
              <ErrorMessage name="password" />
            </p>
            <button type="submit" className="submit-btn login">
              LogIn
            </button>
          </Form>
        </section>
      </Formik>
    </div>
  );
};

export default LoginForm;
