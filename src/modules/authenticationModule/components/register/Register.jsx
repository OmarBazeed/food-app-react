import { NavLink, useNavigate } from "react-router-dom";
import Logo from "../../../../assets/imgs/logo.png";
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
          <div
            className={
              errors?.email || errors?.password
                ? "register-contentError bg-white border border-2 rounded-2 p-4 my-2 "
                : "register-content bg-white border border-2 rounded-2 p-4 my-2"
            }
          >
            <div>
              <div className="text-center mx-auto mb-1">
                <img src={Logo} alt="logo" />
              </div>
              <h2 className="loginHead fw-bold fs-2 fa">Register</h2>
              <p className="text-muted">
                Welcome Back! Please enter your details
              </p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
              <section className="row mw-100 gap-5">
                <div className="row flex-column col-md-6">
                  <div className="input-group formIn my-3 bg-lighter p-2 d-flex  align-items-center justify-content-center">
                    <i className="fa-regular fa-envelope fa-2x me-1"></i>
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
                    <i className="fa-solid fa-lock fa-2x me-1"></i>
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
                    <i className="fa-solid fa-lock fa-2x me-1"></i>
                    <input
                      type="password"
                      className="form-control bg-transparent border-0 ms-2"
                      placeholder="Enter Your Password"
                      {...register("password", {
                        required: "Password is required",
                      })}
                    />
                  </div>
                  {errors?.password && (
                    <p className="text-white handleErr fw-bold p-2">
                      {errors.password.message}
                    </p>
                  )}
                </div>
                <div className="row flex-column col-md-6">
                  <div className="input-group formIn my-3 bg-lighter p-2 d-flex  align-items-center justify-content-center">
                    <i className="fa-regular fa-envelope fa-2x me-1"></i>
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
                    <i className="fa-solid fa-lock fa-2x me-1"></i>
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
                    <i className="fa-solid fa-lock fa-2x me-1"></i>
                    <input
                      type="password"
                      className="form-control bg-transparent border-0 ms-2"
                      placeholder="Confirm Your Password"
                      {...register("confirmPassword", {
                        required: "Confirm Password is required",
                      })}
                    />
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
                <div className="w-100 mt-4">
                  <button
                    className={
                      clicked
                        ? "btn btn-transparent w-100 fw-bold text-white fs-5 submitBtn"
                        : "btn btn-success w-100 fw-bold text-white fs-5 submitBtn"
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
