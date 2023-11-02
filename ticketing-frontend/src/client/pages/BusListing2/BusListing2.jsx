import React, { useState, useEffect } from 'react'
// Components
import Header2 from '../../mainLayout/Header/Header2'
import HeaderComponent from '../../mainLayout/Header/HeaderComponent'
import StaticPart from '../Dashboard/StaticPart'
import CardServices from './../Dashboard/CardServices'
// React Bootstrap
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
// React icons
import { BiPhoneCall } from "react-icons/bi"

/* global ZegoUIKitPrebuilt */


const BusListing2 = () => {
  const [show, setShow] = useState(false);

  // useEffect(() => {
    
      // Dynamically create a script element
      
  // }, [])
  

  const handleVoiceModal = () => {
    handleShow()

    const script = document.createElement('script');
      script.src = 'https://unpkg.com/@zegocloud/zego-uikit-prebuilt/zego-uikit-prebuilt.js';
      script.async = true;
      document.body.appendChild(script);
  
      script.onload = () => {
        // ZegoUIKitPrebuilt is now available
        const roomID = 'room01';

        const userID = Math.floor(Math.random() * 10000) + "";
        const userName = "userName" + userID;
        const appID = 1944145381;
        const serverSecret = "03ca05a37da00cdee10bf26c307b043e";
        const TOKEN = ZegoUIKitPrebuilt.generateKitTokenForTest(appID, serverSecret, roomID, userID, userName);

        const zp = ZegoUIKitPrebuilt.create(TOKEN);
        zp.joinRoom({
              container: document.querySelector("#voice-call-root"),
              showPreJoinView: false,
              showOnlyAudioUser: true,
              scenario: {
                mode: ZegoUIKitPrebuilt.OneONoneCall
              }
        });
      };
  }
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
    {/* <Header2/> */}
    <div className='topCardServices'>
    {/* <HeaderComponent title={"Book Bus Tickets"}/> */}
    <CardServices/>
    </div>
    {/* Voice call Button */}
    <button className="voice-call-demo" onClick={() => handleVoiceModal()}>
      <BiPhoneCall color="#fff" fontSize="50px" />
    </button>

    <Modal show={show} onHide={handleClose}>
      <Modal.Header>
        <div id="voice-call-root"></div>
      </Modal.Header>
      <Modal.Body>

      </Modal.Body>
    </Modal>

    </>
  )
}

export default BusListing2