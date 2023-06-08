import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useContext } from "react";
import { applicationContext } from "../../context";
import * as yup from "yup";
import dayjs from "dayjs";
import { db } from "../../firebase";
import { addDoc, collection } from "firebase/firestore";
import "./admin-reservation-form.scss";

const AdminReservationForm = () => {
  const { setFreshData,freshData } = useContext(applicationContext);
  const bookDate = dayjs().add(1, "day").format("YYYY-MM-DD");
  const defaultValue = {
    boat: "",
    date: "",
    available_seats: 0,
    time: "",
  };
  const validationSchema = yup.object().shape({
    boat: yup.string().required("Select a boat"),
    date: yup
      .date()
      .required("Please insert a date")
      .min(bookDate, "Date must be at least one day from today"),
    available_seats: yup
      .number()
      .required("Enter available seats")
      .min(1, "One seat minimum"),
    time: yup.string().required("Please select time for cruise"),
  });
  const handleAdd = async (values) => {
    await addDoc(collection(db, "tours"), {
      boat: values.boat,
      date: values.date,
      availableSeats: values.available_seats,
      time: values.time,
      reservations: [],
    });
    setFreshData(!freshData)
    // console.log(values);
  };

  return (
    <div className="div-admin-res">
      <h3>Create a tour:</h3>
      <Formik
        initialValues={defaultValue}
        validationSchema={validationSchema}
        onSubmit={handleAdd}
      >
        <Form>
          <section className="admin-res">
            <h4>Boat for tour:</h4>
            <label>
              Turtle Boat
              <Field type="radio" name="boat" value="turtle-boat" />
            </label>
            <label>
              Key Boat
              <Field type="radio" name="boat" value="key-boat" />
            </label>
            <label>
              Nikola Tesla Boat
              <Field type="radio" name="boat" value="nikola-tesla-boat" />
            </label>
            <p className="error-handle">
              <ErrorMessage name="boat" />
            </p>
            <h4>Choose a date for tour</h4>
            <Field type="date" name="date" />
            <p className="error-handle">
              <ErrorMessage name="date" />
            </p>
            <h4>Choose time for tour</h4>
            <label>
              Daytime
              <Field type="radio" name="time" value="daytime" />
            </label>
            <label>
              Sunset
              <Field type="radio" name="time" value="sunset" />
            </label>
            <label>
              Night
              <Field type="radio" name="time" value="night" />
            </label>
            <p className="error-handle">
              <ErrorMessage name="time" />
            </p>
            <h4>Enter available seats:</h4>
            <Field type="number" name="available_seats" />
            <p className="error-handle">
              <ErrorMessage name="available_seats" />
            </p>

            <button className="submit-btn" type="submit">
              Create tour
            </button>
          </section>
        </Form>
      </Formik>
    </div>
  );
};

export default AdminReservationForm;
