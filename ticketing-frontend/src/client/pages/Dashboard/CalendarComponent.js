import React, { useState, useEffect } from 'react'
import moment from 'moment'
// Mui
import Grid from "@mui/material/Grid"
// React Calendar
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker, createStaticRanges } from 'react-date-range'
import { addDays, endOfDay, startOfDay } from 'date-fns'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';


type ValuePiece = Date | null;
type Value = ValuePiece | [ValuePiece, ValuePiece];
const CalendarComponent = ({departureDate, setDepartureDate, returnDate, setReturnDate}) => {
    type ValuePiece = Date | null;
    type Value = ValuePiece | [ValuePiece, ValuePiece];

    const [state, setState] = useState([
        {
          startDate: new Date(),
          endDate: new Date(),
        },
      ])
    
    const [calendarType, setCalendarType] = useState('Round Trip')
    
    const [value, onChange] = useState(new Date());
  return (
    <div className="width-wrap">
        <Grid container className="calendar-wrapper">
            <Grid item xs={12} align="left" className="">
                <h3 className="title-passenger">Choose Departure Date</h3>
                <Grid item xs={12} align="center" display="flex" justifyContent="center">
                    <div className={`white-oval ${calendarType == 'One Way' ? "selected-trip" : ""}`} onClick={() => setCalendarType('One Way')}>
                        One Way
                    </div>
                    <div className={`white-oval ${calendarType == 'Round Trip' ? "selected-trip" : ""}`} onClick={() => setCalendarType('Round Trip')}>
                        Round Trip
                    </div>
                </Grid>
                <Grid item xs={12}>
                    {calendarType == 'Round Trip' ? 
                        <DateRangePicker
                            onChange={(item) => {
                            console.log(item)
                            setState([item.range1])
                            
                            setDepartureDate(moment(item.range1.startDate).format('DD MMM YY'))
                            
                            setReturnDate(moment(item.range1.endDate).format('DD MMM YY'))
                            }}
                            showSelectionPreview={true}
                            moveRangeOnFirstSelection={false}
                            showDateDisplay={false}
                            setState
                            months={2}
                            color="f6be00"
                            // date={addDays(new Date(), -20)}
                            ranges={state}
                            direction="horizontal"
                            staticRanges={createStaticRanges([
                            {
                                label: 'Today',
                                range: () => ({
                                startDate: startOfDay(new Date()),
                                endDate: endOfDay(new Date()),
                                }),
                            },
                            {
                                label: 'Yesterday',
                                range: () => ({
                                startDate: startOfDay(addDays(new Date(), -1)),
                                endDate: endOfDay(addDays(new Date(), -1)),
                                }),
                            },
                            {
                                label: 'Last 7 Days',
                                range: () => ({
                                startDate: startOfDay(addDays(new Date(), -7)),
                                endDate: endOfDay(new Date()),
                                }),
                            },
                            {
                                label: 'Last 30 Days',
                                range: () => ({
                                startDate: startOfDay(addDays(new Date(), -30)),
                                endDate: endOfDay(new Date()),
                                }),
                            },
                            ])}
                            inputRanges={[]}
                        />
                        :
                        <Calendar onChange={onChange} value={value} />

                    }
                    
                </Grid>
            </Grid>
        </Grid>
    </div>
  )
}

export default CalendarComponent