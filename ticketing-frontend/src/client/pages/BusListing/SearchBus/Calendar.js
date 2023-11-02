import React, { useEffect, useState } from 'react';
import SwiperCore, { Navigation } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.min.css';
import Grid from "@mui/material/Grid"

SwiperCore.use([Navigation]);

const CalendarSlider = () => {
  const today = new Date();
  const numberOfDays = 14; // Number of days to display

  const [dates, setDates] = useState([]);

  useEffect(() => {
    const newDates = Array.from({ length: numberOfDays }, (_, index) => {
      const currentDate = new Date(today);
      currentDate.setDate(today.getDate() + index - 5);

      const dayOfWeek = currentDate.toLocaleString('en-US', { weekday: 'short' });
      const dayOfMonth = currentDate.getDate();
      const month = currentDate.toLocaleString('default', { month: 'short' });

      const dateClassName = currentDate < today ? 'calendar-block disabled-date' : 'calendar-block colored-dates';
        
      return {
        key: `${dayOfMonth}-${month}`,
        date: `${dayOfWeek} ${dayOfMonth} ${month}`,
        selected: false,
        className: dateClassName,
      };
    });

    setDates(newDates);
  }, []);

  const handleDateClick = (clickedDate) => {
    const tempDates = [...dates];
    const clickedIndex = tempDates.findIndex(date => date.date === clickedDate);
    
    if (clickedIndex !== -1 && tempDates[clickedIndex].className !== 'calendar-block disabled-date') {
      for (let i = 0; i < tempDates.length; i++) {
        tempDates[i].selected = false;
      }
      tempDates[clickedIndex].selected = true;
      setDates(tempDates);
    }
  };

  return (
    <Grid item xs={12} align="center" className="border-wrap">
      <p className="date-selection-title">Select A Date</p>
      <Swiper
        spaceBetween={10}
        slidesPerView={7}
        navigation
      >
        {dates.map(date => {
            let tempDateSplit = date.date.split(" ")
            return (
          <SwiperSlide key={date.key}>
            <div
              className={date.selected ? 'calendar-block selected-date' : date.className}
              onClick={() => handleDateClick(date.date)}
            >
                <div className="day-of-week">
                    {tempDateSplit[0]}
                </div>
                <div className="day-of-month">
                    {tempDateSplit[1]}{" "}{tempDateSplit[2]}
                </div>
                <div className="month">
                    From <span>SAR 159</span>.00
                </div>
            </div>
          </SwiperSlide>
        )})}
      </Swiper>
    </Grid>
  );
};

export default CalendarSlider;
