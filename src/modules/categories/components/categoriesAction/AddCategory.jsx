/* eslint-disable react/prop-types */
import axios from "axios";
import { mainURL } from "../../../../utils";

import { Button, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import {
  FailToast,
  SuccessToast,
} from "../../../sharedModule/components/toasts/Toast";

const AddCategory = ({
  getAllCategories,
  addBtnClicked,
  setaAddBtnClicked,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      let res = await axios.post(`${mainURL}/Category/`, data, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      SuccessToast(
        res.data.message || "You Deleted This Category Successfully"
      );
      getAllCategories();
      handleClose();
    } catch (error) {
      FailToast(error.response.data.message);
    }
  };
  const handleClose = () => setaAddBtnClicked(false);

  return (
    <>
      <section>
        <Modal
          show={addBtnClicked}
          onHide={handleClose}
          className="text-center m-auto"
        >
          <Modal.Header>
            <h3>Add Category</h3>
            <Button
              variant="outline-danger ms-auto rounded-circle"
              onClick={() => handleClose()}
            >
              <i className="fa fa-close"></i>
            </Button>
          </Modal.Header>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Modal.Body>
              <input
                type="text"
                placeholder="Enter Category Name"
                className="form-control"
                {...register("name", { required: "Enter Category Name" })}
              />
              {errors?.name && (
                <p className="text-white handleErr fw-bold p-2 mt-2">
                  Name Is Required
                </p>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="success" type="submit" className="px-4">
                Save
              </Button>
            </Modal.Footer>
          </form>
        </Modal>
      </section>
    </>
  );
};

export default AddCategory;
