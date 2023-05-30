import { React, useContext } from "react";
import dayjs from "dayjs";
import { Formik, Field, Form, ErrorMessage } from "formik";
import ChooseBoat from "../ChooseBoat";
import { applicationContext } from "../../context";
import * as yup from "yup";
import "./reservation-form.scss";

const ReservationForm = () => {
  const { bookValues, setBookValues } = useContext(applicationContext);
  const bookDate = dayjs().add(1, "day").format("YYYY-MM-DD");
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const defaultValue = {
    date: "",
    time: "",
    email: "",
    num_of_passengers: "",
    phone_number: "",
  };
  const validationSchema = yup.object().shape({
    date: yup
      .date()
      .required("Please insert a date")
      .min(bookDate, "Date must be at least one day from today"),
    time: yup.string().required("Please select time for cruise"),
    email: yup
      .string()
      .required("Please enter your email")
      .email("Please enter valid email"),
    num_of_passengers: yup
      .number()
      .required("Please enter a number of passengers"),
    phone_number: yup
      .string()
      .matches(phoneRegExp, "Phone number is not valid")
      .min(8, "too short")
      .max(10, "too long"),
  });
  const handleSubmit = (values) => {
    setBookValues({
      ...bookValues,
      date: values.date,
      time: values.time,
      email: values.email,
      num_of_passengers: values.num_of_passengers,
      phone_number: values.phone_number,
    });
  };
  return (
    <div className="div-reservationForm">
      <Formik
        initialValues={defaultValue}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="res-form">
          <ChooseBoat />
          <section>
            <h4>
              Choose Date <span>*</span>
            </h4>
            <Field type="date" name="date" />
            <p className="error-handle">
              <ErrorMessage name="date" />
            </p>
            <h4>
              Choose time for tour <span>*</span>{" "}
            </h4>
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
            <h4>
              Enter numbers of passengers: <span>*</span>
            </h4>
            <Field type="number" name="num_of_passengers" />
            <p className="error-handle">
              <ErrorMessage name="num_of_passengers" />
            </p>
            <h4>
              Enter your email <span>*</span>
            </h4>
            <Field
              type="email"
              name="email"
              placeholder="Your email"
              className="form-field"
            />
            <p className="error-handle">
              <ErrorMessage name="email" />
            </p>
            <h4>Phone number</h4>
            <label className="joke">
            <Field
              type="number"
              name="phone_number"
              placeholder="Your phone number"
              
            />
            <Field
              type="range"
              name="phone_number"
              placeholder="Your phone number"
              min="1" max="9999999999"
              steps="1"
            />
            </label>
            <p className="error-handle">
              <ErrorMessage name="phone_number" />
            </p>
            <button className="submit-btn" type="submit">
              Reserve
            </button>
          </section>
        </Form>
      </Formik>
    </div>
  );
};

export default ReservationForm;
