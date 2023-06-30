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
  const { setFreshData, freshData } = useContext(applicationContext);
  const tourRef = useRef(null);
  const defaultValue = {
    boat: "",
    startDate: "",
    endDate: "",
    date: "",
    available_seats: 50,
    hours: 0,
    minutes: 0,
    // sunset_clock: "18:00",
    // daytime_clock: "16:00",
    // night_clock: "20:00",
  };
  const plusHoursCount = (setFieldValue, values) => {
    if (values.hours === 23) {
      setFieldValue("hours", values.hours = 0);
    }
    else {
      setFieldValue("hours", values.hours+1 )
    }
  };
  const minusHoursCount = (setFieldValue, values) => {
    if (values.hours === 0) {
      setFieldValue("hours", values.hours = 23);
    }
    else {
      setFieldValue("hours", values.hours-1 )
    }
  };
  const plusMinutesCount = (setFieldValue, values) => {
    if (values.minutes >= 45) {
      setFieldValue("minutes", values.minutes = 0);
    }
    else {
      setFieldValue("minutes", values.minutes+15)
    }
  };
  const minusMinutesCount = (setFieldValue, values) => {
    if (values.minutes <= 15) {
      setFieldValue("minutes", values.minutes = 45);
    }
    else {
      setFieldValue("minutes", values.minutes-15 )
    }
}

  const validationSchema = yup.object().shape({
    boat: yup.string().required("Select a boat"),
    date: yup.array().required("Please insert a date"),
    available_seats: yup
      .number()
      .required("Enter available seats")
      .min(1, "One seat minimum"),
    hours: yup
      .number()
      .max(23, 'dont be a moron')
      .min(0),
    minutes: yup
      .number()
      .max(59, 'dont be a moron')
      .min(0)
      // .min(1, "Select at least one time of day option")
      // .of(yup.string().required())
      // .required(),
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
    dateRange.forEach((singleDate) => {
        addDoc(collection(db, "tours"), {
          boat: values.boat,
          date: `${singleDate} ${values.hours}:${values.minutes}`,
          availableSeats:
            values.boat === "key-boat" || "open-bus"
              ? 120
              : values.boat === "turtle-boat"
              ? 45
              : 38,
          // daytime_clock:
          //   singleTime === "daytime"
          //     ? values.daytime_clock
          //     : "this is not daytime tour",
          // sunset_clock:
          //   singleTime === "sunset"
          //     ? values.sunset_clock
          //     : "this is not sunset tour",
          // night_clock:
          //   singleTime === "night"
          //     ? values.night_clock
          //     : "this is not night tour",

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
              <label>
                Open Bus
                <Field type="radio" name="boat" value="open-bus" />
              </label>
              <p className="error-handle">
                <ErrorMessage name="boat" />
              </p>
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
              {/* <label>
                Daytime
                <Field type="checkbox" name="time" value="daytime" />
              </label>
              <div className="clock-inputs">
                <label>
                  15:30h
                  <Field type="radio" name="daytime_clock" value="15:30h " />
                </label>
                <label>
                  16:00h
                  <Field type="radio" name="daytime_clock" value="16:00h" />
                </label>
                <label>
                  16:30h
                  <Field type="radio" name="daytime_clock" value="16:30h" />
                </label>
              </div>

              <label>
                Sunset
                <Field type="checkbox" name="time" value="sunset" />
              </label>
              <div className="clock-inputs">
                <label>
                  17:30h
                  <Field type="radio" name="sunset_clock" value="17:30h " />
                </label>
                <label>
                  18:00h
                  <Field type="radio" name="sunset_clock" value="18:00h" />
                </label>
                <label>
                  18:30h
                  <Field type="radio" name="sunset_clock" value="18:30h" />
                </label>
              </div>
              <label>
                Night
                <Field type="checkbox" name="time" value="night" />
              </label>
              <div className="clock-inputs">
                <label>
                  19:30h
                  <Field type="radio" name="night_clock" value="19:30h" />
                </label>
                <label>
                  20:00h
                  <Field type="radio" name="night_clock" value="20:00h" />
                </label>
                <label>
                  20:30h
                  <Field type="radio" name="night_clock" value="20:30h" />
                </label>
              </div>
              <p className="error-handle">
                <ErrorMessage name="time" />
              </p> */}
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
