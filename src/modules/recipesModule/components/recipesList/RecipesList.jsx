/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import recipesImg from "../../../../assets/imgs/recipesImg.png";
import { mainURL } from "../../../../utils";
import Header from "../../../sharedModule/components/header/Header";
import NoData from "../../../sharedModule/components/noData/NoData";
import DeleteModal from "../../../sharedModule/components/popUpModal/DeleteModal";
import AddUpdateRecipe from "./AddUpdateRecipe";

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
  const token = localStorage.getItem("token");
  const loggedUser = JSON.parse(localStorage.getItem("LoggedUserInfo"));
  const [filterObj, setFilterObj] = useState({
    name: "",
    tagId: "",
    categoryId: "",
  });

  const getAllRecipes = useCallback(
    async (filterObj, pSize, pNumber) => {
      try {
        let res = await axios.get(
          `${mainURL}/Recipe/?pageSize=${pSize}&pageNumber=${pNumber}`,
          {
            headers: { Authorization: `Bearer ${token}` },
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
    },
    [token]
  );

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
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setCategories(res.data.data);
      } catch (error) {
        console.log(error);
      }
    }
  }, [token]);

  useEffect(() => {
    getAllTags();
    getAllCategories();
    getAllRecipes(filterObj, 10, 1);
  }, [filterObj]);

  return (
    <>
      {openDeleteModal || viewBtnClicked ? (
        <DeleteModal
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
            imgSource={recipesImg}
          />
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

          <div className="p-4 m-auto w-100 recipeTable">
            <Table hover>
              <thead>
                <tr>
                  <th>Item Name</th>
                  <th>Image</th>
                  <th>Price</th>
                  <th>Description</th>
                  <th>Tag</th>
                  <th>Category</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {recipes.length > 0 ? (
                  recipes.map((ele) => {
                    return (
                      <tr key={ele?.id} className="tableTr">
                        <td>{ele?.name}</td>
                        <td>
                          {ele?.imagePath ? (
                            <img
                              src={`https://upskilling-egypt.com:3006/${ele.imagePath}`}
                              alt="..."
                              style={{ width: "50px", height: "50px" }}
                            />
                          ) : (
                            "no Image"
                          )}
                        </td>
                        <td>{ele?.price}</td>
                        <td>{ele?.description}</td>
                        <td>{ele?.tag.name}</td>
                        <td>{ele?.category[0]?.name}</td>
                        <td>
                          <button
                            className="btn btn-transparent viewBtn"
                            onClick={() => {
                              setViewBtnClicked(true);
                              setUpdatedRecipe(ele);
                            }}
                            // disabled={favorites.includes(ele.id)}
                          >
                            <i
                              className="me-3 fa-regular fa-eye text-warning"
                              type="button"
                            ></i>
                          </button>

                          {loggedUser.group.name == "SystemUser" ? (
                            ""
                          ) : (
                            <>
                              <i
                                className="me-3 fa-solid fa-pen-to-square text-primary"
                                onClick={() => {
                                  setUpdateBtnClicked(true);
                                  setUpdatedRecipe(ele);
                                }}
                                type="button"
                              ></i>
                              <i
                                className="me-3 fa-solid fa-trash text-danger"
                                type="button"
                                data-bs-toggle="modal"
                                data-bs-target="#staticBackdrop"
                                onClick={() => {
                                  setOpenDeleteModal(true);
                                  setUpdatedRecipe(ele);
                                }}
                              ></i>
                            </>
                          )}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={7} className="bg-transparent m-auto">
                      <NoData />
                    </td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>

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
