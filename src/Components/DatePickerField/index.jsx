import React from 'react'
import './date-picker-field.scss'
import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";

const DatePickerField = ({name, value, onChange}) => {

  return (
    <div>
        <DatePicker
      multiple
      value={value}
      minDate={new Date()}
      onChange={(e)=> console.log(value) ||
        onChange('date', e)}
        plugins={[
          <TimePicker position="bottom" hStep={1} mStep={30} hideSeconds/>,
        ]}
      
      />

    </div>
  )
}

export default DatePickerField