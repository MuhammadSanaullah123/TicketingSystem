import React from 'react'
import HeaderComponent from '../../../mainLayout/Header/HeaderComponent'
import CardServices from "./../../Dashboard/CardServices"
const VisaService = () => {
  return (
    <>
        {/* <CardServices title={"Visa Service"}/>
         */}
           <div className='topCardServices'>
         <HeaderComponent title={"Visa Service"}/>
         <CardServices/>
         </div>
    
    </>
  )
}

export default VisaService