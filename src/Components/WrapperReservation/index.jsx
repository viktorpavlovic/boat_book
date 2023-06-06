import { React, useContext, useState } from "react";
import dayjs from "dayjs";
import { Formik, Field, Form, ErrorMessage } from "formik";
import ChooseBoat from "../ChooseBoat";
import { applicationContext } from "../../context";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../../firebase";
import * as yup from "yup";
import "./../WrapperReservation/wrapper-reservation.scss";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const WrapperReservation = () => {
  const { bookValues, setBookValues, allDocs } = useContext(applicationContext);
  const [reservationInfo, setReservationInfo] = useState({
    nameInfo: "",
    numberOfPassengers: 0,
    phoneNumber: 0,
  });
  const [availableDates, setAvailableDates] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const validationSchema = yup.object().shape({
    // date: yup
    //   .date()
    //   .required("Please insert a date")
    //   .min(bookDate, "Date must be at least one day from today"),
    // time: yup.string().required("Please select time for cruise"),
    nameInfo: yup.string().required("Please enter your name"),
    numberOfPassengers: yup
      .number()
      .required("Please enter a number of passengers")
      .max(10, "Max passengers 10"),
    phoneNumber: yup
      .string()
      .matches(phoneRegExp, "Phone number is not valid")
      .min(8, "too short")
      .max(10, "too long"),
  });
  const selectedBoat = allDocs?.filter((e) => e.data.boat === bookValues.boat);
  const selectedDate = selectedBoat?.filter(
    (e) => e.data.date === bookValues.date
  );
  const selectedTour = selectedDate?.filter(
    (e) => e.data.time === bookValues.time
  );
  const handleSubmit = (values) => {
    const boatRef = doc(db, "tours", selectedTour[0].id);
    const availableSeats =
      selectedTour[0].data.availableSeats - values.numberOfPassengers; // ubaciti validaciju(ako je manje od 0 error)
    updateDoc(boatRef, {
      availableSeats: availableSeats,
      reservations: arrayUnion({
        nameInfo: values.nameInfo,
        numberOfPassengers: values.numberOfPassengers,
        phoneNumber: values.phoneNumber,
      }),
    });
    setBookValues({
      ...bookValues,
      boat: "",
      date: "",
      time: "",
    });
    setReservationInfo({
        ...reservationInfo,
        nameInfo: "",
        numberOfPassengers:"",
        phoneNumber: "",
    })
  };
  return (
    <div className="div-WrapperReservation">
      <ChooseBoat setAvailableDates={setAvailableDates} />

      <DatePicker
        selected={startDate}
        includeDates={availableDates}
        onChange={(date) => {
          setStartDate(date);
          setBookValues({
            ...bookValues,
            date: dayjs(date).format("YYYY-MM-DD"),
          });
        }}
      />
      <p
        onClick={() =>
          setBookValues({
            ...bookValues,
            time: "daytime",
          })
        }
      >
        Daytime
      </p>
      <p
        onClick={() =>
          setBookValues({
            ...bookValues,
            time: "sunset",
          })
        }
      >
        Sunset
      </p>
      <p
        onClick={() =>
          setBookValues({
            ...bookValues,
            time: "night",
          })
        }
      >
        Night
      </p>

      <Formik
        initialValues={reservationInfo}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="res-form">
          <section>
            <h4>
              Enter numbers of passengers: <span>*</span>
            </h4>
            <Field type="number" name="numberOfPassengers" />
            <p className="error-handle">
              <ErrorMessage name="numberOfPassengers" />
            </p>
            <h4>
              Enter your name <span>*</span>
            </h4>
            <Field
              type="text"
              name="nameInfo"
              placeholder="Your name"
              className="form-field"
            />
            <p className="error-handle">
              <ErrorMessage name="nameInfo" />
            </p>
            <h4>Phone number</h4>
            <label className="joke">
              <Field
                type="number"
                name="phoneNumber"
                placeholder="Your phone number"
              />
              <Field
                type="range"
                name="phoneNumber"
                placeholder="Your phone number"
                min="1"
                max="9999999999"
                steps="1"
              />
            </label>
            <p className="error-handle">
              <ErrorMessage name="phoneNumber" />
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

export default WrapperReservation;
