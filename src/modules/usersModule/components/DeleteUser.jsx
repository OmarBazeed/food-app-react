/* eslint-disable react/prop-types */
import axios from "axios";
import PopUpImag from "../../../assets/imgs/no-data.png";

import { Button, Modal } from "react-bootstrap";

import { mainURL } from "../../../utils";
import {
  FailToast,
  SuccessToast,
} from "../../sharedModule/components/toasts/Toast";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";

const DeleteUser = ({
  getAllUsers,
  id,
  openDeleteModal,
  setOpenDeleteModal,
  filterObj,
}) => {
  const handleClose = () => setOpenDeleteModal(false);
  const { RequestAuthorization } = useContext(AuthContext);
  const handleDelte = async (id) => {
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

  return (
    <>
      <section>
        <Modal
          show={openDeleteModal}
          onHide={handleClose}
          className="text-center m-auto"
        >
          <Modal.Header>
            <Button
              variant="outline-danger ms-auto rounded-circle"
              onClick={() => handleClose()}
            >
              <i className="fa fa-close"></i>
            </Button>
          </Modal.Header>
          <Modal.Body>
            <img src={PopUpImag} alt="..." />
            <h4 className="fw-bold my-3">Delete This Item ?</h4>
            <p className="text-muted">
              are you sure you want to delete this item ? if you are sure just
              click on delete it
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="outline-danger"
              onClick={() => {
                handleDelte(id);
                handleClose();
              }}
            >
              Delete
            </Button>
          </Modal.Footer>
        </Modal>
      </section>
    </>
  );
};

export default DeleteUser;
