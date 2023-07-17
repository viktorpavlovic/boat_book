import { useRef, React } from "react";
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
  const { setFreshData, freshData, rides } = useContext(applicationContext);
  const tourRef = useRef(null);
  const d = new Date();
  d.setHours(16,0,0,0)
  const defaultValue = {
    boat: "",
    date: [d],
    available_seats: 50,
    hours: 0,
  };

  const validationSchema = yup.object().shape({
    boat: yup.string().required("Select a boat"),
    date: yup.array().required("Please insert a date"),
    available_seats: yup
      .number()
      .required("Enter available seats")
      .min(1, "One seat minimum")
  });
  const getDates = (datesArray) => {
    let dates = [];
    datesArray.forEach((date) => {
      dates.push(dayjs(date).format("YYYY-MM-DD HH:mm"));
    });
    return dates;
  };
  
  const handleAdd = (values, { resetForm }) => {
    const dateRange = getDates(values.date);
    const selectedRide = rides.find((e) => e.data.name === values.boat);
    dateRange.forEach((singleDate) => {
      addDoc(collection(db, "tours"), {
        boat: values.boat,
        date: `${singleDate}`,
        availableSeats: selectedRide.data.totalSeats,
        reservations: [],
        type: values.type
      });
    });
    tourRef.current.scrollIntoView({ behavior: "smooth" });
    setFreshData(!freshData);
    resetForm();
  };
  // const hours = []
  // const minutes = [0, 15, 30, 45]
  // for(let i =0; i<24;i++){
  //   hours.push(i)
  // }

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
              {rides.map((data, i) => (
                <label key={i}>
                  <p>{data.data.name.split('-').join(' ') }</p>
                  <Field
                    type="radio"
                    name="boat"
                    value={data.data.name}
                    key={i}
                  />
                </label>
              ))}
              <h4>Select Date/Dates</h4>
              <DatePickerField
                name="date"
                value={values.date}
                onChange={setFieldValue}
              />
              <h4>Type:</h4>
              {["daytime", "sunset", "nigga"].map((type, i) => (
                <label key={i}>
                  <p>{type}</p>
                  <Field
                    type="radio"
                    name="type"
                    value={type}
                  />
                </label>
              ))}
              <p className="error-handle">
                <ErrorMessage name="date" />
              </p>

              <p className="error-handle">
                <ErrorMessage name="hours" />
              </p>
              <p className="error-handle">
                <ErrorMessage name="minutes" />
              </p>
              <button className="submit-btn" type="submit" ref={tourRef}>
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
