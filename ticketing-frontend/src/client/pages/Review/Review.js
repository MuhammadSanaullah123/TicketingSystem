import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
// import { withRouter } from "react-router";
import { addReviews } from "../../../Redux/userReducer";
import {  useSelector } from "react-redux";

//scss
import "./Review.scss";

//mui
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Rating from '@mui/material/Rating';
import { useDispatch } from "react-redux";
import userEvent from "@testing-library/user-event";
const Review = (props) => {


  const busId=props.location.state._id;
  const operatorId=props.location.state.operatorId._id;


// console.log("busData",busData1)

 
  
  const busData = useSelector(
    (state) => state?.userReducer?.singleBusDetail?.busDetails
  );
  const dispatch=useDispatch();
  
  const[rating2,setRating]=useState({
    review:0,
    rating:""
  })

  console.log("rating1",rating2)
  const handleChange=(e)=>{
    const{name,value}=e.target;
    setRating({...rating2,[name]:value})

  }

  const submitReviewClicked=()=>{

    const data={
      busId:busId,
      review:rating2.review,
      rating:rating2.rating,
      operatorId:operatorId,

    }


    dispatch(addReviews(data))


  }

  console.log("busData123",busData)
  
  return (
    <>
      <Grid container className="ReviewWrapper">
        <Grid item xs={12} className="ReviewContainer" display="flex" justifyContent="center">
          <Grid item xs={11} className="bgGrey">
            <Grid container justifyContent="center">
              <Grid item xl={8} lg={7} md={8} sm={10} xs={12} align="center" className="title">
                <p>Please Rate and Review Our Service</p>
              </Grid>
              
              <Grid item xl={7} lg={7} md={8} sm={10} xs={12} align="left" className="" sx={{margin:'20px 0'}}>
                <p style={{fontWeight: 500, fontSize:'25px'}}>Customer Service</p>
                <Rating name="rating" value={rating2.rating} onChange={handleChange} />
              </Grid>
             
              <Grid item xl={7} lg={7} md={8} sm={10} xs={12} className="emailConfirm" align="left" sx={{margin:'20px 0'}}>
                <p>Any constructive criticism is highly appreciated </p>
                <TextField style={{margin:'30px 0'}} id="outlined-basic" value={rating2.review} name="review" onChange={handleChange}type="text" label="Review" variant="outlined" />
              </Grid>
               
              <Grid item xl={7} lg={7} md={8} sm={10} xs={12} className="emailConfirm" align="left" sx={{margin:'20px 0'}}>
              <button className="submitReview"
              
              onClick={submitReviewClicked}
              >Submit Review</button>
              </Grid>
              
           
            </Grid>  
         
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default Review;
