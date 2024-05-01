import { NavLink, useNavigate } from "react-router-dom";
import Logo from "../../../../assets/imgs/logo.png";
import { useForm } from "react-hook-form";
import axios from "axios";
import "animate.css";
import { useState } from "react";
import { Bars } from "react-loader-spinner";
import {
  FailToast,
  SuccessToast,
} from "../../../sharedModule/components/toasts/Toast";
import { mainURL } from "../../../../utils";

const Login = () => {
  const [clicked, setClicked] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      let res = await axios.post(`${mainURL}/Users/Login`, data);
      res.data.token && localStorage.setItem("token", res.data.token);

      setClicked(true);
      SuccessToast("Logged In Successfully");
      checkingUserRole();
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } catch (error) {
      FailToast(error.response.data.message);
    }
  };

  const checkingUserRole = async () => {
    try {
      let res = await axios.get(`${mainURL}/Users/currentUser`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      localStorage.getItem("LoggedUserInfo") &&
        localStorage.removeItem("LoggedUserInfo");
      localStorage.setItem("LoggedUserInfo", JSON.stringify(res.data));
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
                ? "login-contentError bg-white border border-2 rounded-2 p-4 my-2 "
                : "login-content bg-white border border-2 rounded-2 p-4 my-2"
            }
          >
            <div>
              <div className="text-center mx-auto mb-1">
                <img src={Logo} alt="logo" />
              </div>
              <h2 className="loginHead fw-bold fs-2 fa">Login</h2>
              <p className="text-muted">
                Welcome Back! Please enter your details
              </p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
              <div className="input-group formIn my-3 bg-lighter p-2 d-flex  align-items-center justify-content-center">
                <i className="fa-regular fa-envelope fa-2x me-1"></i>
                <input
                  type="text"
                  className="form-control bg-transparent border-0 ms-2"
                  placeholder="Enter Your Email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: /^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/i,
                  })}
                  defaultValue="omarbazeed@gmail.com"
                />
              </div>
              {errors?.email && (
                <p className="text-white handleErr fw-bold p-2">
                  Email Is Required
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
                  defaultValue="Omar0109585@"
                />
              </div>

              {errors?.password && (
                <p className="text-white handleErr fw-bold p-2">
                  Password Is Required
                </p>
              )}

              <div className="mt-3">
                <div className="d-flex align-items-center justify-content-between my-4">
                  <NavLink
                    className="text-decoration-none text-secondary fs-6 fw-bold"
                    to="/register"
                  >
                    Registr Now ?
                  </NavLink>
                  <NavLink
                    className="text-decoration-none text-secondary fs-6 fw-bold text-success"
                    to="/forgetpass"
                  >
                    Forget Password!
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
                      "Submit"
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

export default Login;
