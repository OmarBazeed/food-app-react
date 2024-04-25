import { useNavigate } from "react-router-dom";
import Logo from "../../../../assets/imgs/logo.png";
import axios from "axios";
import { useState } from "react";
import {
  FailToast,
  SuccessToast,
} from "../../../sharedModule/components/toasts/Toast";
import { useForm } from "react-hook-form";
import { DNA } from "react-loader-spinner";
import { mainURL } from "../../../../utils";

const ForgetPass = () => {
  const [clicked, setClicked] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      let res = await axios.post(`${mainURL}/Users/Reset/Request`, data);
      setClicked(true);
      SuccessToast(res.data.message);
      setTimeout(() => {
        navigate("/resetpass");
      }, 2000);
    } catch (error) {
      FailToast(error?.response?.error?.message);
    }
  };
  return (
    <div className="auth-container">
      <div className="bg-overlay vh-100">
        <div className="d-flex align-items-center justify-content-center vh-100">
          <div
            className={
              errors?.email
                ? ".login-contentForgetError  bg-white border border-2 rounded-2 p-5 my-5"
                : "login-contentForget bg-white border border-2 rounded-2 p-5 my-5"
            }
          >
            <div>
              <div className="text-center mx-auto mb-3">
                <img src={Logo} alt="logo" />
              </div>
              <h2 className="loginHead fw-bold fs-2 fa my-2">
                Forget Your Password ?
              </h2>
              <p className="text-muted text-capitalize">
                no worries! please enter your email and we will send you a reset
                password link
              </p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-5">
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

              <div className="w-100 mt-5">
                <button
                  className={
                    clicked
                      ? "btn btn-transparent w-100 fw-bold text-white fs-5 submitBtn"
                      : "btn btn-success w-100 fw-bold text-white fs-5 submitBtn"
                  }
                  type="submit"
                >
                  {clicked == true ? (
                    <DNA
                      visible={true}
                      height="80"
                      width="80"
                      ariaLabel="dna-loading"
                      wrapperStyle={{}}
                      wrapperClass="dna-wrapper"
                    />
                  ) : (
                    "Submit"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPass;
