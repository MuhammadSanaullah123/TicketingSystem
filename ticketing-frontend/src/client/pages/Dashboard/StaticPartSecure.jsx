import React from 'react'
//mui
import Grid from '@mui/material/Grid'
//scss
import "./Dashboard.scss"
//react icons
import {AiFillHeart} from 'react-icons/ai'
import {FaRoad, FaDollarSign, FaPercentage, FaSearch, FaLock} from 'react-icons/fa'
import {ImCross} from 'react-icons/im'

const StaticPartSecure = () => {
  return (
    <>
     <Grid item xs={12} className="belowSection">
            <Grid item xs={11} className="lastSectionWrapper">
                <Grid container className='aboveFooter' align="center">
                    <Grid item xl={3} lg={3} md={3} sm={12} xs={12} className="Card">
                        <Grid item xs={12} className="icon" align="center"><FaLock style={{color:'#c99a3c', fontSize:'30px'}}/></Grid>
                        <Grid item xs={12} className="content">
                            <h5 className='heading'>100% Secure Payments</h5>
                            <p className='desc'>Moving your card details to a much more secured place.</p>
                        </Grid>
                    </Grid>
                    <Grid item xl={3} lg={3} md={3} sm={12} xs={12} className="Card">
                        <Grid item xs={2} className="icon" align="center"><FaSearch style={{color:'#c99a3c', fontSize:'30px'}}/></Grid>
                        <Grid item xs={10} className="content">
                            <h5 className='heading'>Trust pay</h5>
                            <p className='desc'>100% Payment Protection. Easy Return Policy. </p>
                        </Grid>
                    </Grid>
                    <Grid item xl={3} lg={3} md={3} sm={12} xs={12} className="Card">
                        <Grid item xs={2} className="icon" align="center"><FaPercentage style={{color:'#c99a3c', fontSize:'28px'}} /></Grid>
                        <Grid item xs={10} className="content">
                            <h5 className='heading'>Refer & Earn</h5>
                            <p className='desc'>Invite a friend to sign up and earn up to $100.</p>
                        </Grid>
                    </Grid>
                    <Grid item xl={3} lg={3} md={3} sm={12} xs={12} className="Card">
                        <Grid item xs={2} className="icon" align="center"><FaRoad style={{color:'#c99a3c', fontSize:'30px'}}/></Grid>
                        <Grid item xs={10} className="content">
                            <h5 className='heading'>24X7 Support</h5>
                            <p className='desc'>We're here to help. Have a query and need help ? </p>
                        </Grid>
                    </Grid>           
                </Grid>
            </Grid>
        </Grid>
    </>
  )
}

export default StaticPartSecure