/* eslint-disable react/prop-types */
import axios from "axios";
import { useContext } from "react";
import { Button, Modal } from "react-bootstrap";
import PopUpImag from "../../../assets/imgs/no-data.png";
import { AuthContext } from "../../../context/AuthContext";
import { mainURL } from "../../../utils";
import {
  FailToast,
  SuccessToast,
} from "../../sharedModule/components/toasts/Toast";

const ViewDeleteUser = ({
  getAllUsers,
  id,
  openDeleteModal,
  setOpenDeleteModal,
  filterObj,
  viewedUser,
  viewModal,
  setViewModal,
}) => {
  const { RequestAuthorization } = useContext(AuthContext);
  const handleClose = () => {
    setOpenDeleteModal(false);
    setViewModal(false);
  };

  const handleDelete = async (id) => {
    try {
      let res = await axios.delete(`${mainURL}/Users/${id}`, {
        headers: { ...RequestAuthorization },
      });
      SuccessToast(
        res.data.message || "You Deleted This Category Successfully"
      );
      getAllUsers(filterObj, 10, 1);
    } catch (error) {
      FailToast(error.response.data.message);
    }
  };

  console.log("viewedUser:", viewedUser); // Debugging log to check viewedUser

  return (
    <>
      <Modal
        show={viewModal || openDeleteModal}
        onHide={handleClose}
        className="text-center m-auto"
      >
        <Modal.Header>
          <h3>
            <span className="text-danger me-1">
              {viewModal ? "View" : "Delete"}
            </span>
            User
          </h3>
          <Button
            variant="outline-danger ms-auto rounded-circle"
            onClick={() => handleClose()}
          >
            <i className="fa fa-close"></i>
          </Button>
        </Modal.Header>
        <Modal.Body>
          {openDeleteModal && (
            <>
              {viewedUser?.imagePath ? (
                <img
                  src={`https://upskilling-egypt.com:3006/${viewedUser.imagePath}`}
                  alt="User Image"
                  className="m-auto h-100 w-100"
                />
              ) : (
                <img src={PopUpImag} alt="No Data" className="m-auto" />
              )}
              <h4 className="fw-bold my-3">
                Delete
                <span className="text-danger ms-2">{viewedUser.userName}</span>
              </h4>
              <p className="text-muted fa-italic">
                Are you sure you want to delete this item? If you are sure just
                click on delete it.
              </p>
            </>
          )}
          {viewModal && (
            <div className="text-start">
              {viewedUser?.imagePath ? (
                <img
                  src={`https://upskilling-egypt.com:3006/${viewedUser.imagePath}`}
                  alt="User Image"
                  className="m-auto h-100 w-100"
                />
              ) : (
                <img src={PopUpImag} alt="No Data" className="m-auto" />
              )}
              <p className="my-2 text-secondary">
                <i className="fa-regular fa-user mx-2"></i>Name:
                <span className="text-black mx-2 fw-bold">
                  {viewedUser?.userName}
                </span>
              </p>
              <p className="my-2 text-secondary">
                <i className="fa-regular fa-envelope mx-2"></i>Email:
                <span className="text-black mx-2 fw-bold">
                  {viewedUser?.email}
                </span>
              </p>
              <p className="my-2 text-secondary">
                <i className="fa-solid fa-mobile-screen-button mx-2"></i>Phone:
                <span className="text-black mx-2 fw-bold">
                  {viewedUser?.phoneNumber}
                </span>
              </p>
              <p className="my-2 text-secondary">
                <i className="fa-solid fa-list-check mx-2"></i>Role:
                <span className="text-black mx-2 fw-bold">
                  {viewedUser?.group?.name}
                </span>
              </p>
            </div>
          )}
        </Modal.Body>

        {openDeleteModal ? (
          <Button
            variant="outline-danger ms-auto"
            onClick={() => {
              handleDelete(id);
              handleClose();
            }}
          >
            Delete
          </Button>
        ) : (
          ""
        )}
      </Modal>
    </>
  );
};

export default ViewDeleteUser;
