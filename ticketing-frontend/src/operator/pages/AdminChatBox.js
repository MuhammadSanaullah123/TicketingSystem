import React from 'react'
import "./../assets/css/AdminChat.css";
import { BiDotsVerticalRounded } from "react-icons/bi";
import pic1 from "./../../assets/chatUserImages/teamAE1.jpg";
import { BsFillFileEarmarkImageFill } from "react-icons/bs";
const AdminChatBox = () => {
  return (
    <>
    
    <div  className='mainContainerAdminChatBox'>

        <div className="chatBoxUser">
          <div className="chatBoxR1LeftTop">
            <div className="chatBoxR1Left">
              <img className="proImgChatBox" src={pic1} />
              <div>
                <p className='headerChatAdminTxt'>Chat with the Vincent Porter</p>
                <p>Desc</p>
              </div>
            </div>
            <div>
              <BiDotsVerticalRounded className="threeDotsIcon" />
            </div>
          </div>
          <div className="chatBoxR2LeftMiddle">
            <div className="chatBoxCardAdmLeft">
              <div className="topTimePicChatBocAdm">
                <p>10.00PM,Today</p>
                <img className="chatImgAdmCard" src={pic1}></img>
              </div>
              <div className="topSmsMainAdmnChat">
                <p>
                  The overflow property specifies what should happen if content
                  overflows an element's box. This property specifies whether to
                  clip content or to add scrollbars when an element's content is
                  too big to fit in a specified area. Note: The overflow
                  property only works for block elements with a specified
                  height.
                </p>
              </div>
            </div>
            <div className="chatBoxCardAdmRight">
              <div className="topTimePicChatBocAdmRight">
                <p>10.00PM,Today</p>
                <img className="chatImgAdmCard" src={pic1}></img>
              </div>
              <div className="topSmsMainAdmnChat">
                <p>
                  The overflow property specifies what should happen if content
                  overflows an element's box. This property specifies whether to
                  clip content or to add scrollbars when an element's content is
                  too big to fit in a specified area. Note: The overflow
                  property only works for block elements with a specified
                  height.
                </p>
              </div>
            </div>
            <div className="chatBoxCardAdmLeft">
              <div className="topTimePicChatBocAdm">
                <p>10.00PM,Today</p>
                <img className="chatImgAdmCard" src={pic1}></img>
              </div>
              <div className="topSmsMainAdmnChat">
                <p>
                  The overflow property specifies what should happen if content
                  overflows an element's box. This property specifies whether to
                  clip content or to add scrollbars when an element's content is
                  too big to fit in a specified area. Note: The overflow
                  property only works for block elements with a specified
                  height.
                </p>
              </div>
            </div>
            <div className="chatBoxCardAdmRight">
              <div className="topTimePicChatBocAdmRight">
                <p>10.00PM,Today</p>
                <img className="chatImgAdmCard" src={pic1}></img>
              </div>
              <div className="topSmsMainAdmnChat">
                <p>
                  The overflow property specifies what should happen if content
                  overflows an element's box. This property specifies whether to
                  clip content or to add scrollbars when an element's content is
                  too big to fit in a specified area. Note: The overflow
                  property only works for block elements with a specified
                  height.
                </p>
              </div>
            </div>
          </div>

          

          <div className="chatBoxR3LeftBottom">
            <textarea
              type="text"
              rows="4"
              placeholder="Enter message here"
              className="textAreaInputSms"
              />

            <div className="topSentUplSms">
              <BsFillFileEarmarkImageFill className="imgUplIcon" />
              <p className="sendSmsTxt">SEND</p>
            </div>
          </div>
        </div>
    
              </div>
    </>
  )
}

export default AdminChatBox