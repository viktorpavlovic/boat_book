import React from "react";
import dayjs from "dayjs";
import { Formik, Field, Form, ErrorMessage } from "formik";
import ChooseBoat from "../ChooseBoat";
import * as yup from "yup";
import "./reservation-form.scss";

const ReservationForm = () => {
  const bookDate = dayjs().add(1, "day").format("YYYY-MM-DD");
  const defaultValue = {
    date: "",
    time: "",
    name: "",
    email: "",
  };
  const validationSchema = yup.object().shape({
    date: yup.date().min(bookDate, "Date must be at least one day from today"),
    time: yup.string().required("Please select time for cruise"),
    name: yup.string().required("Please enter your name"),
    email: yup
      .string()
      .required("Please enter your email")
      .email("Please enter valid email"),
  });
  const handleSubmit = (values) => {
    console.log("values", values);
  };
  return (
    <div className="div-reservationForm">
      <Formik
        initialValues={defaultValue}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form>
          <ChooseBoat />
          <h4>Choose Date</h4>
          <Field type="date" name="date" />
          <p className="error-handle">
            <ErrorMessage name="date" />
          </p>
          <h4>Choose time for tour</h4>
          <label>
            Daytime
            <Field type="radio" name="time" value="Daytime" />
          </label>
          <label>
            Sunset
            <Field type="radio" name="time" value="Sunset" />
          </label>
          <label>
            Night
            <Field type="radio" name="time" value="Night" />
          </label>
          <p className="error-handle">
            <ErrorMessage name="time" />
          </p>
          <h4>Enter your name</h4>
          <Field
            type="text"
            name="name"
            placeholder="Your name"
            className="form-field"
          />
          <p className="error-handle">
            <ErrorMessage name="name" />
          </p>
          <h4>Enter your email</h4>
          <Field
            type="email"
            name="email"
            placeholder="Your email"
            className="form-field"
          />
          <p className="error-handle">
            <ErrorMessage name="email" />
          </p>
          <button className="sunmit-btn" type="submit">
            Reserve
          </button>
        </Form>
      </Formik>
    </div>
  );
};

export default ReservationForm;
