/* eslint-disable react/prop-types */
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { mainURL } from "../../../../../../utils";
import {
  FailToast,
  SuccessToast,
} from "../../../../../sharedModule/components/toasts/Toast";
import { AuthContext } from "../../../../../../context/AuthContext";

const AddUpdateRecipe = ({
  addBtnClicked,
  setaAddBtnClicked,
  getAllRecipes,
  updateBtnClicked,
  setUpdateBtnClicked,
  UpdatedRecipe: { id, name, price, description, tag, category } = {},
}) => {
  const [tagsList, setTagsList] = useState([]);
  const [categoriesList, setCategories] = useState([]);
  const { RequestAuthorization } = useContext(AuthContext);

  const getAllTags = async () => {
    try {
      let res = await axios.get(`${mainURL}/tag/`);
      setTagsList(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllCategories = async () => {
    try {
      let res = await axios.get(
        `${mainURL}/Category/?pageSize=10&pageNumber=1`,
        { headers: { ...RequestAuthorization } }
      );
      setCategories(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCancel = () => {
    setUpdateBtnClicked(false);
    setaAddBtnClicked(false);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("tagId", data.tagId);
    formData.append("price", data.price);
    formData.append("categoriesIds", data.categoriesIds);
    formData.append("description", data.description);
    formData.append("recipeImage", data.recipeImage[0]);
    if (addBtnClicked) {
      await SavingAddRecipe(formData);
    } else if (updateBtnClicked) {
      await SavingUpdateRecipe(formData, id);
    }
  };

  const SavingAddRecipe = async (formData) => {
    try {
      let res = await axios.post(`${mainURL}/Recipe/`, formData, {
        headers: {
          ...RequestAuthorization,
          "Content-Type": "multipart/form-data",
        },
      });
      SuccessToast(res.data.message);
      reset();
      getAllRecipes("", 10, 1);
      handleCancel();
    } catch (error) {
      FailToast(error.response.data.message);
    }
  };

  const SavingUpdateRecipe = async (formData, id) => {
    try {
      await axios.put(`${mainURL}/Recipe/${id}`, formData, {
        headers: {
          ...RequestAuthorization,
          "Content-Type": "multipart/form-data",
        },
      });
      SuccessToast("You Updated This Recipe Successfully");
      reset();
      getAllRecipes("", 10, 1);
      handleCancel();
    } catch (error) {
      FailToast(error.response.data.message);
    }
  };

  useEffect(() => {
    getAllTags();
    getAllCategories();
  }, []);

  useEffect(() => {
    if (updateBtnClicked) {
      reset({
        name,
        price,
        description,
        tagId: tag?.id,
        categoriesIds: category?.map((c) => c.id),
      });
    }
  }, [updateBtnClicked, name, price, description, tag, category, reset]);

  return (
    <div className="p-3 d-flex flex-column align-items-start justify-content-center">
      <div className="redirect d-flex flex-wrap align-items-center justify-content-between p-4 mt-3">
        <div className="">
          <h4 className="fw-bold">
            Fill the <span className="text-success"> Recipes </span> !
          </h4>
          <p className="">
            you can now fill the meals easily using the table and form , <br />
            click here and sill it with the table !
          </p>
        </div>
        <div>
          <button
            className="btn btn-success p-2"
            onClick={() => handleCancel()}
          >
            <NavLink
              to="/dashboard/recipes"
              className="text-light text-decoration-none"
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
              <option value="" disabled>
                Tag
              </option>
              {tagsList?.length > 0 &&
                tagsList.map((taG) => (
                  <option key={taG.id} value={taG.id}>
                    {taG.name}
                  </option>
                ))}
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
            <select
              className="form-select"
              aria-label="Default select example"
              {...register("categoriesIds", {
                required: "CategoriesIds Is Required",
              })}
              id="catogery"
            >
              <option value="" disabled>
                Category
              </option>
              {categoriesList?.length > 0 &&
                categoriesList.map((cate) => (
                  <option key={cate.id} value={cate.id}>
                    {cate.name}
                  </option>
                ))}
            </select>
            {errors?.categoriesIds && (
              <p className="text-white handleErr fw-bold p-2">
                CategoriesId Is Required
              </p>
            )}
          </div>

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
              type="button"
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

export default AddUpdateRecipe;
