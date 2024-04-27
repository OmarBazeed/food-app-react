/* eslint-disable react/prop-types */
import axios from "axios";
import PopUpImag from "../../../../assets/imgs/no-data.png";
import { mainURL } from "../../../../utils";

import { Button, Modal } from "react-bootstrap";
import { FailToast } from "../toasts/Toast";

const DeleteModal = ({
  getAllRecipes,
  id,
  openDeleteModal,
  setOpenDeleteModal,
}) => {
  const handleClose = () => setOpenDeleteModal(false);

  const handleDelte = async (id) => {
    try {
      await axios.delete(`${mainURL}/Recipe/${id}`);
      getAllRecipes();
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

export default DeleteModal;