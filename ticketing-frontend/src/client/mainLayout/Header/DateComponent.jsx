import React,{useRef,useState,useEffect,useLayoutEffect} from 'react'
// import { DatePicker } from '@mui/x-date-pickers';
import moment from "moment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const DateComponent = (props) => {
    const [startDate, setStartDate] = useState(new Date());
    const [size, setSize] = useState([0, 0]);
    const dateRef = useRef();
    const [navBarFixed, setNavBarFixed] = useState(false);

    // useEffect(() => {
     
    //     if (props.showFrom === 3) {
    //       dateRef.current.focus();
    //     }
    //   }, [props.showFrom]);


    const handleChange=(date)=>{
      props.setDateForword(date)
            
      let date1=moment(date).format("YYYY-MM-DD");
        props.setShowFrom1(4);
        setStartDate(date)
        props.setDate(date1)
        // console.log("changed value",props.showFrom)
    }

    function useWindowSize() {
      
        useLayoutEffect(() => {
          function updateSize() {
            setSize([window.innerWidth, window.innerHeight]);
          }
          window.addEventListener('resize', updateSize);
          updateSize();
          return () => window.removeEventListener('resize', updateSize);
        }, []);
        return size;
      }

      useWindowSize();
      const changeBackground = () => {
        if (window.scrollY >= 200) {
          setNavBarFixed(true);
        } else {
          setNavBarFixed(false);
        }
      };
      window.addEventListener("scroll", changeBackground);

      console.log("size",size[0])
  

      console.log("startDate",startDate)
      
      let date=moment(startDate).format("YYYY-MM-DD");
      console.log("momentDate",date)


  return (
    <>
     <DatePicker
    //  ref={dateRef}
    className='topInnerDivDateComp'
     popperPlacement={size[0]<992 || navBarFixed ?"bottom":"right"}	
    //  popperPlacement='bottom'	

      renderCustomHeader={({
        monthDate,
        
        customHeaderCount,
        decreaseMonth,
        increaseMonth,
      }) => (
        <div  className='topInnerDivDateComp'>
          <button
            aria-label="Previous Month"
            className={
              "react-datepicker__navigation react-datepicker__navigation--previous topInnerDivDateComp"
            }
            style={customHeaderCount === 1 ? { visibility: "hidden" } : null}
            onClick={decreaseMonth}
          >
            <span
              className={
                "react-datepicker__navigation-icon react-datepicker__navigation-icon--previous topInnerDivDateComp"
              }
            >
              {"<"}
            </span>
          </button>
          <span className="react-datepicker__current-month topInnerDivDateComp" >
            {monthDate.toLocaleString("en-US", {
              month: "long",
              year: "numeric",
            })}
          </span>
          <button
            aria-label="Next Month"
            className={
              "react-datepicker__navigation react-datepicker__navigation--next topInnerDivDateComp"
            }
            style={customHeaderCount === 0 ? { visibility: "hidden" } : null}
            onClick={increaseMonth}
          >
            <span
              className={
                "react-datepicker__navigation-icon react-datepicker__navigation-icon--next"
              }
            >
              {">"}
            </span>
          </button>
        </div>
      )}
      selected={startDate}
      onChange={(date) => handleChange(date)}
      monthsShown={2}
    />
    </>
  )
}

export default DateComponent