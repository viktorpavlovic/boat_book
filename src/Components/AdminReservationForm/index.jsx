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
  const defaultValue = {
    boat: "",
    startDate: "",
    endDate: "",
    date: "",
    available_seats: 50,
    hours: 0,
    minutes: 0,
  };
  const plusHoursCount = (setFieldValue, values) => {
    if (values.hours === 23) {
      setFieldValue("hours", (values.hours = 0));
    } else {
      setFieldValue("hours", values.hours + 1);
    }
  };
  const minusHoursCount = (setFieldValue, values) => {
    if (values.hours === 0) {
      setFieldValue("hours", (values.hours = 23));
    } else {
      setFieldValue("hours", values.hours - 1);
    }
  };
  const plusMinutesCount = (setFieldValue, values) => {
    if (values.minutes >= 45) {
      setFieldValue("minutes", (values.minutes = 0));
    } else {
      setFieldValue("minutes", values.minutes + 15);
    }
  };
  const minusMinutesCount = (setFieldValue, values) => {
    if (values.minutes <= 15) {
      setFieldValue("minutes", (values.minutes = 45));
    } else {
      setFieldValue("minutes", values.minutes - 15);
    }
  };

  const validationSchema = yup.object().shape({
    boat: yup.string().required("Select a boat"),
    date: yup.array().required("Please insert a date"),
    available_seats: yup
      .number()
      .required("Enter available seats")
      .min(1, "One seat minimum"),
    hours: yup.number().max(23, "dont be a moron").min(0),
    minutes: yup.number().max(59, "dont be a moron").min(0),
  });
  const getDates = (datesArray) => {
    let dates = [];
    datesArray.forEach((date) => {
      dates.push(dayjs(date).format("YYYY-MM-DD"));
    });
    return dates;
  };
  
  const handleAdd = (values, { resetForm }) => {
    const dateRange = getDates(values.date);
    const selectedRide = rides.find((e) => e.data.name === values.boat);
    dateRange.forEach((singleDate) => {
      addDoc(collection(db, "tours"), {
        boat: values.boat,
        date: `${singleDate} ${values.hours}:${values.minutes}`,
        availableSeats: selectedRide.data.totalSeats,
        reservations: [],
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
              <p className="error-handle">
                <ErrorMessage name="date" />
              </p>
              <h4>Choose time for tour</h4>
              <div className="time-picker-div">
                <div>
                  <button
                    type="button"
                    onClick={() => plusHoursCount(setFieldValue, values)}
                  >
                    +
                  </button>
                  <button
                    type="button"
                    onClick={() => minusHoursCount(setFieldValue, values)}
                  >
                    -
                  </button>
                </div>
                {/* <select name="hours" id="hours" >
                  {hours.map((e)=> <option value={e}>
                    {e}
                  </option>
                  )}
                </select> */}
                <Field type="number" name="hours" placeholder="00" />
                <p>:</p>
                <Field type="number" name="minutes" placeholder="00" />
                <div>
                  <button
                    type="button"
                    onClick={() => plusMinutesCount(setFieldValue, values)}
                  >
                    +
                  </button>
                  <button
                    type="button"
                    onClick={() => minusMinutesCount(setFieldValue, values)}
                  >
                    -
                  </button>
                </div>
              </div>
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
