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
import moment from "moment";
// import { ticketInfoHandler } from "../../store/ticket-context";
// trebace kontekst ako hocemo da dodajemo gluposti za pdf

const WrapperReservation = () => {
  const {
    allDocs,
    user,
    freshData,
    setFreshData,
  } = useContext(applicationContext);
  const reservationInfo = {
    id: "",
    roomNumber: 0,
    numberOfPassengers: 0,
    children: 0,
    preteens: 0,
    phoneNumber: "",
    isPaid: true,
  };
  const [ticketInfo, setTicketInfo] = useState({
    boat: "",
    date: "",
    passengers: "",
  });
  const dateFormat = "YYYY-M-D H:m";
  const [availableDates, setAvailableDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedRide, setSelectedRide] = useState(null)
  const today = new Date();
  const weekFromNow = new Date();
  weekFromNow.setDate(today.getDate() + 7);
  const filteredDates = availableDates.length
    ? availableDates
        .sort((a, b) => moment(a, dateFormat) - moment(b, dateFormat))
        .filter((date) => moment(date, dateFormat) > moment(today, dateFormat))
        .filter((date, index, dates) => dates.indexOf(date) === index)
    : [];
  const [success, setSuccess] = useState(false);
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const selectedBoat = allDocs?.filter((e) => e.data.boat === selectedRide?.data.name);

  const selectedTour = selectedBoat?.find(
    (e) => e.data.date === selectedDate
  );
  const prices = {
    adults: selectedRide?.data.prices.adults,
    preteens: selectedRide?.data.prices.preteens,
    children: selectedRide?.data.prices.children,
  }
  const formRef = useRef(null);
  const plusPassengerCount = (setFieldValue, values) => {
    setFieldValue("numberOfPassengers", values.numberOfPassengers + 1);
  };
  const minusPassengerCount = (setFieldValue, values) => {
    if (values.numberOfPassengers > 0) {
      setFieldValue("numberOfPassengers", values.numberOfPassengers - 1);
    }
  };
  const plusChildrenCount = (setFieldValue, values) => {
    setFieldValue("children", values.children + 1);
  };
  const minusChildrenCount = (setFieldValue, values) => {
    if (values.children > 0) {
      setFieldValue("children", values.children - 1);
    }
  };

  const plusPreteenCount = (setFieldValue, values) => {
    setFieldValue("preteens", values.preteens + 1);
  };
  const minusPreteenCount = (setFieldValue, values) => {
    if (values.preteens > 0) {
      setFieldValue("preteens", values.preteens - 1);
    }
  };
  const validationSchema = (tour) =>
    yup.object().shape({
      roomNumber: yup
        .number()
        .required("Please enter your room number")
        .min(1, "Room number must be positive"),
      numberOfPassengers: yup
        .number()
        .required("Please enter a number of passengers")
        .max(10, "Max passengers 10")
        .min(1, "Min one passenger")
        .test(
          "not-enough-seats",
          "There's not that many seats available",
          (passengers) => tour.data.availableSeats >= passengers
        ),
      preteens: yup
        .number()
        .max(10, "Max passengers 10")
        .min(0, "Can't be less than zero")
        .test(
          "not-enough-seats",
          "There's not that many seats available",
          (passengers) => tour.data.availableSeats >= passengers
        ),
      children: yup
        .number()
        .max(10, "Max passengers 10")
        .min(0, "Can't be less than zero"),

      phoneNumber: yup
        .string()
        .matches(phoneRegExp, "Phone number is not valid")
        .min(8, "too short")
        .max(10, "too long"),
    });
  const handleSubmit = (values, { resetForm }) => {
    const tour = selectedTour;
    const tourRef = doc(db, "tours", tour.id);
    const random = Math.floor(Math.random() * 1000000000);
    setTicketInfo({
      ...ticketInfo,
      boat: selectedRide.data.name,
      date: selectedDate,
      numberOfPassengers: values.numberOfPassengers,
      roomNumber: values.roomNumber,
      phoneNumber: values.phoneNumber,
      children: values.children,
      preteens: values.preteens,
      ticketPrice: values.numberOfPassengers*prices.adults+values.preteens*prices.preteens+values.children*prices.children,
      isPaid:values.isPaid,
    });
    updateDoc(tourRef, {
      availableSeats:
        tour.data.availableSeats -
        (values.numberOfPassengers + values.preteens + values.children),
      reservations: arrayUnion({
        id: random,
        userEmail: user,
        numberOfPassengers: values.numberOfPassengers,
        children: values.children,
        preteens: values.preteens,
        roomNumber: values.roomNumber,
        phoneNumber: values.phoneNumber,
        isPaid: values.isPaid,
        ticketPrice: values.numberOfPassengers*prices.adults+values.preteens*prices.preteens+values.children*prices.children
      }),
    });
    setSelectedRide(null)
    resetForm();
    setSuccess(true);
    setFreshData(!freshData);
    setSelectedDate(null);
  };
  return (
    <div className="div-WrapperReservation">
      <ChooseBoat setAvailableDates={setAvailableDates} selectedRide={selectedRide} setSelectedRide={setSelectedRide}
      setSelectedDate={setSelectedDate}
      />
      <h4 className="tour-title">
        Select a tour to continue <span>*</span>
      </h4>
      <div className="dateWrapper">
        <div className="dateWrapperScroll">
          {(
            !selectedRide
              ? null
              : filteredDates.length === 0 || new Date(filteredDates[0]).getTime() > weekFromNow.getTime()
          ) ? (
            <>
              <p>There are no tours for this</p>
              <p>boat during this week.</p>
            </>
          ) : (
            filteredDates.map((date, i) => {
              const hour = new Date(date).getHours();
              return (
                <div
                  className={selectedDate === date ? "tour selected" : "tour"}
                  key={i}
                  ref={formRef}
                  onClick={() => {
                    setSelectedDate(date);
                    setTimeout(() => {
                      formRef.current.scrollIntoView({ behavior: "smooth" });
                    }, 0);
                  }}
                >
                  <p
                  style={{backgroundColor: hour >= 19 && hour < 22 ? 'orange' : hour >= 22 || hour < 4 ? 'purple' : 'yellow' }}
                  >{dayjs(new Date(date)).format("ddd DD-MM HH:mm")}</p>
                </div>
              );
            })
          )}
        </div>
      </div>
      {selectedTour && (
        <Formik
          initialValues={reservationInfo}
          validationSchema={() => validationSchema(selectedTour)}
          onSubmit={handleSubmit}
        >
          {({ values, setFieldValue }) => (
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
                <div className="plus-minus">
                  <button
                    type="button"
                    onClick={() => plusPassengerCount(setFieldValue, values)}
                  >
                    +
                  </button>
                  <button
                    type="button"
                    onClick={() => minusPassengerCount(setFieldValue, values)}
                  >
                    -
                  </button>
                </div>
                <p className="error-handle">
                  <ErrorMessage name="numberOfPassengers" />
                </p>
                <h6>Kids 7-12 50% of </h6>
                <Field type="number" name="preteens" />
                <div className="plus-minus">
                  <button
                    type="button"
                    onClick={() => plusPreteenCount(setFieldValue, values)}
                  >
                    +
                  </button>
                  <button
                    type="button"
                    onClick={() => minusPreteenCount(setFieldValue, values)}
                  >
                    -
                  </button>
                </div>
                <p className="error-handle">
                  <ErrorMessage name="preteens" />
                </p>
                <h6>Kids 0-7 years free:</h6>
                <Field
                  type="number"
                  name="children"
                  placeholder="Any children?"
                />
                <div className="plus-minus">
                  <button
                    type="button"
                    onClick={() => plusChildrenCount(setFieldValue, values)}
                  >
                    +
                  </button>
                  <button
                    type="button"
                    onClick={() => minusChildrenCount(setFieldValue, values)}
                  >
                    -
                  </button>
                </div>
                <p className="error-handle">
                  <ErrorMessage name="children" />
                </p>
                <h4>
                  Enter your room number <span>*</span>
                </h4>
                <Field
                  type="text"
                  name="roomNumber"
                  placeholder="Number of room"
                  className="form-field"
                />
                <p className="error-handle">
                  <ErrorMessage name="roomNumber" />
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
                <p>{values.numberOfPassengers*prices.adults+values.preteens*prices.preteens+values.children*prices.children} din.</p>
                <Field component="div" name="isPaid">
                  <label htmlFor="radioOne">
                    Paid in cash
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
          )}
        </Formik>
      )}
      {success && (
        <SuccessModal setSuccess={setSuccess} ticketInfo={ticketInfo} />
      )}
    </div>
  );
};

export default WrapperReservation;
