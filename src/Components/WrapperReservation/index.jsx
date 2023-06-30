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
import { ticketInfoHandler } from "../../store/ticket-context";
// trebace kontekst ako hocemo da dodajemo gluposti za pdf

const WrapperReservation = () => {
  const { bookValues, setBookValues, allDocs, user, freshData, setFreshData } =
    useContext(applicationContext);
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
  const [selectedTourDate, setSelectedTourDate] = useState(null);
  const [availableDates, setAvailableDates] = useState([]);
  const today = new Date();
  const weekFromNow = new Date();
  weekFromNow.setDate(today.getDate() + 7);
  const filteredDates = availableDates[0]
    ? availableDates
        .sort((a, b) => moment(a) - moment(b))
        .filter((date) => moment(date) > moment(today))
        .filter((date, index, dates) => dates.indexOf(date) === index)
    : [];
  const [success, setSuccess] = useState(false);
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const selectedBoat = allDocs?.filter((e) => e.data.boat === bookValues.boat);

  const selectedTour = selectedBoat?.filter(
    (e) => e.data.date === bookValues.date
  );
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
    const tour = selectedTour
    const tourRef = doc(db, "tours", tour[0].id);
    const random = Math.floor(Math.random() * 1000000000);
    // let PRICE = bookValues.boat === 'turtle-boat' ? 
    setTicketInfo({
      ...ticketInfo,
      boat: bookValues.boat,
      date: bookValues.date,
      numberOfPassengers: values.numberOfPassengers,
      roomNumber: values.roomNumber,
      children: values.children,
      preteens: values.preteens,
    });
    console.log(ticketInfoHandler(ticketInfo, values));
    updateDoc(tourRef, {
      availableSeats:
        tour[0].data.availableSeats -
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
        // ticketPrice: values.numberOfPassengers*PRICE+values.preteens*PRICE/2 
      }),
    });
    setBookValues({
      ...bookValues,
      boat: "",
      date: "",
      time: "",
    });
    resetForm();
    setSuccess(true);
    setFreshData(!freshData);
    setSelectedTourDate(null);
  };

  return (
    <div className="div-WrapperReservation">
      <ChooseBoat setAvailableDates={setAvailableDates} />
      <h4 className="tour-title">
        Select a date to continue <span>*</span>
      </h4>
      <div className="dateWrapper">
        <div className="dateWrapperScroll">
          {(
            !filteredDates[0]
              ? null
              : new Date(filteredDates[0]).getTime() > weekFromNow.getTime()
          ) ? (
            <>
              <p>There are no tours for this</p>
              <p>boat during this week.</p>
            </>
          ) : (
            filteredDates.map((date, i) => {
              const hour = new Date(date).getHours()
              return (
                <div
                  className={selectedTourDate === date ? "selected" : ""}
                  key={i}
                  ref={formRef}
                  onClick={() => {
                    setBookValues({
                      ...bookValues,
                      date: date,
                    });
                    setSelectedTourDate(date);
                    setTimeout(() => {
                      formRef.current.scrollIntoView({ behavior: "smooth" });
                    }, 0);
                  }}
                >
                  {console.log(hour)}
                  <p
                  style={{color: hour >= 19 && hour < 22 ? 'orange' : hour >= 22 || hour < 4 ? 'purple' : 'yellow' }}
                  >{dayjs(new Date(date)).format("ddd DD-MM HH:mm")}</p>
                </div>
              );
            })
          )}
        </div>
      </div>
      <h4 className="tour-title">
        Select a tour to continue <span>*</span>
      </h4>
      {selectedTour[0] && (
        <Formik
          initialValues={reservationInfo}
          validationSchema={() => validationSchema(selectedTour[0])}
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
