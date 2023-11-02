import React, { useContext } from "react";
import { Button } from "@windmill/react-ui";
import { SidebarContext } from "../../context/SidebarContext";

const DrawerButton = ({id, title, data}) => {
  const [allBusData, setAllBusData] = React.useState([])
  const { toggleDrawer } = useContext(SidebarContext);
  
  const handleSubmit = () => {
    console.log('added to localstorage')
    setAllBusData([data])
    localStorage.setItem(`${title}`, JSON.stringify(allBusData));
  }
  return (
    <>
      <div className="fixed bottom-0 w-full right-0 py-4 lg:py-8 px-6 grid gap-4 lg:gap-6 xl:gap-6 md:flex xl:flex bg-gray-50 border-t border-gray-100">
        <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
          <Button
            onClick={toggleDrawer}
            className="h-12 bg-white w-full text-red-500 hover:bg-red-50 hover:border-red-100 hover:text-red-600"
            layout="outline"
          >
            Cancel
          </Button>
        </div>
        <div className="flex-grow-0 md:flex-grow lg:flex-grow xl:flex-grow">
          <div className="w-full h-12" onClick={handleSubmit}>
            {" "}
            {id ? <span>Update {title}</span> : <span>Add {title}</span>}
          </div>
        </div>
      </div>
    </>
  );
};

export default DrawerButton;
