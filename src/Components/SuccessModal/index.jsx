import React from 'react'
import './successModal.scss'

const SuccessModal = ({setSuccess, ticketInfo}) => {
  return (
    <div className='successModal' onClick={()=>setSuccess(false)}>
        <div onClick={(e)=>e.stopPropagation()}>
            <h4>TICKET INFO HERE</h4>
            <p>{ticketInfo.boat}</p>
            <p>{ticketInfo.date}</p>
            <p>{ticketInfo.numberOfPassengers}</p>
        </div>
    </div>
  )
}

export default SuccessModal