/* eslint-disable no-unused-vars */
import avatar from "../../../../assets/imgs/avatar.png";
import { useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../../../context/AuthContext";
import {
  Box,
  Button,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalOverlay,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  useDisclosure,
  ModalHeader,
  Modal,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Tabs,
} from "@chakra-ui/react";
import { mainURL } from "../../../../utils";
import { FailToast, SuccessToast } from "../toasts/Toast";
import axios from "axios";
import { Bars } from "react-loader-spinner";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import "./Navbar.modules.css";

const Navbar = () => {
  const { loggedUserInfo, gettingUserData } = useContext(AuthContext);
  const [openUprofile, setOpenUprofile] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = useRef(null);
  const [clicked, setClicked] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const [showConPass, setShowConPass] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("userName", data.userName);
    formData.append("email", data.email);
    formData.append("country", data.country);
    formData.append("phoneNumber", data.phoneNumber);
    formData.append("password", data.password);
    formData.append("confirmPassword", data.confirmPassword);
    formData.append("profileImage", data.profileImage[0]);
    try {
      let res = await axios.post(`${mainURL}/Users/Register`, formData);
      setClicked(true);
      SuccessToast(res.data.message || "Logged In Successfully");
      setTimeout(() => {
        navigate("/verifyAccount");
      }, 2000);
      console.log(res);
    } catch (error) {
      FailToast(error.response.data.message);
    }
  };

  useEffect(() => {
    gettingUserData();
  }, [gettingUserData]);
  return (
    <>
      {openUprofile && (
        <>
          <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>
                <Tabs size="md" variant="enclosed">
                  <TabList>
                    <Tab>Change Info</Tab>
                    <Tab>Two</Tab>
                  </TabList>
                  <TabPanels>
                    <TabPanel>
                      <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
                        <section className="row mw-100 gap-0 gap-md-5 registerRow">
                          <div className="row flex-column col-md-6">
                            <div className="input-group formIn my-3 bg-lighter p-2 d-flex align-items-center justify-content-center">
                              <input
                                type="text"
                                className="form-control bg-transparent border-0 ms-2"
                                placeholder="Enter Your Username"
                                {...register("userName", {
                                  required: "userName is required",
                                })}
                              />
                            </div>
                            {errors?.userName && (
                              <p className="text-white handleErr fw-bold p-2">
                                {errors.userName.message}
                              </p>
                            )}
                            <div className="input-group formIn my-3 bg-lighter p-2 d-flex  align-items-center justify-content-center">
                              <input
                                type="text"
                                className="form-control bg-transparent border-0 ms-2"
                                placeholder="Enter Your country"
                                {...register("country", {
                                  required: "Country is required",
                                })}
                              />
                            </div>
                            {errors?.country && (
                              <p className="text-white handleErr fw-bold p-2">
                                {errors.country.message}
                              </p>
                            )}
                            <div className="input-group formIn my-3 bg-lighter p-2 d-flex  align-items-center justify-content-center">
                              <input
                                type={showPass ? "text" : "password"}
                                className="form-control bg-transparent border-0 ms-2"
                                placeholder="Enter Your Password"
                                {...register("password", {
                                  required: "Password is required",
                                })}
                              />
                              {showPass && (
                                <i
                                  className="fa fa-eye border-0 pointer-event"
                                  onClick={() => setShowPass(!showPass)}
                                ></i>
                              )}
                              {!showPass && (
                                <i
                                  className="fa fa fa-eye-slash border-0 pointer-event"
                                  onClick={() => setShowPass(!showPass)}
                                ></i>
                              )}
                            </div>
                            {errors?.password && (
                              <p className="text-white handleErr fw-bold p-2">
                                {errors.password.message}
                              </p>
                            )}
                          </div>
                          <div className="row flex-column col-md-6">
                            <div className="input-group formIn my-3 bg-lighter p-2 d-flex  align-items-center justify-content-center">
                              <input
                                type="text"
                                className="form-control bg-transparent border-0 ms-2"
                                placeholder="Enter Your email "
                                {...register("email", {
                                  required: "email is required",
                                  pattern: /^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/gi,
                                })}
                              />
                            </div>
                            {errors?.email && (
                              <p className="text-white handleErr fw-bold p-2">
                                {errors.email.message}
                              </p>
                            )}
                            <div className="input-group formIn my-3 bg-lighter p-2 d-flex  align-items-center justify-content-center">
                              <input
                                type="number"
                                className="form-control bg-transparent border-0 ms-2"
                                placeholder="Enter Your phoneNumber "
                                {...register("phoneNumber", {
                                  required: "phoneNumber is required",
                                })}
                              />
                            </div>
                            {errors?.phoneNumber && (
                              <p className="text-white handleErr fw-bold p-2">
                                {errors.phoneNumber.message}
                              </p>
                            )}
                            <div className="input-group formIn my-3 bg-lighter p-2 d-flex  align-items-center justify-content-center">
                              <input
                                type={showConPass ? "text" : "password"}
                                className="form-control bg-transparent border-0 ms-2"
                                placeholder="Confirm Your Password"
                                {...register("confirmPassword", {
                                  required: "Confirm Password is required",
                                })}
                              />
                              {showConPass && (
                                <i
                                  className="fa fa-eye border-0 pointer-event"
                                  onClick={() => setShowConPass(!showConPass)}
                                ></i>
                              )}
                              {!showConPass && (
                                <i
                                  className="fa fa fa-eye-slash border-0 pointer-event"
                                  onClick={() => setShowConPass(!showConPass)}
                                ></i>
                              )}
                            </div>
                            {errors?.confirmPassword && (
                              <p className="text-white handleErr fw-bold p-2">
                                {errors.confirmPassword.message}
                              </p>
                            )}
                          </div>
                          <input
                            type="file"
                            className="form-control"
                            {...register("profileImage")}
                          />
                        </section>

                        <div className="mt-3">
                          <div className="mt-4 d-flex justify-content-center">
                            <button
                              className={
                                clicked
                                  ? "btn btn-transparent w-75 fw-bold submitBtn"
                                  : "btn btn-success w-75 fw-bold submitBtn"
                              }
                              type="submit"
                            >
                              {clicked == true ? (
                                <Bars
                                  height="40"
                                  width="40"
                                  color="#4fa94d"
                                  ariaLabel="bars-loading"
                                  wrapperStyle={{}}
                                  wrapperClass=""
                                  visible={true}
                                />
                              ) : (
                                "Register"
                              )}
                            </button>
                          </div>
                        </div>
                      </form>
                    </TabPanel>
                    <TabPanel>
                      <p>two!</p>
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              </ModalHeader>
              <ModalCloseButton />
            </ModalContent>
          </Modal>
        </>
      )}
      <nav className="navbar navbar-expand-lg bg-light w-100 ms-3 pe-2">
        <div className="container-fluid gap-3">
          <button
            className="navbar-toggler ms-auto"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="row collapse navbar-collapse gap-3 gap-sm-0"
            id="navbarSupportedContent"
          >
            <div className="d-flex searchNav col-md-9">
              <input
                className="form-control me-2 w-100"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
            </div>
            <div className="navbar-nav ms-auto mb-2 mb-lg-0 d-flex justify-content-end align-items-center col-md-3 flex-row">
              <div>
                <Popover>
                  <PopoverTrigger>
                    <Button variant="" colorScheme="" className="border-0">
                      <div className="d-flex align-items-center gap-2">
                        <img
                          src={
                            loggedUserInfo?.imagePath
                              ? `https://upskilling-egypt.com:3006/${loggedUserInfo.imagePath}`
                              : avatar
                          }
                          alt=""
                          className="avatarImg rounded-circle"
                        />
                        <span className="fw-bold text-capitalize">
                          {loggedUserInfo?.userName}
                        </span>
                        <spn>
                          <i className="fa-solid fa-angle-down"></i>
                        </spn>
                      </div>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="p-2 bg-white"
                    style={{ width: "150px" }}
                  >
                    <PopoverArrow />
                    <PopoverCloseButton className="w-25 border-0 ms-auto my-2 bg-transparent" />
                    <PopoverBody className="px-4 my-1">
                      <Button
                        variant="ghost"
                        colorScheme="teal"
                        onClick={() => {
                          setOpenUprofile(true);
                          onOpen();
                        }}
                      >
                        Profile
                      </Button>
                      <Button variant="ghost" colorScheme="red">
                        Logout
                      </Button>
                    </PopoverBody>
                  </PopoverContent>
                </Popover>
              </div>
              <div className="mx-3">
                <span className="notificationIcon">
                  <i className="fa-solid fa-bell fa-2x"></i>
                </span>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
