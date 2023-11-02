import React from "react";
import "./../assets/css/AdminChat.css";
import { FiSearch } from "react-icons/fi";
import { Link } from "react-router-dom";

import pic1 from "./../../assets/chatUserImages/teamAE1.jpg";

const AdminChat = () => {
  const data = [
    {
      img: pic1,
      name: "Vincent Porter",
      time: "10 minutes ago",
    },
    {
      img: pic1,
      name: "Vincent Porter",
      time: "10 minutes ago",
    },
    {
      img: pic1,
      name: "Vincent Porter",
      time: "10 minutes ago",
    },
    {
      img: pic1,
      name: "Vincent Porter",
      time: "10 minutes ago",
    },
    {
      img: pic1,
      name: "Vincent Porter",
      time: "10 minutes ago",
    },
    {
      img: pic1,
      name: "Vincent Porter",
      time: "10 minutes ago",
    },
    {
      img: pic1,
      name: "Vincent Porter",
      time: "10 minutes ago",
    },
  ];

  return (
    <>
      <div className="mainContainerAdminChat">
        <div className="chatListUser">
          <div className="searchBarAdminChat">
            <input
              type="text"
              placeholder="Search"
              className="inputSearchChatAdm"
            />
            <FiSearch className="searchIconChatAdm" />
          </div>
          <div className="topListChatAdmMap">
            {data.map((item, index) => (
              <div key={index} className="topChatBtnCardAdm">
                <div className="topChatListRowAdm">
                  <img className="profileImgList" src={item.img} />

                  <div>
                    <p className="nameChatListAdm">{item.name}</p>
                    <p className="listChatTime"> {item.time}</p>
                  </div>
                </div>

                <Link to="/admin/AdminChatBox">
                  <button className="btnContactUserAdm">Contact Vincent</button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminChat;
