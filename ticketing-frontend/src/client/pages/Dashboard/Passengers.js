import React, { useState } from 'react'
import Grid from "@mui/material/Grid"
const Passengers = ({infantCount, setInfantCount, childCount, setChildCount, adultCount, setAdultCount}) => {
    

  return (
    <div className="width-wrap-passenger">
        <Grid container className="passenger-wrapper">
            <Grid item xs={12} align="left" className="">
                <h3 className="title-passenger">Passengers</h3>
                {/* Adult */}
                <Grid item xs={12} justifyContent="space-between" display="flex" alignSelf="center">
                    <Grid item>
                        <h3 className="title-passenger-type">Adult</h3>
                        <p className="subtitle-passenger-type">12 years and above</p>
                    </Grid>
                    <Grid item>
                        <button className="minus-btn" onClick={() => setAdultCount(adultCount - 1)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
                                <circle cx="7.5" cy="7.5" r="7.5" fill="#D9D9D9"/>
                                <path d="M4 8H11" stroke="black" stroke-linecap="round"/>
                            </svg>
                        </button>
                        <span className="incremented-value">{adultCount}</span>
                        <button className="add-btn" onClick={() => setAdultCount(adultCount + 1)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
                                <circle cx="7.5" cy="7.5" r="7.5" fill="url(#paint0_linear_422_1471)"/>
                                <path d="M4 7.75H11.5" stroke="white" stroke-linecap="round"/>
                                <path d="M7.75 4L7.75 11.5" stroke="white" stroke-linecap="round"/>
                                <defs>
                                    <linearGradient id="paint0_linear_422_1471" x1="7.5" y1="0" x2="7.5" y2="15" gradientUnits="userSpaceOnUse">
                                    <stop stop-color="#D4A84A"/>
                                    <stop offset="1" stop-color="#E4BF61"/>
                                    </linearGradient>
                                </defs>
                            </svg>
                        </button>
                    </Grid>
                </Grid>
                {/* Child */}
                <Grid item xs={12} justifyContent="space-between" display="flex" alignSelf="center" marginTop="10px">
                    <Grid item>
                        <h3 className="title-passenger-type">Child</h3>
                        <p className="subtitle-passenger-type">2 to 11 years</p>
                    </Grid>
                    <Grid item>
                        <button className="minus-btn" onClick={() => setChildCount(childCount - 1)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
                                <circle cx="7.5" cy="7.5" r="7.5" fill="#D9D9D9"/>
                                <path d="M4 8H11" stroke="black" stroke-linecap="round"/>
                            </svg>
                        </button>
                        <span className="incremented-value">{childCount}</span>
                        <button className="add-btn" onClick={() => setChildCount(childCount + 1)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
                                <circle cx="7.5" cy="7.5" r="7.5" fill="url(#paint0_linear_422_1471)"/>
                                <path d="M4 7.75H11.5" stroke="white" stroke-linecap="round"/>
                                <path d="M7.75 4L7.75 11.5" stroke="white" stroke-linecap="round"/>
                                <defs>
                                    <linearGradient id="paint0_linear_422_1471" x1="7.5" y1="0" x2="7.5" y2="15" gradientUnits="userSpaceOnUse">
                                    <stop stop-color="#D4A84A"/>
                                    <stop offset="1" stop-color="#E4BF61"/>
                                    </linearGradient>
                                </defs>
                            </svg>
                        </button>
                    </Grid>
                </Grid>
                {/* Infant */}
                <Grid item xs={12} justifyContent="space-between" display="flex" alignSelf="center" marginTop="10px">
                    <Grid item>
                        <h3 className="title-passenger-type">Infant</h3>
                        <p className="subtitle-passenger-type">under 2 years</p>
                    </Grid>
                    <Grid item>
                        <button className="minus-btn" onClick={() => setInfantCount(infantCount - 1)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
                                <circle cx="7.5" cy="7.5" r="7.5" fill="#D9D9D9"/>
                                <path d="M4 8H11" stroke="black" stroke-linecap="round"/>
                            </svg>
                        </button>
                        <span className="incremented-value">{infantCount}</span>
                        <button className="add-btn" onClick={() => setInfantCount(infantCount + 1)}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
                                <circle cx="7.5" cy="7.5" r="7.5" fill="url(#paint0_linear_422_1471)"/>
                                <path d="M4 7.75H11.5" stroke="white" stroke-linecap="round"/>
                                <path d="M7.75 4L7.75 11.5" stroke="white" stroke-linecap="round"/>
                                <defs>
                                    <linearGradient id="paint0_linear_422_1471" x1="7.5" y1="0" x2="7.5" y2="15" gradientUnits="userSpaceOnUse">
                                    <stop stop-color="#D4A84A"/>
                                    <stop offset="1" stop-color="#E4BF61"/>
                                    </linearGradient>
                                </defs>
                            </svg>
                        </button>
                    </Grid>
                </Grid>
                <Grid item align="center">
                    <button className="btn-passenger">Ok</button>
                </Grid>
            </Grid>
        </Grid>
    </div>
  )
}

export default Passengers