import { React, useContext, useState, useRef } from "react";
import dayjs from "dayjs";
import { Formik, Field, Form, ErrorMessage } from "formik";
import ChooseBoat from "../ChooseBoat";
import SuccessModal from "../SuccessModal";
import { applicationContext } from "../../context";
import { doc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../../firebase";
import * as yup from "yup";
import "./../WrapperReservation/wrapper-reservation.scss";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const WrapperReservation = () => {
  const { bookValues, setBookValues, allDocs, user } =
    useContext(applicationContext);
  const reservationInfo = {
    nameInfo: "",
    numberOfPassengers: "",
    children: "",
    phoneNumber: "",
    isPaid: true,
  };
  const [ticketInfo, setTicketInfo] = useState({
    boat: "",
    date: "",
    passengers: "",
  });

  const [availableDates, setAvailableDates] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const availableTimes = ["daytime", "sunset", "night"];
  const [success, setSuccess] = useState(false);
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const selectedBoat = allDocs?.filter((e) => e.data.boat === bookValues.boat);
  const selectedDate = selectedBoat?.filter(
    (e) => e.data.date === bookValues.date
  );
  const selectedTour = selectedDate?.filter(
    (e) => e.data.time === bookValues.time
  );
  const formRef = useRef(null);
  const validationSchema = (tour) =>
    yup.object().shape({
      nameInfo: yup.string().required("Please enter your name"),
      numberOfPassengers: yup
        .number()
        .required("Please enter a number of passengers")
        .max(10, "Max passengers 10")
        .test(
          "not-enough-seats",
          "There's not that many seats available",
          (passengers) => tour.data.availableSeats >= passengers
        ),
      children: yup
        .number()
        .max(
          yup.ref("numberOfPassengers"),
          "This cannot be higher than the number of passengers"
        ),
      phoneNumber: yup
        .string()
        .matches(phoneRegExp, "Phone number is not valid")
        .min(8, "too short")
        .max(10, "too long"),
    });
  const handleSubmit = (values, { resetForm }) => {
    const tourRef = doc(db, "tours", selectedTour[0].id);
    const availableSeats =
      selectedTour[0].data.availableSeats - values.numberOfPassengers;
    updateDoc(tourRef, {
      availableSeats: availableSeats,
      reservations: arrayUnion({
        userEmail: user,
        numberOfPassengers: values.numberOfPassengers,
        children: values.children,
        nameInfo: values.nameInfo,
        phoneNumber: values.phoneNumber,
        isPaid: true,
      }),
    });
    setTicketInfo({
      ...ticketInfo,
      boat: bookValues.boat,
      date: bookValues.date,
      numberOfPassengers: values.numberOfPassengers,
    });
    setBookValues({
      ...bookValues,
      boat: "",
      date: "",
      time: "",
    });
    setStartDate(new Date());
    resetForm();
    setSuccess(true);
  };
  return (
    <div className="div-WrapperReservation">
      <ChooseBoat setAvailableDates={setAvailableDates} />
      <div className="datepickerWrapper">
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
      </div>

      <ul className="time-picker" ref={formRef}>
        {availableTimes.map((item) => (
          <li
            key={item}
            className={
              selectedDate.some((e) => e.data.time === item)
                ? "time-picker-option"
                : "time-picker-option disabled"
            }
            onClick={
              selectedDate.some((e) => e.data.time === item)
                ? () => {
                    setBookValues({
                      ...bookValues,
                      time: item,
                    });
                    setTimeout(() => {
                      formRef.current.scrollIntoView({ behavior: "smooth" });
                    }, 0);
                  }
                : (e) => e.preventDefault()
            }
          >
            {item}
          </li>
        ))}
      </ul>
      {selectedTour[0] && (
        <Formik
          initialValues={reservationInfo}
          validationSchema={() => validationSchema(selectedTour[0])}
          onSubmit={handleSubmit}
        >
          <Form className="res-form">
            <section>
              <h4>
                Enter number of passengers: <span>*</span>
              </h4>
              <Field
                type="number"
                name="numberOfPassengers"
                placeholder="Total passengers"
              />
              <p className="error-handle">
                <ErrorMessage name="numberOfPassengers" />
              </p>
              <h6>Children:</h6>
              <Field
                type="number"
                name="children"
                placeholder="Any children?"
              />
              <p className="error-handle">
                <ErrorMessage name="children" />
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
                  min="1"
                  max="9999999999"
                  steps="1"
                />
              </label>
              <p className="error-handle">
                <ErrorMessage name="phoneNumber" />
              </p>
              <Field component="div" name="isPaid">
                <label htmlFor="radioOne">
                  Paid
                  <input
                    type="radio"
                    id="radioOne"
                    defaultChecked="radioOne"
                    name="isPaid"
                    value="true"
                  />
                </label>
                <label htmlFor="radioTwo">
                  Not Paid
                  <input
                    type="radio"
                    id="radioTwo"
                    name="isPaid"
                    value="false"
                  />
                </label>
              </Field>
              <button className="submit-btn" type="submit">
                Reserve
              </button>
            </section>
          </Form>
        </Formik>
      )}
      {success && (
        <SuccessModal setSuccess={setSuccess} ticketInfo={ticketInfo} />
      )}
    </div>
  );
};

export default WrapperReservation;
