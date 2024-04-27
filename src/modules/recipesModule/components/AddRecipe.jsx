/* eslint-disable react/prop-types */
import axios from "axios";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { mainURL } from "../../../utils";

const AddRecipe = ({ setaAddBtnClicked }) => {
  const token = localStorage.getItem("token");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      let res = await axios.post(`${mainURL}/Recipe/`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(res);
    } catch (error) {
      console.log(error);
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

          <div className="d-flex justify-content-end mt-2 gap-4">
            <button className="btn btn-outline-success px-5 py-2">
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
