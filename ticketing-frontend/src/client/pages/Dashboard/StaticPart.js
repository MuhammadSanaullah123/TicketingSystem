import React from 'react'
//mui
import Grid from '@mui/material/Grid'
//scss
import "./Dashboard.scss"
//react icons
import {AiFillHeart} from 'react-icons/ai'
import {FaRoad, FaDollarSign, FaPercentage, FaSearch, FaLock} from 'react-icons/fa'
import {ImCross} from 'react-icons/im'
import StaticPartSecure from './StaticPartSecure'

const StaticPart = () => {
  return (
    <Grid container className="staticContainer">
        <Grid item xs={12} className="staticWrapper">
            <Grid item xs={10} className="SectionsWrapper">
                <Grid item xs={12} className="sectionHeading" textAlign="center">
                    <h2>Why Book Bus with Non Redbus</h2>
                    <p className='subHeading'>Book Bus Tickets Online. Save Time and Money</p>
                </Grid>
                <Grid container className='prosWrapper'>
                    <Grid item xl={4} lg={4} md={4} sm={12} xs={12} className="Card">
                        <Grid item xs={2} className="icon" align="center"><FaDollarSign style={{color:'black', fontSize:'30px'}}/></Grid>
                        <Grid item xs={10} className="content">
                            <h5 className='heading'>No Booking Charges</h5>
                            <p className='desc'>No hidden charges, no payment fees, and free customer service. So you get the best deal every time!</p>
                        </Grid>
                    </Grid>
                    <Grid item xl={4} lg={4} md={4} sm={12} xs={12} className="Card">
                        <Grid item xs={2} className="icon" align="center"><FaSearch style={{color:'black', fontSize:'30px'}}/></Grid>
                        <Grid item xs={10} className="content">
                            <h5 className='heading'>Quick and Easy Search</h5>
                            <p className='desc'>We'll find you the best deals available from top bus companies for you to choose from, combining quality and economy. </p>
                        </Grid>
                    </Grid>
                    <Grid item xl={4} lg={4} md={4} sm={12} xs={12} className="Card">
                        <Grid item xs={2} className="icon" align="center"><FaPercentage style={{color:'black', fontSize:'28px'}} /></Grid>
                        <Grid item xs={10} className="content">
                            <h5 className='heading'>Cheapest Price</h5>
                            <p className='desc'>Always get cheapest price with the best in the industry. So you get the best deal every time.</p>
                        </Grid>
                    </Grid>
                    <Grid item xl={4} lg={4} md={4} sm={12} xs={12} className="Card">
                        <Grid item xs={2} className="icon" align="center"><FaRoad style={{color:'black', fontSize:'30px'}}/></Grid>
                        <Grid item xs={10} className="content">
                            <h5 className='heading'>2 Lakh+ Routes</h5>
                            <p className='desc'>Make your road journeys easier across world with 10000+ Operators.</p>
                        </Grid>
                    </Grid>
                    <Grid item xl={4} lg={4} md={4} sm={12} xs={12} className="Card">
                        <Grid item xs={2} className="icon" align="center"><ImCross style={{color:'black', fontSize:'20px'}}/></Grid>
                        <Grid item xs={10} className="content">
                            <h5 className='heading'>Easy Cancellation & Refunds</h5>
                            <p className='desc'>Get instant refund and get any booking fees waived off!</p>
                        </Grid>
                    </Grid>
                    <Grid item xl={4} lg={4} md={4} sm={12} xs={12} className="Card">
                        <Grid item xs={2} className="icon" align="center"><AiFillHeart style={{color:'black', fontSize:'25px'}}/></Grid>
                        <Grid item xs={10} className="content">
                            <h5 className='heading'>Every time, anywhere</h5>
                            <p className='desc'>Because your trip doesn't end with a ticket, we’re here for you all the way</p>
                        </Grid>
                    </Grid>
                </Grid>
                
            </Grid>
        </Grid>
       <StaticPartSecure/>
    </Grid>
  )
}

export default StaticPart