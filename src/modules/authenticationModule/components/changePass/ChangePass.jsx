/* eslint-disable react/prop-types */
import axios from "axios";
import {
  FailToast,
  SuccessToast,
} from "../../../sharedModule/components/toasts/Toast";
import { mainURL } from "../../../../utils";
import { Button, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import changePassLogo from "../../../../assets/imgs/logo.png";
import { useNavigate } from "react-router-dom";

const ChangePass = ({ openChangeModal, setOpenChangeModal }) => {
  const handleClose = () => setOpenChangeModal(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      let res = await axios.put(`${mainURL}/Users/ChangePassword`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      SuccessToast(res.data.message);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      FailToast(error.response.data.message);
    }
  };

  return (
    <>
      <Modal show={openChangeModal} onHide={handleClose} className="m-auto">
        <Modal.Header>
          <Button
            variant="outline-danger ms-auto rounded-circle"
            onClick={() => handleClose()}
          >
            <i className="fa fa-close"></i>
          </Button>
        </Modal.Header>
        <Modal.Body className="px-3">
          <div className="text-center mb-3">
            <img src={changePassLogo} alt="..." />
          </div>
          <div className="text-start my-3">
            <h3 className="fw-bold">Change Password </h3>
            <p className="text-muted">Enter your details below</p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="text-start my-5">
            <div className="input-group formIn my-3 bg-lighter p-2 d-flex  align-items-center justify-content-center">
              <i className="fa-solid fa-lock fa-2x me-1 text-success"></i>
              <input
                type="password"
                className="form-control bg-transparent border-0 ms-2"
                placeholder="Enter Your oldPassword"
                {...register("oldPassword", {
                  required: "oldPassword is required",
                })}
              />
            </div>
            {errors?.oldPassword && (
              <p className="text-white handleErr fw-bold p-2">
                {errors.oldPassword.message}
              </p>
            )}
            <div className="input-group formIn my-3 bg-lighter p-2 d-flex  align-items-center justify-content-center">
              <i className="fa-solid fa-unlock fa-2x me-1 text-success"></i>
              <input
                type="text"
                className="form-control bg-transparent border-0 ms-2"
                placeholder="Enter Your newPassword"
                {...register("newPassword", {
                  required: "newPassword is required",
                })}
              />
            </div>
            {errors?.newPassword && (
              <p className="text-white handleErr fw-bold p-2">
                {errors.newPassword.message}
              </p>
            )}
            <div className="input-group formIn my-3 bg-lighter p-2 d-flex  align-items-center justify-content-center">
              <i className="fa-solid fa-lock-open fa-2x me-1 text-success"></i>
              <input
                type="text"
                className="form-control bg-transparent border-0 ms-2"
                placeholder="confirmNewPassword"
                {...register("confirmNewPassword", {
                  required: "confirmNewPassword is required",
                })}
              />
            </div>
            {errors?.confirmNewPassword && (
              <p className="text-white handleErr fw-bold p-2">
                {errors.confirmNewPassword.message}
              </p>
            )}
            <div className="text-end me-auto w-100">
              <Button variant="success" type="submit" className="w-100">
                Change Password
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ChangePass;
