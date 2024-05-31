/* eslint-disable react/prop-types */
import axios from "axios";
import PopUpImag from "../../../../assets/imgs/no-data.png";
import { mainURL } from "../../../../utils";

import { useContext } from "react";
import { Button, Modal } from "react-bootstrap";
import { AuthContext } from "../../../../context/AuthContext";
import {
  FailToast,
  SuccessToast,
} from "../../../sharedModule/components/toasts/Toast";

const DeleteCategory = ({
  getAllCategories,
  id,
  openDeleteModal,
  setOpenDeleteModal,
  openViewModal,
  setOpenViewModal,
  updatedCategory,
  catName,
}) => {
  const handleClose = () => {
    setOpenDeleteModal(false);
    setOpenViewModal(false);
  };
  const { RequestAuthorization } = useContext(AuthContext);
  const handleDelte = async (id) => {
    try {
      let res = await axios.delete(`${mainURL}/Category/${id}`, {
        headers: { ...RequestAuthorization },
      });
      SuccessToast(
        res.data.message || "You Deleted This Category Successfully"
      );
      getAllCategories(catName, 10, 1);
    } catch (error) {
      FailToast(error.response.data.message);
    }
  };
  return (
    <>
      <Modal
        show={openDeleteModal || openViewModal}
        onHide={handleClose}
        className="text-center m-auto"
      >
        <Modal.Header>
          <h3>
            <span className="text-danger me-2">
              {openViewModal ? "View" : "Delete"}
            </span>
            Category
          </h3>
          <Button
            variant="outline-danger ms-auto rounded-circle"
            onClick={() => handleClose()}
          >
            <i className="fa fa-close"></i>
          </Button>
        </Modal.Header>
        <Modal.Body>
          {openDeleteModal ? (
            <>
              <img src={PopUpImag} alt="..." className="m-auto text-center" />
              <h4 className="fw-bold my-3">
                Delete This
                <sapn className="text-danger mx-1">{updatedCategory.name}</sapn>
                ?
              </h4>
              <p className="text-muted">
                are you sure you want to delete this item ? if you are sure just
                click on delete it
              </p>
            </>
          ) : (
            ""
          )}
          {openViewModal ? (
            <>
              <p className="text-secondary text-start">
                <i className="fa-solid fa-layer-group mx-1"></i> Name :
                <span className="text-black fw-bold mx-2">
                  {updatedCategory.name}
                </span>
              </p>
              <p className="text-secondary text-start">
                <i className="fa-regular fa-calendar-days mx-1"></i>
                Modification Date :
                <span className="text-black fw-bold mx-2">
                  {new Date(
                    updatedCategory.modificationDate
                  ).toLocaleDateString("en-US")}
                </span>
              </p>
            </>
          ) : (
            ""
          )}
        </Modal.Body>
        {openDeleteModal ? (
          <Button
            variant="outline-danger ms-auto"
            onClick={() => {
              handleDelte(id);
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

export default DeleteCategory;
