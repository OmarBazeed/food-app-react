/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useCallback, useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../../../../context/AuthContext";
import { mainURL } from "../../../../../../utils";
import Header from "../../../../../sharedModule/components/header/Header";
import NoData from "../../../../../sharedModule/components/noData/NoData";
import AddUpdateRecipe from "../recipesActions/AddUpdateRecipe";
import ViewDeleteRecipe from "../recipesActions/ViewDeleteRecipe";
import "./Recipes.modules.css";

const RecipesList = () => {
  const [recipes, setRecipes] = useState([]);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [addBtnClicked, setaAddBtnClicked] = useState(false);
  const [updateBtnClicked, setUpdateBtnClicked] = useState(false);
  const [viewBtnClicked, setViewBtnClicked] = useState(false);
  const [UpdatedRecipe, setUpdatedRecipe] = useState({});
  const [tagsList, setTagsList] = useState([]);
  const [categoriesList, setCategories] = useState([]);
  const [paginationNum, setPaginationNum] = useState([]);
  const { loggedUserInfo, RequestAuthorization } = useContext(AuthContext);
  const [filterObj, setFilterObj] = useState({
    name: "",
    tagId: "",
    categoryId: "",
  });

  const getAllRecipes = useCallback(async (filterObj, pSize, pNumber) => {
    try {
      let res = await axios.get(
        `${mainURL}/Recipe/?pageSize=${pSize}&pageNumber=${pNumber}`,
        {
          headers: { ...RequestAuthorization },
          params: {
            name: filterObj?.name,
            tagId: filterObj?.tagId,
            categoryId: filterObj?.categoryId,
          },
        }
      );
      const FavsArr = JSON.parse(localStorage.getItem("favsArr"));
      if (!FavsArr || FavsArr.length === 0) {
        setRecipes(res.data.data);
      } else {
        const filteredRecipes = res.data.data.filter(
          (recipe) => !FavsArr.includes(recipe.id)
        );
        setRecipes(filteredRecipes);
      }

      setPaginationNum(
        Array(res.data.totalNumberOfPages)
          .fill()
          .map((_, i) => i + 1)
      );
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleFilterObj = (e) => {
    const { id, value } = e.target;
    id === "Name" &&
      setFilterObj((prevFilterObj) => ({ ...prevFilterObj, name: value }));
    id === "tagId" &&
      setFilterObj((prevFilterObj) => ({ ...prevFilterObj, tagId: value }));
    id === "categoryId" &&
      setFilterObj((prevFilterObj) => ({
        ...prevFilterObj,
        categoryId: value,
      }));
  };

  const getAllTags = useCallback(async () => {
    try {
      let res = await axios.get(`${mainURL}/tag/`);
      setTagsList(res.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  const getAllCategories = useCallback(async () => {
    {
      try {
        let res = await axios.get(
          `${mainURL}/Category/?pageSize=10&pageNumber=1`,
          {
            headers: { ...RequestAuthorization },
          }
        );
        setCategories(res.data.data);
      } catch (error) {
        console.log(error);
      }
    }
  }, []);

  useEffect(() => {
    getAllTags();
    getAllCategories();
    getAllRecipes(filterObj, 10, 1);
  }, [filterObj]);

  return (
    <>
      {openDeleteModal || viewBtnClicked ? (
        <ViewDeleteRecipe
          getAllRecipes={getAllRecipes}
          openDeleteModal={openDeleteModal}
          setOpenDeleteModal={setOpenDeleteModal}
          filterObj={filterObj}
          UpdatedRecipe={UpdatedRecipe}
          viewBtnClicked={viewBtnClicked}
          setViewBtnClicked={setViewBtnClicked}
          recipes={recipes}
          setRecipes={setRecipes}
        />
      ) : (
        ""
      )}

      {addBtnClicked || updateBtnClicked ? (
        <AddUpdateRecipe
          addBtnClicked={addBtnClicked}
          setaAddBtnClicked={setaAddBtnClicked}
          updateBtnClicked={updateBtnClicked}
          setUpdateBtnClicked={setUpdateBtnClicked}
          UpdatedRecipe={UpdatedRecipe}
          getAllRecipes={getAllRecipes}
          filterObj={filterObj}
        />
      ) : (
        <div className="d-flex align-items-start flex-column w-100">
          <Header
            title="Recipes Items"
            description="You can now add your items that any user can order it from the Application and you can edit"
          />
          {loggedUserInfo?.group?.name != "SystemUser" ? (
            <>
              <div className="redirect d-flex align-items-center justify-content-between p-4 mt-3 flex-wrap">
                <div>
                  <h4 className="fw-bold">Recipe Table Details</h4>
                  <p className="">You can check all details</p>
                </div>
                <div>
                  <button
                    className="btn btn-success p-2"
                    onClick={() => setaAddBtnClicked(true)}
                  >
                    Add New Item
                  </button>
                </div>
              </div>
            </>
          ) : (
            ""
          )}

          <div className="filtaration container-fluid w-100 my-3 mx-0 mx-md-4">
            <div className="row column-gap-2 column-gap-sm-0 ">
              <div className="col-md-5 my-2 my-md-0">
                <input
                  type="text"
                  placeholder="Search By Recipe"
                  className="form-control"
                  id="Name"
                  onChange={(e) => handleFilterObj(e)}
                />
              </div>
              <div className="col-md-3 my-2 my-md-0">
                <select
                  className="form-control"
                  onChange={(e) => handleFilterObj(e)}
                  id="tagId"
                >
                  <option value="" selected>
                    CategoryId
                  </option>
                  {tagsList?.length > 0 &&
                    tagsList.map((tag) => {
                      return (
                        <option key={tag.id} value={tag.id}>
                          {tag.name}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="col-md-3 my-2 my-md-0">
                <select
                  className="form-control"
                  onChange={(e) => handleFilterObj(e)}
                  id="categoryId"
                >
                  <option value="" selected>
                    Tag
                  </option>
                  {categoriesList?.length > 0 &&
                    categoriesList.map((cate) => {
                      return (
                        <option key={cate.id} value={cate.id}>
                          {cate.name}
                        </option>
                      );
                    })}
                </select>
              </div>
            </div>
          </div>
          {/*responsive Recipes */}
          <div className="p-4 m-auto w-100">
            <div className={`recipesBody mt-4 `}>
              <ul className="responsive-table-recipes ">
                <li className="table-header  ">
                  <div className="col col-1 ">#</div>
                  <div role="button" className="col col-2">
                    Recipe Name
                  </div>
                  <div className="col col-3">Image</div>
                  <div className="col col-4">Price</div>
                  <div className="col col-5">Description</div>
                  <div className="col col-6">Category</div>
                  <div className="col col-7">Tag</div>
                  <div className="col col-8">Actions</div>
                </li>
              </ul>
              <ul className="responsive-table-recipes">
                {recipes.length > 0 ? (
                  recipes.map((item, index) => (
                    <li key={index} className="table-row  ">
                      <div className="col col-1 " data-label="#">
                        {index + 1}
                      </div>
                      <div className="col col-2 " data-label="Recipe Name :">
                        {item.name}
                      </div>
                      <div className="col col-3 " data-label="Image :">
                        {item.imagePath ? (
                          <img
                            className="recipe-img"
                            src={`https://upskilling-egypt.com:3006/${item.imagePath}`}
                            alt=""
                            style={{ width: "70px", height: "60px" }}
                          />
                        ) : (
                          "no image"
                        )}
                      </div>
                      <div className="col col-4 " data-label="Price :">
                        {item.price}
                      </div>
                      <div className="col col-5 " data-label="Description :">
                        {item.description}
                      </div>
                      <div className="col col-6 " data-label="Category :">
                        {item.category[0]?.name}
                      </div>
                      <div className="col col-7 " data-label="Tag :">
                        {item.tag.name}
                      </div>
                      <div className="col col-8 " data-label="Actions :">
                        <div className="btn-group">
                          {window.innerWidth < 650 ? (
                            ""
                          ) : (
                            <i
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                              className="fa-solid fa-ellipsis"
                            ></i>
                          )}

                          <ul
                            className={`${
                              window.innerWidth < 650
                                ? "d-flex  align-items-center  justify-content-center "
                                : "dropdown-menu dropdown-menu-end"
                            }  m-0 p-0`}
                          >
                            <li
                              onClick={() => {
                                setViewBtnClicked(true);
                                setUpdatedRecipe(item);
                              }}
                              role="button"
                              className="px-3 py-1 pt-2  "
                            >
                              <div className="dropdown-div ">
                                <i className="fa-regular fa-eye me-2"></i>
                                {window.innerWidth < 650 ? (
                                  ""
                                ) : (
                                  <span>View</span>
                                )}
                              </div>
                            </li>
                            {loggedUserInfo?.group?.name == "SuperAdmin" ? (
                              <li
                                role="button"
                                onClick={() => {
                                  setUpdateBtnClicked(true);
                                  setUpdatedRecipe(item);
                                }}
                                className="px-3 py-1"
                              >
                                <div role="button" className="dropdown-div">
                                  <i className="fa-regular fa-pen-to-square me-2 "></i>
                                  {window.innerWidth < 650 ? (
                                    ""
                                  ) : (
                                    <span>Edit</span>
                                  )}
                                </div>
                              </li>
                            ) : (
                              ""
                            )}
                            {loggedUserInfo?.group?.name == "SuperAdmin" ? (
                              <li
                                role="button"
                                onClick={() => {
                                  setOpenDeleteModal(true);
                                  setUpdatedRecipe(item);
                                }}
                                className="px-3 py-1 "
                              >
                                <div className="dropdown-div">
                                  <i className="fa-solid fa-trash-can me-2"></i>
                                  {window.innerWidth < 650 ? (
                                    ""
                                  ) : (
                                    <span>Delelte</span>
                                  )}
                                </div>
                              </li>
                            ) : (
                              ""
                            )}
                          </ul>
                        </div>
                      </div>
                    </li>
                  ))
                ) : (
                  <NoData />
                )}
              </ul>
            </div>
          </div>
          {/*END Responsive Recipes */}

          {/*Pagination */}
          <div className="paginationSec w-100">
            <nav aria-label="Page navigation example w-100">
              <ul className="pagination w-100 d-flex align-items-center justify-content-center">
                <li className="page-item">
                  <a className="page-link" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                  </a>
                </li>
                {paginationNum.map((ele) => {
                  return (
                    <li
                      className="page-item"
                      key={ele}
                      onClick={() => getAllRecipes(filterObj, 10, ele)}
                    >
                      <a className="page-link">{ele}</a>
                    </li>
                  );
                })}
                <li className="page-item">
                  <a className="page-link" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      )}
    </>
  );
};

export default RecipesList;
