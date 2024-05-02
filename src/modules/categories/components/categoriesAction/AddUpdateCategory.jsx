/* eslint-disable react/prop-types */
import axios from "axios";
import { mainURL } from "../../../../utils";

import { Button, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import {
  FailToast,
  SuccessToast,
} from "../../../sharedModule/components/toasts/Toast";

const AddUpdateCategory = ({
  getAllCategories,
  addBtnClicked,
  setaAddBtnClicked,
  updateBtnClicked,
  setUpdateBtnClicked,
  updatedCategory,
  name,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    addBtnClicked && savingAddCategory(data);
    updateBtnClicked && savingUpdateCategory(data, updatedCategory.id);
  };

  const savingAddCategory = async (data) => {
    try {
      let res = await axios.post(`${mainURL}/Category/`, data, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      SuccessToast(
        res.data.message || "You Deleted This Category Successfully"
      );
      getAllCategories(name, 10, 1);
      handleClose();
    } catch (error) {
      FailToast(error.response.data.message);
    }
  };
  const savingUpdateCategory = async (data, id) => {
    try {
      let res = await axios.put(`${mainURL}/Category/${id}`, data, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      SuccessToast(
        res.data.message || "You Deleted This Category Successfully"
      );
      getAllCategories(name, 10, 1);
      handleClose();
    } catch (error) {
      FailToast(error.response.data.message);
    }
  };

  const handleClose = () => {
    setaAddBtnClicked(false);
    setUpdateBtnClicked(false);
  };

  return (
    <>
      <section>
        <Modal
          show={addBtnClicked || updateBtnClicked}
          onHide={handleClose}
          className="text-center m-auto"
        >
          <Modal.Header>
            <h3>{addBtnClicked ? "Add Category" : "Update Category"}</h3>
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
                defaultValue={updateBtnClicked ? updatedCategory.name : ""}
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

export default AddUpdateCategory;
