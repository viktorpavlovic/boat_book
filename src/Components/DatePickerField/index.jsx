import React from 'react'
import './date-picker-field.scss'
import DatePicker from "react-multi-date-picker";

const DatePickerField = ({name,value,onChange}) => {
    
  return (
    <div>
        <DatePicker
      multiple
      value={value}
      minDate={new Date()}
      onChange={(e)=>
        onChange('date', e)}
      />
    </div>
  )
}

export default DatePickerField