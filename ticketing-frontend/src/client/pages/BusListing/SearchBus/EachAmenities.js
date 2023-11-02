import React from "react";
import Tooltip from "react-bootstrap/Tooltip";

import OverlayTrigger from "react-bootstrap/OverlayTrigger";
export default function EachAmenities({ present, logo, title }) {
  return (
    <>
    
    <OverlayTrigger
            delay={{ hide: 450, show: 300 }}
            overlay={(props) => (
              <Tooltip {...props} className="classToolTip">
                  {title}
              </Tooltip>
            )}
            placement="top"
          >
      
        <div className="result-each-amenities-each">
          <img
            src={logo}
            alt=""
            style={{cursor:"pointer"}}
            className="result-each-amenities-each-logo"
          
          />
        </div>
     
          </OverlayTrigger>
      {/* {present ? (
        <div className="result-each-amenities-each">
          <img
            src={logo}
            alt=""
            className="result-each-amenities-each-logo"
            title={title}
          />
        </div>
      ) : (
        <></>
      )} */}
    </>
  );
}
