import React, { useState, useEffect } from "react";
import {Link} from 'react-router-dom'
// import { withRouter } from "react-router";
//scss
import "./TermsPolicy.scss";
//mui
import Grid from '@mui/material/Grid';
//icons
import AddTaskIcon from '@mui/icons-material/AddTask';
import SendIcon from '@mui/icons-material/Send';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import GoogleIcon from '@mui/icons-material/Google';
import FacebookIcon from '@mui/icons-material/Facebook';
import {FaRoad, FaDollarSign, FaPercentage, FaSearch, FaLock} from 'react-icons/fa'

//assets
import busPromo from "../../assets/sadaat.png"

const TermsPolicy = () => {
  
  return (
    <>
      <Grid container className="ReviewWrapper">
        <Grid item xs={12} className="ReviewContainer" display="flex" justifyContent="center">
          <Grid item xs={11} className="bgGrey">
            <p className="heading">Terms And Policy Of Use:</p>
            <Grid item xs={12} className="descWrap">
              <p className="desc">Welcome to [company]. This Website is solely to assist customers in providing travel information and bookings, engaging in interactive travel forums, and searching for and booking travel reservations.</p>
              <p className="desc">The terms “we”, “us”, “our” and “[company]” refer to [company].com, and our subsidiaries. The term “you” refers to the customer visiting the Website and/or contributing content on this Website.</p>
              <p className="desc">This Website is offered to you conditioned upon your acceptance without modification of any/all the terms & conditions, and notices set forth. By accessing or using this Website in any manner, you agree to be bound by the agreement and represent that you have read and understood its terms and conditions. Please read it carefully, as it contains information concerning your legal rights and limitations on these rights, as well as a section regarding applicable law and jurisdiction of disputes. If you do not accept all of these terms and conditions, please do not use this Website.</p>
              <p className="desc">We may change or modify the conditions at any time in the future, and you must understand and agree that your continued access or use of this Website after such change signifies your acceptance of the updated or modified terms and conditions. We will note the date that revisions were last made to the term & conditions at the bottom of this page, and any revisions will take effect upon posting. We will notify our members of material changes to these terms and conditions by either sending a notice to the email address provided to us at registration or by placing a request on our Website.</p>
              <p className="desc">This Website is provided solely to assist customers in gathering travel information, determining the availability of travel-related goods and services, making legitimate reservations or otherwise transacting business with travel suppliers, and for no other purposes. the customer visiting the Website and/or booking a reservation through us on this Website, or through our customer service agents.</p>
              <p className="desc">This Website is offered to you conditioned upon your acceptance without modification of all the terms, conditions, and notices set forth below (collectively, the 'Terms of Use' or 'Agreement'). Please read the terms of Use carefully. By accessing or using this Website, booking any travel products or services on this Website, or contacting our call center agents, you agree that the Terms of Use then in force shall apply. If you do not agree to the Terms of Use, please do not use or make bookings through this Website or our call center agents. at any time change these Terms of Use and your continued use of this Website is conditioned upon acceptance of the updated Terms of Use.</p>
              
            </Grid>
            <Grid item xs={12} className="descWrap">
              <p className="heading">USER'S RESPONSIBILITY OF UNDERSTANDING:</p>
              <p className="desc">The Users availing services from BOOKKARU shall be considered to have read understand and particularly accept the terms and conditions carefully, which shall govern the desired transaction or provision of such services by [company] for all purposes, and shall be binding on the User.</p>
              <p className="desc">[company] reserves the right, in its sole discretion, to terminate the access to any or all [company] websites or its other sales channels and the related services or any portion thereof at any time, without notice, for general maintenance or any other reason.</p>
              <p className="desc">Certain products or services (e.g. hotel reservations) may be provided by third party suppliers. In addition to this Agreement, there are certain terms of service (TOS) specific to the services rendered/ products provided by BOOKKARU like the air tickets, bus, holiday packages etc. Such TOS will be provided/ updated by [company] which shall be deemed to be a part of this Agreement and in the event of a conflict between such TOS and this Agreement, the terms of this Agreement shall prevail. The User shall be required to read and accept the relevant TOS for the service/ product availed by the User.</p>
              <p className="desc">Additionally, the Service Provider itself may provide terms and guidelines that govern particular features, offers or the operating rules and policies applicable to each Service (for example bus, flights, hotel reservations, tour packages car rentals, etc.). The User shall be responsible for ensuring compliance with the terms and guidelines or operating rules and policies of the Service Provider with whom the User elects to deal, including terms and conditions set forth in a Service Providers' fare rules, contract of carriage or other rules.</p>
              <p className="desc">[company]'s Services are offered to the User conditioned on acceptance without modification of all the terms, conditions and notices contained in this Agreement and the TOS, as may be applicable from time to time. For the removal of doubts, it is clarified that availing of the Services by the User constitutes an acknowledgement and acceptance by the User of this Agreement and the TOS. If the User does not agree with any part of such terms, conditions and notices, the User must not avail [company]'s Services.</p>
              <p className="desc">In the event that any of the terms, conditions, and notices contained herein conflict with the Additional Terms or other terms and guidelines contained within any other BOOKKARU document, then these terms shall control.</p>
            </Grid>
            <Grid item xs={12} className="descWrap">
              <p className="heading">Third party Account Access:</p>
              <p className="desc">By using the Account Access service in [company]'s websites, the User authorizes [company] and its agents to access third party sites, including that of Banks and other payment gateways, designated by them or on their behalf for retrieving requested information</p>
              <p className="desc">While registering, the User will choose a password and is responsible for maintaining the confidentiality of the password and the account.</p>
              <p className="desc">The User is fully responsible for all activities that occur while using their password or account. It is the duty of the User to notify [company] immediately in writing of any unauthorized use of their password or account or any other breach of security. BOOKKARU will not be liable for any loss that may be incurred by the User as a result of unauthorized use of his password or account, either with or without his knowledge.</p>
              
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default TermsPolicy;
