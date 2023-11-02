import React from "react";
import "./WhatsAppWidget.css";
import { IoLogoWhatsapp } from 'react-icons/io';
import WhatsAppWidget from "react-whatsapp-chat-widget";
import "react-whatsapp-chat-widget/index.css";


const WhatsAppWidget1 = () => {
  return (
    <>
      
      <WhatsAppWidget
			phoneNo="919884098840"
			position="left"
			widgetWidth="300px"
			widgetWidthMobile="260px"
			autoOpen={true}
			autoOpenTimer={5000}
			messageBox={true}
			messageBoxTxt="Hi Team, is there any related service available ?"
			iconSize="40"
			iconColor="white"
			iconBgColor="#c99a3co"
			// headerIcon="https://proficientdesigners.in/wp-content/themes/pd/img/logo-new.png"
			headerIconColor="#c99a3c"
			headerTxtColor="#FFF"
			headerBgColor="#c99a3c"
			headerTitle="John Doe"
			headerCaption="Online"
			bodyBgColor="#c99a3c"
			chatPersonName="Support"
			chatMessage={<>Hi there 👋 <br /><br /> How can I help you?</>}
			footerBgColor="#c99a3c"
			btnBgColor="#FFF"
			btnTxtColor="#c99a3c"
			btnTxt="Start Chat"
		/>
      {/* <WhatsAppWidget CompanyIcon={IoLogoWhatsapp} phoneNumber="923486615792" /> */}

      
    </>
  );
};

export default WhatsAppWidget1;
