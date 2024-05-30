/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useCallback, useContext, useEffect, useState } from "react";
import recipesImg from "../../../../assets/imgs/recipesImg.png";
import { AuthContext } from "../../../../context/AuthContext";
import { mainURL } from "../../../../utils";
import Header from "../../../sharedModule/components/header/Header";
import NoData from "../../../sharedModule/components/noData/NoData";
import AddUpdateCategory from "../categoriesAction/AddUpdateCategory";
import DeleteCategory from "../categoriesAction/DeleteCategory";
import "./Categories.modules.css";
const CategoriesList = () => {
  const [categories, setCategories] = useState([]);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openViewModal, setOpenViewModal] = useState(false);
  const [addBtnClicked, setaAddBtnClicked] = useState(false);
  const [updateBtnClicked, setUpdateBtnClicked] = useState(false);
  const [updatedCategory, setUpdatedCategory] = useState({});
  const [paginationNum, setPaginationNum] = useState([]);
  const [catName, setCatName] = useState("");
  const { RequestAuthorization } = useContext(AuthContext);
  const [id, setId] = useState("");

  const getAllCategories = useCallback(async (catName, pSize, pNumbers) => {
    try {
      let res = await axios.get(
        `${mainURL}/Category/?pageSize=${pSize}&pageNumber=${pNumbers}`,
        {
          headers: { ...RequestAuthorization },
          params: {
            name: catName,
          },
        }
      );
      setCategories(res.data.data);
      setPaginationNum(
        Array(res.data.totalNumberOfPages)
          .fill()
          .map((_, i) => i + 1)
      );
    } catch (error) {
      console.log(error);
    }
  }, []);

  const handleChangeName = (e) => {
    const { value } = e.target;
    setCatName(value);
  };
  useEffect(() => {
    getAllCategories(catName, 10, 1);
  }, [getAllCategories, catName]);

  return (
    <>
      {openDeleteModal || openViewModal ? (
        <DeleteCategory
          getAllCategories={getAllCategories}
          id={id}
          openDeleteModal={openDeleteModal}
          setOpenDeleteModal={setOpenDeleteModal}
          openViewModal={openViewModal}
          setOpenViewModal={setOpenViewModal}
          updatedCategory={updatedCategory}
          catName={catName}
        />
      ) : (
        ""
      )}
      {(addBtnClicked || updateBtnClicked) && (
        <AddUpdateCategory
          addBtnClicked={addBtnClicked}
          setaAddBtnClicked={setaAddBtnClicked}
          updateBtnClicked={updateBtnClicked}
          setUpdateBtnClicked={setUpdateBtnClicked}
          updatedCategory={updatedCategory}
          getAllCategories={getAllCategories}
          catName={catName}
        />
      )}
      <div className="d-flex align-items-start flex-column w-100">
        <Header
          title="Categories Items"
          description="You can now add your items that any user can order it from the Application and you can edit"
          imgSource={recipesImg}
        />
        <div className="redirect d-flex align-items-center justify-content-between p-4 mt-3 flex-wrap">
          <div>
            <h4 className="fw-bold">Category Table Details</h4>
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

        <div className="filtaration container-fluid w-100 my-3">
          <div className="row">
            <div className="col-md-8">
              <input
                type="text"
                placeholder="Search By Name"
                className="form-control"
                onChange={(e) => handleChangeName(e)}
              />
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
                  Category Name
                </div>
                <div className="col col-3"></div>
                <div className="col col-8">Actions</div>
              </li>
            </ul>
            <ul className="responsive-table-recipes">
              {categories.length > 0 ? (
                categories.map((item, index) => {
                  const date = new Date(item?.creationDate).toLocaleDateString(
                    "en-US"
                  );
                  return (
                    <li key={index} className="table-row  ">
                      <div className="col col-1 " data-label="#">
                        {index + 1}
                      </div>
                      <div className="col col-2 " data-label="Category Name :">
                        {item.name}
                      </div>
                      <div className="col col-7 " data-label="Tag :">
                        {date}
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
                                setOpenViewModal(true);
                                setUpdatedCategory(item);
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

                            <li
                              role="button"
                              onClick={() => {
                                setUpdateBtnClicked(true);
                                setId(item.id);
                                setUpdatedCategory(item);
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

                            <li
                              role="button"
                              onClick={() => {
                                setOpenDeleteModal(true);
                                setId(item.id);
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
                          </ul>
                        </div>
                      </div>
                    </li>
                  );
                })
              ) : (
                <NoData />
              )}
            </ul>
          </div>
        </div>
        {/*END Responsive categories */}

        <div className="w-100 paginationSec">
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
                    onClick={() => getAllCategories(catName, 10, ele)}
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
    </>
  );
};

export default CategoriesList;
