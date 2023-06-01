import React from 'react'
import "./footer.scss" 

const Footer = () => {
  return (
    <div className='div-footer'>
      <span>For more info about tours visit:</span>  <a
        href="https://www.cruisebelgrade.com/"
        target="_blank"
        // className="submit-btn book" 
        rel="noreferrer"
      >
        Cruise Belgrade
      </a>   
      </div>
  )
}

export default Footer