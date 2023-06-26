import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useContext } from "react";
import { applicationContext } from "../../context";
import * as yup from "yup";
import dayjs from "dayjs";
import { db } from "../../firebase";
import { addDoc, collection } from "firebase/firestore";
import DatePickerField from "../DatePickerField";
import "./admin-reservation-form.scss";

const AdminReservationForm = () => {
  const { setFreshData, freshData } = useContext(applicationContext);
  const defaultValue = {
    boat: "",
    startDate: "",
    endDate: "",
    date:'',
    available_seats: 50,
    time: [],
  };

  const validationSchema = yup.object().shape({
    boat: yup.string().required("Select a boat"),
    date: yup
      .array()
      .required("Please insert a date"),
    available_seats: yup
      .number()
      .required("Enter available seats")
      .min(1, "One seat minimum"),
    time: yup
      .array()
      .min(1, "Select at least one time of day option")
      .of(yup.string().required())
      .required(),
  });
  const getDates = (datesArray) => {
    let dates = [];
    datesArray.forEach((date)=>{
      dates.push(dayjs(date).format("YYYY-MM-DD"));
    })
    
    return dates;
  };
  const handleAdd = (values) => {
    const dateRange = getDates(values.date)
    dateRange.forEach((singleDate) => {
      values.time.forEach((singleTime) => {
        addDoc(collection(db, "tours"), {
          boat: values.boat,
          date: singleDate,
          availableSeats: values.boat === "key-boat" ? 120 : values.boat === "turtle-boat" ? 45 : 38,
          time: singleTime,
          reservations: [],
        });
      });
    });
    setFreshData(!freshData);
  };

  return (
    <div className="div-admin-res">
      <h3>Create a tour:</h3>
      
      <Formik
        initialValues={defaultValue}
        validationSchema={validationSchema}
        onSubmit={handleAdd}
      >
        {({ values, setFieldValue }) => (
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
              <h4>Select Date/Dates</h4>
              <DatePickerField
                name='date'
                value={values.date}
                onChange={setFieldValue}
              />
              <p className="error-handle">
                <ErrorMessage name="date" />
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
              <button className="submit-btn" type="submit">
                Create tour
              </button>
            </section>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AdminReservationForm;
