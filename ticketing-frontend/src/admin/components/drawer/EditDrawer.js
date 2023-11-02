import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import SelectOption from "../form/SelectOption";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Title from "../form/Title";
import Swal from "sweetalert2";
import InputValue from "../form/InputValue";
import Navbar from "react-bootstrap/Navbar";
import InputArea from "../form/InputArea";
import LabelArea from "../form/LabelArea";
import Scrollbars from "react-custom-scrollbars";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import { useDispatch } from "react-redux";
import { editAdminCustomers } from "../../../Redux/userReducer";
import { useState } from "react";
import { useSelector } from "react-redux";
function EditDrawer(customerData) {
  const dataCusComp = useSelector(
    (state) => state.userReducer?.getCustomerAdminData
  );
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    name: customerData?.customerData?.username,
    phone: customerData?.customerData?.phone,
    email: customerData?.customerData?.email,
    password: "",
  });
  const [image, setImage] = useState();

  const handleImageChange = (e) => {
    const selected = e.target.files[0];

    setImage(selected);
  };

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  console.log("userEditDrawer", user);

  const submitUpdate = async (e) => {
    e.preventDefault();
    //   const data=new FormData();

    //   data.append('username',user.name);
    //   data.append('phone',user.phone);
    //   data.append('email',user.email);
    //   data.append('password',user.password)

    const user1 = {
      userId: customerData?.customerData?._id,
      username: user?.name,
      phone: user?.phone,
      email: user?.email,
      password: user?.password,
    };

    const response = await dispatch(editAdminCustomers({user1,dataCusComp}));
    console.log("responseCustomerEdit",response)
   
  };

  // console.log("customerDataDrawer",customerData)
  // console.log("customerDataDrawerEmail",customerData.customerData.email)
  console.log(
    "customerData?.customerData?.emai",
    customerData?.customerData?._id
  );
  return (
    <>
      {[false].map((expand) => (
        <Navbar key={expand} bg="light" expand={expand} className="mb-3">
          <Container fluid>
            <Navbar.Toggle
              aria-controls={`offcanvasNavbar-expand-${expand}`}
              className="toggleIconBtn"
            />
            <Navbar.Offcanvas
              //   id={`offcanvasNavbar-expand-${expand}`}
              id="offcanvasEditDrawerTop"
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton></Offcanvas.Header>
              <Offcanvas.Body>
                <Title
                  title="Update Customer"
                  description="Update your customer and necessary information from here"
                />

                <Scrollbars className="w-full md:w-7/12 lg:w-8/12 xl:w-8/12 relative">
                  <form>
                    <div
                      className="px-6 pt-8 flex-grow scrollbar-hide w-full max-h-full pb-40"
                      style={{
                        padding: "0px",
                        paddingTop: "70px",
                        paddingBottom: "30px",
                      }}
                    >
                      <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                        <LabelArea label="Image" />
                        <div className="col-span-8 sm:col-span-4">
                          {/* <Uploader imageUrl={imageUrl} setImageUrl={setImageUrl} /> */}
                          <input
                            type="file"
                            accept="image/png , image/jpeg, image/webp"
                            onChange={handleImageChange}
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                        <LabelArea label="Name" />
                        <div className="col-span-8 sm:col-span-4">
                          <InputArea
                            label="Name"
                            defaultValue={user.name}
                            name="name"
                            type="text"
                            placeholder="Name"
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      {/* <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                        <LabelArea label="Joining date" />
                        <div className="col-span-8 sm:col-span-4">
                          <InputArea
                            label="Phone"
                            name="validity"
                            type="date"
                            placeholder="Phone number"
                          />
                        </div>
                      </div> */}
                      <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                        <LabelArea label="Phone" />
                        <div className="col-span-8 sm:col-span-4">
                          <InputArea
                            label="Phone"
                            defaultValue={user.phone}
                            name="phone"
                            onChange={handleChange}
                            type="text"
                            placeholder="Phone number"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                        <LabelArea label="Email" />
                        <div className="col-span-8 sm:col-span-4">
                          <InputArea
                            label="Email"
                            name="email"
                            type="text"
                            defaultValue={user.email}
                            placeholder="Email"
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-6 gap-3 md:gap-5 xl:gap-6 lg:gap-6 mb-6">
                        <LabelArea label="Password" />
                        <div className="col-span-8 sm:col-span-4">
                          <InputArea
                            label="Password"
                            name="password"
                            onChange={handleChange}
                            type="password"
                            placeholder="Password"
                          />
                        </div>
                      </div>
                    </div>

                    {/* <DrawerButton id={id} title="Coupon" style={{cursor:"pointer"}} onClick={addCouponClicked} /> */}
                    <div>
                      <button
                        className="addBusBtn1"
                        onClick={submitUpdate}
                        style={{ paddingLeft: "0px", color: "#c99a3c" }}
                      >
                        Update Customer
                      </button>

                      <Navbar.Toggle className="toggleIconBtn">
                        <button
                          className=""
                          style={{ paddingLeft: "25px", color: "red" }}
                        >
                          Cancel
                        </button>
                      </Navbar.Toggle>
                    </div>
                  </form>
                </Scrollbars>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}

export default EditDrawer;
