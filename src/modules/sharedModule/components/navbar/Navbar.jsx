import {
  Button,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useDisclosure,
} from "@chakra-ui/react";
import axios from "axios";
import { useContext, useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Bars } from "react-loader-spinner";
import avatar from "../../../../assets/imgs/avatar.png";
import { AuthContext } from "../../../../context/AuthContext";
import { mainURL } from "../../../../utils";
import { FailToast, SuccessToast } from "../toasts/Toast";
import "./Navbar.modules.css";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { loggedUserInfo, RequestAuthorization, gettingUserData } =
    useContext(AuthContext);
  const [openUprofile, setOpenUprofile] = useState(false);
  const [clickedProfile, setClickedProfile] = useState(false);
  const [clickedPassword, setClickedPassword] = useState(false);
  const [showConPass, setShowConPass] = useState(false);
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = useRef(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onSubmit",
  });

  const {
    register: registerPassword,
    handleSubmit: handleSubmitPassword,
    formState: { errors: errorsPassword },
    reset: resetPassword,
  } = useForm({
    mode: "onSubmit",
  });

  //logging out
  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate("/");
  };
  //handling update profile
  const onSubmitProfile = async (data) => {
    const formData = new FormData();
    formData.append("userName", data.userName);
    formData.append("email", data.email);
    formData.append("country", data.country);
    formData.append("phoneNumber", data.phoneNumber);
    formData.append("confirmPassword", data.confirmPassword);
    formData.append("profileImage", data.profileImage[0]);
    try {
      let res = await axios.put(`${mainURL}/Users`, formData, {
        headers: {
          ...RequestAuthorization,
        },
      });
      setClickedProfile(true);
      SuccessToast(res.data.message || "Account Updated Successfully");
      setTimeout(() => {
        onClose();
        gettingUserData();
        setClickedProfile(false);
      }, 1000);
    } catch (error) {
      FailToast(error.response.data.message);
    }
  };

  //handling update password
  const onSubmitPasswordChange = async (data) => {
    try {
      let res = await axios.put(`${mainURL}/Users/ChangePassword`, data, {
        headers: {
          ...RequestAuthorization,
        },
      });
      setClickedPassword(true);
      SuccessToast(res.data.message || "Password Changed Successfully");
      setTimeout(() => {
        onClose();
        gettingUserData();
        setClickedPassword(false);
      }, 1000);
    } catch (error) {
      FailToast(error.response.data.message);
    }
  };

  useEffect(() => {
    gettingUserData();
  }, [gettingUserData]);

  useEffect(() => {
    const { userName, email, country, phoneNumber } = loggedUserInfo;
    reset({
      userName,
      email,
      country,
      phoneNumber,
    });
    resetPassword();
  }, [loggedUserInfo, reset, resetPassword]);

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
                    <Tab>
                      Account Settings <i className="fa fa-gears ms-2"></i>
                    </Tab>
                    <Tab>
                      Change Password <i className="fa fa-lock ms-2"></i>
                    </Tab>
                  </TabList>
                  <TabPanels>
                    <TabPanel>
                      <h6 className="text-center text-primary">
                        Change Your Account Information
                      </h6>
                      <form
                        onSubmit={handleSubmit(onSubmitProfile)}
                        className="mt-4"
                      >
                        <section className="row mw-100 gap-0 row-gap-md-2 column-gap-md-5 registerRow">
                          <div className="row flex-column col-md-6">
                            <div className="input-group formInput my-3 bg-lighter p-2 d-flex align-items-center justify-content-center">
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
                            <div className="input-group formInput my-3 bg-lighter p-2 d-flex align-items-center justify-content-center">
                              <input
                                type="text"
                                className="form-control bg-transparent border-0 ms-2"
                                placeholder="Enter Your Country"
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
                          </div>
                          <div className="row flex-column col-md-6">
                            <div className="input-group formInput my-3 bg-lighter p-2 d-flex align-items-center justify-content-center">
                              <input
                                type="text"
                                className="form-control bg-transparent border-0 ms-2"
                                placeholder="Enter Your Email"
                                {...register("email", {
                                  required: "email is required",
                                  pattern: {
                                    value: /^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/gi,
                                    message: "Invalid email format",
                                  },
                                })}
                              />
                            </div>
                            {errors?.email && (
                              <p className="text-white handleErr fw-bold p-2">
                                {errors.email.message}
                              </p>
                            )}
                            <div className="input-group formInput my-3 bg-lighter p-2 d-flex align-items-center justify-content-center">
                              <input
                                type="number"
                                className="form-control bg-transparent border-0 ms-2"
                                placeholder="Your Phone Number"
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
                          </div>
                          <div className="p-0">
                            <div className="input-group formInput my-3 bg-lighter d-flex align-items-center justify-content-center">
                              <input
                                type={showConPass ? "text" : "password"}
                                className="form-control bg-transparent border-0 ms-2"
                                placeholder="Confirm Your Password"
                                {...register("confirmPassword", {
                                  required: "Confirm Password is required",
                                })}
                              />
                              {showConPass ? (
                                <i
                                  className="fa fa-eye border-0 pointer-event"
                                  onClick={() => setShowConPass(!showConPass)}
                                ></i>
                              ) : (
                                <i
                                  className="fa fa-eye-slash border-0 pointer-event"
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
                                clickedProfile
                                  ? "btn btn-transparent w-75 fw-bold submitBtn"
                                  : "btn btn-outline-primary w-75 fw-bold submitBtn"
                              }
                              type="submit"
                            >
                              {clickedProfile ? (
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
                                "Update"
                              )}
                            </button>
                          </div>
                        </div>
                      </form>
                    </TabPanel>
                    {/*cahnge password tab */}
                    <TabPanel>
                      <h6 className="text-center text-primary">
                        Change Your Password
                      </h6>
                      <form
                        onSubmit={handleSubmitPassword(onSubmitPasswordChange)}
                        className="mt-4"
                      >
                        <section className="row mw-100 gap-0 row-gap-md-2 column-gap-md-5 registerRow">
                          <div className="p-0">
                            <div className="input-group formInput my-3 bg-lighter d-flex align-items-center justify-content-center">
                              <input
                                type={showConPass ? "text" : "password"}
                                className="form-control bg-transparent border-0 ms-2"
                                placeholder="Your Old Password"
                                {...registerPassword("oldPassword", {
                                  required: "Old Password is required",
                                })}
                              />
                              {showConPass ? (
                                <i
                                  className="fa fa-eye border-0 pointer-event"
                                  onClick={() => setShowConPass(!showConPass)}
                                ></i>
                              ) : (
                                <i
                                  className="fa fa-eye-slash border-0 pointer-event"
                                  onClick={() => setShowConPass(!showConPass)}
                                ></i>
                              )}
                            </div>
                            {errorsPassword?.oldPassword && (
                              <p className="text-white handleErr fw-bold p-2">
                                {errorsPassword.oldPassword.message}
                              </p>
                            )}
                            <div className="input-group formInput my-3 bg-lighter d-flex align-items-center justify-content-center">
                              <input
                                type={showConPass ? "text" : "password"}
                                className="form-control bg-transparent border-0 ms-2"
                                placeholder="Your New Password"
                                {...registerPassword("newPassword", {
                                  required: "New Password is required",
                                })}
                              />
                              {showConPass ? (
                                <i
                                  className="fa fa-eye border-0 pointer-event"
                                  onClick={() => setShowConPass(!showConPass)}
                                ></i>
                              ) : (
                                <i
                                  className="fa fa-eye-slash border-0 pointer-event"
                                  onClick={() => setShowConPass(!showConPass)}
                                ></i>
                              )}
                            </div>
                            {errorsPassword?.newPassword && (
                              <p className="text-white handleErr fw-bold p-2">
                                {errorsPassword.newPassword.message}
                              </p>
                            )}
                            <div className="input-group formInput my-3 bg-lighter d-flex align-items-center justify-content-center">
                              <input
                                type={showConPass ? "text" : "password"}
                                className="form-control bg-transparent border-0 ms-2"
                                placeholder="Confirm Your Password"
                                {...registerPassword("confirmNewPassword", {
                                  required: "Confirm New Password is required",
                                })}
                              />
                              {showConPass ? (
                                <i
                                  className="fa fa-eye border-0 pointer-event"
                                  onClick={() => setShowConPass(!showConPass)}
                                ></i>
                              ) : (
                                <i
                                  className="fa fa-eye-slash border-0 pointer-event"
                                  onClick={() => setShowConPass(!showConPass)}
                                ></i>
                              )}
                            </div>
                            {errorsPassword?.confirmNewPassword && (
                              <p className="text-white handleErr fw-bold p-2">
                                {errorsPassword.confirmNewPassword.message}
                              </p>
                            )}
                          </div>
                        </section>

                        <div className="mt-3">
                          <div className="mt-4 d-flex justify-content-center">
                            <button
                              className={
                                clickedPassword
                                  ? "btn btn-transparent w-75 fw-bold submitBtn"
                                  : "btn btn-outline-primary w-75 fw-bold submitBtn"
                              }
                              type="submit"
                            >
                              {clickedPassword ? (
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
                                "Change"
                              )}
                            </button>
                          </div>
                        </div>
                      </form>
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
                        <span>
                          <i className="fa-solid fa-angle-down"></i>
                        </span>
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
                      <Button
                        variant="ghost"
                        colorScheme="red"
                        onClick={() => handleLogOut()}
                      >
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
