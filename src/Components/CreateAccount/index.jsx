import React, { useState } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase";
import { doc, setDoc } from "firebase/firestore";
import * as yup from "yup";
import "./create-account.scss";

const CreateAccount = () => {
  const [message, setMessage] = useState("");
  const defaultLoginValue = {
    email: "",
    password: "",
    hotel_name: "",
    full_name: "",
    phone_number: "",
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
      .then((cred) => {
        const ref = doc(db, "users", cred.user.uid);
        setDoc(ref, {
          hotel_name: values.hotel_name,
          full_name: values.full_name,
          phone_number: values.phone_number,
        });
        setMessage("Account succesfully created");
      })
      .catch(() => {
        setMessage("User already exist");
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
            <Field type="text" name="hotel_name" placeholder="Hotel Name" />
            <p className="error-handle">
              <ErrorMessage name="hotel_name" />
            </p>
            <Field type="text" name="full_name" placeholder="Full Name" />
            <p className="error-handle">
              <ErrorMessage name="full_name" />
            </p>
            <Field type="text" name="phone_number" placeholder="Phone Number" />
            <p className="error-handle">
              <ErrorMessage name="phone_number" />
            </p>
            <button type="submit" className="submit-btn login">
              Create new
            </button>
          </Form>
          <p
            className={
              message === "Account succesfully created"
                ? "success-create"
                : "error-handle"
            }
          >
            {message}
          </p>
        </section>
      </Formik>
    </div>
  );
};

export default CreateAccount;
