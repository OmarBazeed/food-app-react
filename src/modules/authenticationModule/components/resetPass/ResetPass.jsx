import axios from "axios";
import { useState } from "react";
import Confetti from "react-confetti";
import { useForm } from "react-hook-form";
import { InfinitySpin } from "react-loader-spinner";
import { useNavigate } from "react-router-dom";
import Logo from "../../../../assets/imgs/logo.png";
import resetMail from "../../../../assets/imgs/animatedPics/email.gif";
import resetPass from "../../../../assets/imgs/animatedPics/resetPass.gif";
import Otp from "../../../../assets/imgs/animatedPics/otp.gif";
import {
  FailToast,
  SuccessToast,
} from "../../../sharedModule/components/toasts/Toast";
import { mainURL } from "../../../../utils";

const ResetPass = () => {
  const [clicked, setClicked] = useState(false);
  const [celebrate, setCelebrate] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      let res = await axios.post(`${mainURL}/Users/Reset`, data);
      setClicked(true);
      setCelebrate(true);
      SuccessToast(res.data.message);
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      FailToast(error.response.data.message);
    }
  };
  return (
    <>
      {celebrate && (
        <Confetti width={window.innerWidth} height={window.innerHeight} />
      )}
      <div className="auth-container">
        <div className="bg-overlay vh-100">
          <div className="d-flex align-items-center justify-content-center vh-100">
            <div className="h-auto p-4 bg-white border border-2 rounded-2 login-content">
              <div>
                <div className="text-center mx-auto mb-1">
                  <img src={Logo} alt="logo" />
                </div>
                <h2 className="loginHead fw-bold fs-2 fa">Reset Password</h2>
                <p className="text-muted">
                  Please Enter Your OTP or Check Your Inbox
                </p>
              </div>
              <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
                <div className="input-group formIn my-3 bg-lighter p-1 d-flex  align-items-center justify-content-center">
                  <img src={resetMail} alt="..." className="loginIcons" />
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
                  <p className="text-white handleErr fw-bold p-1">
                    Email Is Required
                  </p>
                )}
                <div className="input-group formIn my-3 bg-lighter p-1 d-flex  align-items-center justify-content-center">
                  <img src={resetPass} alt="..." className="loginIcons" />
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
                  <p className="text-white handleErr fw-bold p-1">
                    Password Is Required
                  </p>
                )}
                <div className="input-group formIn my-3 bg-lighter p-1 d-flex  align-items-center justify-content-center">
                  <img src={resetPass} alt="..." className="loginIcons" />
                  <input
                    type="password"
                    className="form-control bg-transparent border-0 ms-2"
                    placeholder="Enter Your Confirm Password"
                    {...register("confirmPassword", {
                      required: "confirmPassword is required",
                    })}
                  />
                </div>
                {errors?.confirmPassword && (
                  <p className="text-white handleErr fw-bold p-1">
                    ConfirmPassword Is Required
                  </p>
                )}
                <div className="input-group formIn my-3 bg-lighter p-1 d-flex  align-items-center justify-content-center">
                  <img src={Otp} alt="..." className="loginIcons" />
                  <input
                    type="text"
                    className="form-control bg-transparent border-0 ms-2"
                    placeholder="Enter OTP"
                    {...register("seed", {
                      required: "OTP is required",
                    })}
                  />
                </div>
                {errors?.seed && (
                  <p className="text-white handleErr fw-bold p-1">
                    OTP Is Required
                  </p>
                )}

                <div className="mt-3">
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
                        <InfinitySpin
                          visible={true}
                          width="200"
                          color="#4fa94d"
                          ariaLabel="infinity-spin-loading"
                        />
                      ) : (
                        "Reset Password"
                      )}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ResetPass;
