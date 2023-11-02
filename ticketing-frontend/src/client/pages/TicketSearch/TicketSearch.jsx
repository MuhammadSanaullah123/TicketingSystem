import dayjs from "dayjs";
import { useParams } from "react-router";
import ReactToPrint from "react-to-print";
import React, { useContext, useRef } from "react";
import { FiPrinter } from "react-icons/fi";
import QRCode from "react-qr-code";
// import './InvoiceUser.css'
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

import Status from "../../../admin/components/table/Status";

import Invoice from "../../../admin/components/invoice/Invoice";

import PageTitle from "../../../operator/components/Typography/PageTitle";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
const TicketSearch = () => {
  const { mode } = useContext(WindmillContext);
  const { id } = useParams();
  const printRef = useRef();
  const cookies = new Cookies();
  const searchedData = useSelector(
    (state) => state?.userReducer?.bookingBySearchData?.data?.booking
  );
  const bookingId = useSelector((state) => state?.userReducer?.bookingId);
  const priceData = useSelector((state) => state?.userReducer?.priceDataH2);

  const [data, setData] = useState(searchedData);
  console.log("searchedDatasearchedData", data.price);
  let result = bookingId;

  console.log("bookingIdbookingId", result);
  const isLogin = cookies.get("token");
  return (
    <>
      {/* <div className="mainContainerInvoice">
        <div className="mainContainerInvoiceInner">
          <PageTitle>Travel itinerary</PageTitle>

          <div
            ref={printRef}
            className="bg-white mb-4 p-6 lg:p-8 rounded-xl shadow-sm overflow-hidden invoicPrintable"
          >
 
            <div className="">
              <div className="flex lg:flex-row md:flex-row flex-col lg:items-center justify-between pb-4 border-b border-gray-50">
                <h1 className="font-bold font-serif text-xl uppercase">
                  Travel Itinerary
                  <p className="text-xs mt-1 text-gray-500">
                    Status:{" "}
                    <span className="pl-2 font-medium text-xs capitalize">
                      {" "}
                      <Status status={"Processing"} />
                    </span>
                  </p>
                  <div>
                    <QRCode value="hey" level="M" size={150} />
                  </div>
                </h1>
                <div className="lg:text-right text-left">
                  <h2 className="lg:flex lg:justify-end text-lg font-serif font-semibold mt-4 lg:mt-0 lg:ml-0 md:mt-0">
                   
                  </h2>
                  <p className="text-sm text-gray-500 mt-2">
                    {searchedData?.to} to {searchedData?.from}
                    <br /> in 4 hours
                  </p>
                </div>
              </div>
              <div className="flex lg:flex-row md:flex-row flex-col justify-between pt-4">
                <div className="mb-3 md:mb-0 lg:mb-0 flex flex-col">
                  <span className="font-bold font-serif text-sm uppercase text-gray-600 block">
                    Date
                  </span>
                  <span className="text-sm text-gray-500 block">
                    
                    <span>
                   
                      22/09/2022
                    </span>
                  
                  </span>
                </div>
                <div className="mb-3 md:mb-0 lg:mb-0 flex flex-col">
                  <span className="font-bold font-serif text-sm uppercase text-gray-600 block">
                    Travel Itinerary No
                  </span>
                  <span className="text-sm text-gray-500 block">
                    #{data.bookingId}
                  </span>
                </div>
                <div className="flex flex-col lg:text-right text-left">
                  <span className="font-bold font-serif text-sm uppercase text-gray-600 block">
                    Travel Itinerary To.
                  </span>
                  <span className="text-sm text-gray-500 block">
                 
                    Abdullah
                    <br />
          
                    Chorangi No 4
                    <br />
                 
                    Karachi, Pakistan, 66000
                  </span>
                </div>
              </div>
            </div>
           
            <div>
              
            </div>

          
            <div className="border rounded-xl border-gray-100 p-8 py-6 bg-gray-50">
              <div className="flex lg:flex-row md:flex-row flex-col justify-between">
                <div className="mb-3 md:mb-0 lg:mb-0  flex flex-col sm:flex-wrap">
                  <span className="mb-1 font-bold font-serif text-sm uppercase text-gray-600 block">
                    Payment Method
                  </span>
                  <span className="text-sm text-gray-500 font-semibold font-serif block">
                  
                    Credit
                  </span>
                </div>
                <div className="mb-3 md:mb-0 lg:mb-0  flex flex-col sm:flex-wrap">
                  <span className="mb-1 font-bold font-serif text-sm uppercase text-gray-600 block">
                    Fare
                  </span>
                  <span className="text-sm text-gray-500 font-semibold font-serif block">
               
                    {data.price}
                  </span>
                </div>
                <div className="mb-3 md:mb-0 lg:mb-0  flex flex-col sm:flex-wrap">
                  <span className="mb-1 font-bold font-serif text-sm uppercase text-gray-600 block">
                    Discount
                  </span>
                  <span className="text-sm text-gray-500  font-semibold font-serif block">
                  
                    00.00
                  </span>
                </div>
                <div className="flex flex-col sm:flex-wrap">
                  <span className="mb-1 font-bold font-serif text-sm uppercase text-gray-600 block">
                    Total Amount
                  </span>
                  <span className="text-xl font-serif font-bold text-red-500 block">
          
                    {data.price}
                  </span>
                </div>
              </div>
            </div>
           
          </div>
 
          <div className="mb-4 mt-3 flex justify-between topButtonInvoice">
            <PDFDownloadLink
           
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
                  Print Travel Itinerary{" "}
                  <span className="ml-2">
                    <FiPrinter />
                  </span>
                </button>
              )}
              content={() => printRef.current}
              documentTitle="Invoice"
            />
          </div>

        </div>
      </div> */}
    </>
  );
};

export default TicketSearch;
