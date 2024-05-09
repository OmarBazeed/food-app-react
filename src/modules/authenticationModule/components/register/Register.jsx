import { NavLink, useNavigate } from "react-router-dom";
import Logo from "../../../../assets/imgs/logo.png";
import RegName from "../../../../assets/imgs/animatedPics/regName.gif";
import EmailPic from "../../../../assets/imgs/animatedPics/email.gif";
import CountryPic from "../../../../assets/imgs/animatedPics/country.gif";
import PhonePic from "../../../../assets/imgs/animatedPics/phone.gif";
import PassEye from "../../../../assets/imgs/animatedPics/view.gif";
import { useForm } from "react-hook-form";
import axios from "axios";
import "animate.css";
import { useState } from "react";
import { Bars } from "react-loader-spinner";
import { mainURL } from "../../../../utils";
import {
  FailToast,
  SuccessToast,
} from "../../../sharedModule/components/toasts/Toast";

const Register = () => {
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
    console.log(data);
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
  return (
    <div className="auth-container">
      <div className="bg-overlay vh-100">
        <div className="d-flex align-items-center justify-content-center vh-100">
          <div className="h-auto w-auto p-4 bg-white border border-2 rounded-2 register-content">
            <div>
              <div className="text-center mx-auto mb-1">
                <img src={Logo} alt="logo" className="w-75 h-75 RegLogo" />
              </div>
              <h2 className="loginHead fw-bold fs-2">Register</h2>
              <p className="text-muted">
                Welcome Back! Please enter your details
              </p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
              <section className="row mw-100 gap-0 gap-md-5 registerRow">
                <div className="row flex-column col-md-6">
                  <div className="input-group formIn my-3 bg-lighter p-2 d-flex align-items-center justify-content-center">
                    <img src={RegName} alt="..." className="loginIcons" />
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
                    <img src={CountryPic} alt="..." className="loginIcons" />
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
                    <img src={PassEye} alt="..." className="loginIcons" />
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
                    <img src={EmailPic} alt="..." className="loginIcons" />
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
                    <img src={PhonePic} alt="..." className="loginIcons" />
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
                    <img src={PassEye} alt="..." className="loginIcons" />
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
                <div className="my-4 text-end">
                  <NavLink
                    className="text-decoration-none text-secondary fs-6 fw-bold"
                    to="/"
                  >
                    Login Now ?
                  </NavLink>
                </div>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
