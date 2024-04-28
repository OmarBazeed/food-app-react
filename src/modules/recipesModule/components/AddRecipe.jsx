/* eslint-disable react/prop-types */
import axios from "axios";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { mainURL } from "../../../utils";
import {
  FailToast,
  SuccessToast,
} from "../../sharedModule/components/toasts/Toast";

const AddRecipe = ({ setaAddBtnClicked, getAllRecipes }) => {
  const token = localStorage.getItem("token");

  const handleCancel = () => {
    setaAddBtnClicked(false);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("tagId", data.tagId);
      formData.append("price", data.price);
      formData.append("categoriesIds", data.categoriesIds);
      formData.append("description", data.description);
      formData.append("recipeImage", data.recipeImage[0]);

      let res = await axios.post(`${mainURL}/Recipe/`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      SuccessToast(res.data.message);
      reset();
      getAllRecipes();
    } catch (error) {
      FailToast(error.response.data.message);
    }
  };

  return (
    <div className="p-3 d-flex flex-column align-items-start justify-content-center">
      <div className="redirect d-flex align-items-center justify-content-between p-4 mt-3">
        <div>
          <h4 className="fw-bold">
            Fill the <span className="text-success"> Recipes </span> !
          </h4>
          <p className="">
            you can now fill the meals easily using the table and form , <br />
            click here and sill it with the table !
          </p>
        </div>
        <div>
          <button className="btn btn-success p-2">
            <NavLink
              to="/dashboard/recipes"
              className="text-light text-decoration-none"
              onClick={() => setaAddBtnClicked(false)}
            >
              Fill Recipes <i className="fa-solid fa-arrow-right-long ms-2"></i>
            </NavLink>
          </button>
        </div>
      </div>

      <div className="w-75 m-auto text-start mt-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Recipe Name"
              {...register("name", {
                required: "Name Is Required",
              })}
            />
          </div>
          {errors?.name && (
            <p className="text-white handleErr fw-bold p-2">Name Is Required</p>
          )}
          <div className="mb-3">
            <select
              className="form-select"
              aria-label="Default select example"
              {...register("tagId", {
                required: "TagId Is Required",
              })}
            >
              <option selected>Tag</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </select>
          </div>
          {errors?.tagId && (
            <p className="text-white handleErr fw-bold p-2">
              tagId Is Required
            </p>
          )}
          <div className="mb-3 priceInput">
            <input
              type="text"
              className="form-control"
              {...register("price", {
                required: "Price Is Required",
              })}
            />
          </div>
          {errors?.price && (
            <p className="text-white handleErr fw-bold p-2">
              price Is Required
            </p>
          )}
          <div className="mb-3">
            <label className="" htmlFor="catogery">
              Category
            </label>
            <input
              type="text"
              className="form-control"
              id="catogery"
              {...register("categoriesIds", {
                required: "CategoriesId Is Required",
              })}
            />
          </div>
          {errors?.categoriesIds && (
            <p className="text-white handleErr fw-bold p-2">
              CategoriesId Is Required
            </p>
          )}
          <div className="form-floating">
            <textarea
              className="form-control"
              placeholder="Leave a comment here"
              id="floatingTextarea"
              style={{ height: "200px" }}
              {...register("description", {
                required: "Description Is Required",
              })}
            ></textarea>
            <label htmlFor="floatingTextarea">
              description <span className="text-danger">*</span>
            </label>
          </div>
          {errors?.description && (
            <p className="text-white handleErr fw-bold p-2">
              description Is Required
            </p>
          )}

          <div className="mb-3">
            <input
              type="file"
              className="form-control"
              {...register("recipeImage")}
            />
          </div>
          {errors?.recipeImage && (
            <p className="text-white handleErr fw-bold p-2">
              recipeImage Is Required
            </p>
          )}

          <div className="d-flex justify-content-between mt-2 gap-4">
            <button
              className="btn btn-outline-success px-5 py-2"
              onClick={() => handleCancel()}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-success px-5 py-2">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRecipe;
