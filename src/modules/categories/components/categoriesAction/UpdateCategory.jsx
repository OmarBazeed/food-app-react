/* eslint-disable react/prop-types */
import axios from "axios";
import { mainURL } from "../../../../utils";

import { Button, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import {
  FailToast,
  SuccessToast,
} from "../../../sharedModule/components/toasts/Toast";

const UpdateCategory = ({
  updatedCategory,
  updateBtnClicked,
  setUpdateBtnClicked,
  getAllCategories,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      let res = await axios.put(
        `${mainURL}/Category/${updatedCategory.id}`,
        data,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );

      SuccessToast(
        res.data.message || "You Updated This Category Successfully"
      );
      getAllCategories();
      handleClose();
    } catch (error) {
      FailToast(error.response.data.message);
    }
  };
  const handleClose = () => setUpdateBtnClicked(false);

  return (
    <>
      <section>
        <Modal
          show={updateBtnClicked}
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
                defaultValue={updatedCategory?.name}
              />
              {errors?.name && (
                <p className="text-white handleErr fw-bold p-2 mt-2">
                  Name Is Required
                </p>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" type="submit" className="px-4">
                Save
              </Button>
            </Modal.Footer>
          </form>
        </Modal>
      </section>
    </>
  );
};

export default UpdateCategory;
