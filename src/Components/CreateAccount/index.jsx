import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import * as yup from "yup";
import "./create-account.scss";

const CreateAccount = () => {
    const [message,setMessage]=useState("")
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
  const createAccount = (values) => {
    createUserWithEmailAndPassword(auth, values?.email, values?.password)
      .then(() => {
       setMessage("Account succesfully created");
      })
      .catch(() => {
        setMessage("User already exist")
      });
  };
  return (
    <div className="div-create-account">
     
      <Formik
        initialValues={defaultLoginValue}
        validationSchema={validationSchema}
        onSubmit={createAccount}
      >
        <section>
          <Form>
            <h1>Create account</h1>
            <Field type="text" name="email" placeholder="Email" />
            <p className="error-handle">
              <ErrorMessage name="email" />
            </p>
            <Field type="password" name="password" placeholder="Password" />
            <p className="error-handle">
              <ErrorMessage name="password" />
            </p>
            <button type="submit" className="submit-btn login">
              Create new
            </button>
            <p className="error-handle">{message}</p>
          </Form>
        </section>
      </Formik>
    </div>
  );
};

export default CreateAccount;
