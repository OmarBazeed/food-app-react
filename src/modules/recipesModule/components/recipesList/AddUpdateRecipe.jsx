/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router-dom";
import { mainURL } from "../../../../utils";
import {
  FailToast,
  SuccessToast,
} from "../../../sharedModule/components/toasts/Toast";

const AddUpdateRecipe = ({
  addBtnClicked,
  setaAddBtnClicked,
  getAllRecipes,
  updateBtnClicked,
  setUpdateBtnClicked,
  UpdatedRecipe: { id, name, price, description, tag, category } = {},
  filterObj,
}) => {
  const token = localStorage.getItem("token");
  const [tagsList, setTagsList] = useState([]);
  const [categoriesList, setCategories] = useState([]);

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
        { headers: { Authorization: `Bearer ${token}` } }
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
    (await addBtnClicked) && SavingAddRecipe(formData);
    (await updateBtnClicked) && SavingUpdateRecipe(formData, id);
  };
  const SavingAddRecipe = async (formData) => {
    try {
      let res = await axios.post(`${mainURL}/Recipe/`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      SuccessToast(res.data.message);
      reset();
      getAllRecipes(filterObj, 10, 1);
      handleCancel();
    } catch (error) {
      FailToast(error.response.data.message);
    }
  };

  const SavingUpdateRecipe = async (formData, id) => {
    try {
      await axios.put(`${mainURL}/Recipe/${+id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      SuccessToast("You Updated This Recipe Successfully");
      reset();
      getAllRecipes(filterObj, 10, 1);
      handleCancel();
    } catch (error) {
      FailToast(error.response.data.message);
    }
  };

  useEffect(() => {
    getAllTags();
    getAllCategories();
  }, []);
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
              defaultValue={updateBtnClicked ? name : ""}
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
              defaultValue={tag?.name}
            >
              {addBtnClicked && (
                <option value="" selected disabled>
                  Tag
                </option>
              )}
              {tagsList?.length > 0 &&
                tagsList.map((taG) => {
                  return (
                    <option
                      key={taG.id}
                      value={taG.id}
                      selected={updateBtnClicked && tag.name == taG.name}
                    >
                      {taG.name}
                    </option>
                  );
                })}
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
              defaultValue={updateBtnClicked ? price : ""}
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
              defaultValue={category?.length > 0 ? category[0].name : ""}
            >
              {addBtnClicked && (
                <option value="" selected disabled>
                  Category
                </option>
              )}
              {categoriesList?.length > 0 &&
                categoriesList.map((cate) => {
                  return (
                    <option
                      key={cate.id}
                      value={cate.id}
                      selected={updateBtnClicked && cate.id == category[0]?.id}
                    >
                      {cate.id}
                    </option>
                  );
                })}
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
              defaultValue={updateBtnClicked ? description : ""}
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
