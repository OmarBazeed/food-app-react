/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import recipesImg from "../../../../assets/imgs/recipesImg.png";
import { mainURL } from "../../../../utils";
import Header from "../../../sharedModule/components/header/Header";
import NoData from "../../../sharedModule/components/noData/NoData";
import AddUpdateCategory from "../categoriesAction/AddUpdateCategory";
import DeleteCategory from "../categoriesAction/DeleteCategory";
const CategoriesList = () => {
  const [categories, setCategories] = useState([]);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [addBtnClicked, setaAddBtnClicked] = useState(false);
  const [updateBtnClicked, setUpdateBtnClicked] = useState(false);
  const [updatedCategory, setUpdatedCategory] = useState({});
  const [paginationNum, setPaginationNum] = useState([]);
  const [catName, setCatName] = useState("");
  const token = localStorage.getItem("token");
  const [id, setId] = useState("");

  const getAllCategories = useCallback(
    async (catName, pSize, pNumbers) => {
      try {
        let res = await axios.get(
          `${mainURL}/Category/?pageSize=${pSize}&pageNumber=${pNumbers}`,
          {
            headers: { Authorization: `Bearer ${token}` },
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
    },
    [token]
  );

  const handleChangeName = (e) => {
    const { value } = e.target;
    setCatName(value);
  };
  useEffect(() => {
    getAllCategories(catName, 10, 1);
  }, [getAllCategories, catName]);

  return (
    <>
      {openDeleteModal && (
        <DeleteCategory
          getAllCategories={getAllCategories}
          id={id}
          openDeleteModal={openDeleteModal}
          setOpenDeleteModal={setOpenDeleteModal}
          catName={catName}
        />
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
        <div className="redirect d-flex align-items-center justify-content-between p-4 mt-3">
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

        <div className="w-100 p-4">
          <Table hover responsive>
            <thead style={{ backgroundColor: "blue" }}>
              <tr>
                <th>Item Name</th>
                <th></th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.length > 0 ? (
                categories.map((ele) => {
                  const date = new Date(ele?.creationDate).toLocaleString();
                  return (
                    <tr key={ele?.id}>
                      <td>{ele?.name}</td>
                      <td>{date}</td>
                      <td>
                        <i
                          className="me-3 fa-regular fa-eye text-warning"
                          type="button"
                        ></i>
                        <i
                          className="me-3 fa-solid fa-pen-to-square text-primary"
                          onClick={() => {
                            setUpdateBtnClicked(true);
                            setId(ele.id);
                            setUpdatedCategory(ele);
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
                            setId(ele.id);
                          }}
                        ></i>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <div className="w-100 m-auto text-center">
                  <NoData />
                </div>
              )}
            </tbody>
          </Table>
        </div>

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
