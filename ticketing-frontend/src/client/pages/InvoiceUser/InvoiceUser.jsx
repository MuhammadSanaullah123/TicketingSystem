import dayjs from "dayjs";
import { useParams } from "react-router";
import ReactToPrint from "react-to-print";
import React, { useContext, useRef, useCallback, useState, useEffect } from "react";
import { FiPrinter } from "react-icons/fi";
import QRCode from "react-qr-code";
import "./InvoiceUser.css";
import { IoCloudDownloadOutline } from "react-icons/io5";
import {
  TableCell,
  TableHeader,
  Table,
  TableContainer,
  WindmillContext,
} from "@windmill/react-ui";
import { PDFDownloadLink } from "@react-pdf/renderer";
import Cookies from "universal-cookie";
// MUI
import Grid from "@mui/material/Grid"
// import Status from '../components/table/Status';
import Status from "../../../admin/components/table/Status";
// import Invoice from '../components/invoice/Invoice';
import Invoice from "../../../admin/components/invoice/Invoice";
// import logoDark from '../assets/img/logo/logo-dark.svg';
// import logoDark from './../../../admin/assets/img/logo/logoDark.svg'
// import logoLight from './../admin/assets/img/logo/logo-light.svg';
// import PageTitle from '../components/Typography/PageTitle';
import PageTitle from "../../../operator/components/Typography/PageTitle";
import { useSelector, useDispatch } from "react-redux";
// API
import { bookingBySearch } from "../../../Redux/userReducer"

const InvoiceUser = () => {
  const [bookingData, setBookingData] = useState()

  const dispatch = useDispatch()
  const { mode } = useContext(WindmillContext);
  const { id } = useParams();
  const printRef = useRef();
  const cookies = new Cookies();

  // Redux
  const searchedData = useSelector((state) => state?.userReducer?.searchDataH2);
  const bookingId = useSelector((state) => state?.userReducer?.bookingId);
  const priceData = useSelector((state) => state?.userReducer?.priceDataH2);
  
  console.log("bookingIdbookingId", bookingId);
  
  let result = bookingId;

  console.log("bookingIdbookingId", result, priceData);
  const isLogin = cookies.get("token");

  const QRData = {
    bookingId: bookingId,
    fareAmount: priceData.fareAmount,
    noOfSeats: priceData.passengerNumber,
    departureCity: priceData.departureCity,
    arrivalCity: priceData.arrivalCity,
    departureTime: priceData.departure,
    arrivalTime: priceData.arrival,
    date: priceData.date,
  };

  // If bookingID is successfully received
  useEffect(() => {
      const getBookingFunction = async () => {
        // Get Booking By ID
        console.log(bookingId)
        const response = await dispatch(bookingBySearch(bookingId)) 
        setBookingData(response.payload)

      }
      getBookingFunction()
  },[])
    
  console.log(bookingData)
  
  return (
    <>
      <div className="mainContainerInvoice">
        <div className="mainContainerInvoiceInner">
          <div
            ref={printRef}
            className="bg-white mb-4 p-6 lg:p-8 rounded-xl shadow-sm overflow-hidden invoicPrintable"
          >
            <Grid container className="" marginTop="50px">
              <Grid item xs={12} display="flex" justifyContent="center">
                <Grid container xs={11} justifyContent="space-between">
                  <Grid item xs={12}>
                    <p className="travel-itinerary-main">Travel Itinerary</p>
                  </Grid>
                  
                  <Grid item>
                    <div className="flex lg:flex-row md:flex-row flex-col lg:items-center justify-between pb-4 border-b border-gray-50">
                      <h1 className="title-travel-status">
                        Travel Itinerary
                        <p className="text-xs mt-1 text-gray-500 status-title">
                          Status:{" "}
                          <span className="pl-2 font-medium text-xs capitalize">
                            {" "}
                            <Status status={"Confirmed"} />
                          </span>
                        </p>
                        <div>
                          <QRCode
                            value={JSON.stringify(QRData)}
                            level="M"
                            size={150}
                          />
                        </div>
                      </h1>
                      <div className="lg:text-right text-left">
                        
                        <p className="travel-deadline">
                          {searchedData?.to} to {searchedData?.from}
                          <br /> in 5 hours
                        </p>
                        
                      </div>
                    </div>  
                  </Grid>

                  <Grid item>
                    <div className="flex lg:flex-row md:flex-row flex-col justify-between">
                      <div className="mb-3 md:mb-0 lg:mb-0 flex flex-col">
                        <span className="date-title">
                          Date<br/>
                        </span>
                        <span className="text-details-invoice">
                          {bookingData !== undefined && (
                          <span>
                            {dayjs(bookingData?.createdAt).format('MMMM D, YYYY')}
                          </span>
                          )}
                        </span>
                      </div>
                      <div className="mb-3 md:mb-0 lg:mb-0 flex flex-col">
                        <span className="date-title">
                          Travel Itinerary No <br />
                        </span>
                        <span className="text-details-invoice">
                          {result}
                        </span>
                      </div>
                      <div className="flex flex-col lg:text-right text-left">
                        <span className="date-title">
                          Travel Itinerary for <br/>
                        </span>
                        <span className="text-details-invoice">
                          {bookingData?.passengerDetails[0]?.firstName}
                          {" "}
                          {bookingData?.passengerDetails[0]?.lastName}
                          <br />
                          {/* {bookingData?.passengerDetails[0]?.address.substring(0, 25)} */}
                          Chorangi No 4
                          <br />
                          {/* {data.city}, {data.country}, {data.zipCode} */}
                          Karachi, Pakistan, 66000
                        </span>
                      </div>
                    </div>
                  </Grid>

                  <Grid item>
                    <div>
                      <p className="" style={{fontSize: '20px', fontWeight: 600, marginBottom: '10px'}}>{"Seat Number: "} 
                        {bookingData?.seats.length > 1 ? 
                          bookingData?.seats.map((seatNo, index) => (
                            <span key={index} style={{fontWeight: 600, color:'#BE892A'}}>
                              {seatNo}
                              {index !== bookingData?.seats.length - 1 && " & "}
                            </span>
                          ))
                        : bookingData?.seats[0]}
                      </p>
                    </div>
                    <div className="border-payment">
                      <div className="flex lg:flex-row md:flex-row flex-col justify-between">
                        <div className="mb-3 md:mb-0 lg:mb-0  flex flex-col sm:flex-wrap">
                          <span className="date-title">
                            Payment Method <br/>
                          </span>
                          <span className="text-details-invoice">
                            {/* {data.paymentMethod} */}
                            Credit
                          </span>
                        </div>
                        <div className="mb-3 md:mb-0 lg:mb-0  flex flex-col sm:flex-wrap">
                          <span className="date-title">
                            Fare <br/>
                          </span>
                          <span className="text-details-invoice">
                            ${Math.round(bookingData?.price)}.00
                            
                          </span>
                        </div>
                        <div className="mb-3 md:mb-0 lg:mb-0  flex flex-col sm:flex-wrap">
                          <span className="date-title">
                            Discount <br/>
                          </span>
                          <span className="text-details-invoice">
                            {/* ${Math.round(10.93)}.00 */}
                            00.00
                          </span>
                        </div>
                        <div className="flex flex-col sm:flex-wrap">
                          <span className="date-title">
                            Total Amount Paid <br/>
                          </span>
                          <span className="text-details-invoice">
                            ${Math.round(bookingData?.price)}.00

                            {/* {priceData?.fareAmount} */}
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="mb-4 mt-3 flex justify-between topButtonInvoice">
                      <PDFDownloadLink
                        // document={<InvoiceForDownload data={data} />}
                        fileName="Invoice"
                      >
              
                        <button className="flex items-center text-sm leading-5 transition-colors duration-150 font-medium focus:outline-none px-5 py-2 rounded-md text-white bg-green-500 border border-transparent active:bg-green-600 hover:bg-green-600 focus:ring focus:ring-purple-300 w-auto cursor-pointer">
                          Download Travel itinerary{" "}
                          <span className="ml-2 text-base">
                            <IoCloudDownloadOutline />
                          </span>
                        </button>
                      </PDFDownloadLink>

                      <ReactToPrint
                        trigger={() => (
                          <button
                            className="flex items-center text-sm leading-5 transition-colors duration-150 font-medium focus:outline-none px-5 py-2 rounded-md text-white bg-green-500 border border-transparent active:bg-green-600 hover:bg-green-600 focus:ring focus:ring-purple-300 w-auto  printInvoiceBtn"
                            style={{ marginLeft: "24px" }}
                          >
                            Print or Save Travel Itinerary{" "}
                            <span className="ml-2">
                              <FiPrinter />
                            </span>
                          </button>
                        )}
                        content={() => printRef.current}
                        documentTitle="Invoice"
                      />
                    </div>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>  
          </div>
        </div>
      </div>
    </>
  );
};

export default InvoiceUser;
