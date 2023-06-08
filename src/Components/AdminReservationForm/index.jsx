import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as yup from "yup";
import dayjs from "dayjs";
import { db } from "../../firebase";
import { addDoc, collection } from "firebase/firestore";
import "./admin-reservation-form.scss";

const AdminReservationForm = () => {
  const bookDate = dayjs().add(1, "day").format("YYYY-MM-DD");
  const defaultValue = {
    boat: "",
    startDate: "",
    endDate: "",
    available_seats: 0,
    time: [],
  };
  const validationSchema = yup.object().shape({
    boat: yup.string().required("Select a boat"),
    startDate: yup
      .date()
      .required("Please insert a start date")
      .min(bookDate, "Date must be at least one day from today"),
    endDate: yup
      .date()
      .required("Please insert an end date")
      .min(
        yup.ref("startDate"),
        "End date cannot be before start date"
      ),
    available_seats: yup
      .number()
      .required("Enter available seats")
      .min(1, "One seat minimum"),
    time: yup.array().min(1, 'Select at least one time of day option').of(yup.string().required()).required(),
  });
  const getDatesBetween = (startDate, endDate) => {
    let dates = [];
    let currentDate = new Date(startDate);
    let finalDate = new Date(endDate);
    while (currentDate <= finalDate) {
      dates.push(dayjs(currentDate).format("YYYY-MM-DD"));
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
  };
  const handleAdd = (values) => {
    const dateRange = getDatesBetween(values.startDate,values.endDate)
    dateRange.forEach((singleDate)=>{
      values.time.forEach((singleTime)=>{
        addDoc(collection(db, "tours"), {
          boat: values.boat,
          date: singleDate,
          availableSeats: values.available_seats,
          time: singleTime,
          reservations: [],
        });
      });
    });
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
            <h4>Choose a start date for tour</h4>
            <Field type="date" name="startDate" />
            <p className="error-handle">
              <ErrorMessage name="startDate" />
            </p>
            <h4>Choose an end date for tour</h4>
            <Field type="date" name="endDate" />
            <p className="error-handle">
              <ErrorMessage name="endDate" />
            </p>
            <h4>Choose time for tour</h4>
            <label>
              Daytime
              <Field type="checkbox" name="time" value="daytime" />
            </label>
            <label>
              Sunset
              <Field type="checkbox" name="time" value="sunset" />
            </label>
            <label>
              Night
              <Field type="checkbox" name="time" value="night" />
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
