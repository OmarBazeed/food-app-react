import "animate.css";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Bars } from "react-loader-spinner";
import { NavLink, useNavigate } from "react-router-dom";
import EmailPic from "../../../../assets/imgs/animatedPics/email.gif";
import PassEye from "../../../../assets/imgs/animatedPics/view.gif";
import Logo from "../../../../assets/imgs/logo.png";
import { AuthContext } from "../../../../context/AuthContext";
import { mainURL } from "../../../../utils";
import {
  FailToast,
  SuccessToast,
} from "../../../sharedModule/components/toasts/Toast";

const Login = () => {
  const [clicked, setClicked] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const navigate = useNavigate();
  const { gettingUserData } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      let res = await axios.post(`${mainURL}/Users/Login`, data);
      setClicked(true);
      SuccessToast("Logged In Successfully");
      localStorage.setItem("token", res.data.token);
      gettingUserData();
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } catch (error) {
      FailToast(error.response.data.message);
    }
  };
  useEffect(() => {
    gettingUserData();
  }, [gettingUserData]);
  return (
    <div className="auth-container">
      <div className="bg-overlay vh-100">
        <div className="d-flex align-items-center justify-content-center vh-100">
          <div className="h-auto p-4 bg-white border border-2 rounded-2 login-content">
            <div>
              <div className="text-center mx-auto mb-1 w-75">
                <img src={Logo} alt="logo" className="w-75 w-sm-100" />
              </div>
              <h2 className="loginHead fw-bold fs-2 fa">Login</h2>
              <p className="text-muted">
                Welcome Back! Please enter your details
              </p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
              <div className="input-group formIn my-3 bg-lighter p-2 d-flex  align-items-center justify-content-center">
                <img src={EmailPic} alt="..." className="loginIcons" />
                <input
                  type="text"
                  className="form-control bg-transparent border-0 ms-2"
                  placeholder="Enter Your Email"
                  {...register("email", {
                    required: "Email is required",
                    pattern: /^[\w-]+@([\w-]+\.)+[\w-]{2,4}$/i,
                  })}
                />
              </div>
              {errors?.email && (
                <p className="text-white handleErr fw-bold p-2">
                  Email Is Required
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
                  Password Is Required
                </p>
              )}

              <div className="mt-3 redirects">
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
