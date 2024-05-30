/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Usersimg from "../../../../assets/imgs/recipesImg.png";
import { AuthContext } from "../../../../context/AuthContext";
import { mainURL } from "../../../../utils";
import Header from "../../../sharedModule/components/header/Header";
import NoData from "../../../sharedModule/components/noData/NoData";
import ViewDeleteUser from "../ViewDeleteUser";
import "./Users.modules.css";

const Userslist = () => {
  const [usersList, setUsersList] = useState([]);
  const [paginationNum, setPaginationNum] = useState([]);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const [viewedUser, setViewedUser] = useState({});
  const [id, setId] = useState("");
  const navigate = useNavigate();

  const [filterObj, setFilterObj] = useState({
    userName: "",
    email: "",
    country: "",
    groups: "",
  });

  const { RequestAuthorization, loggedUserInfo, gettingUserData } =
    useContext(AuthContext);

  const handleFilterObj = (e) => {
    const { id, value } = e.target;
    id === "userName" &&
      setFilterObj((prevFilterObj) => ({ ...prevFilterObj, userName: value }));
    id === "email" &&
      setFilterObj((prevFilterObj) => ({ ...prevFilterObj, email: value }));
    id === "country" &&
      setFilterObj((prevFilterObj) => ({ ...prevFilterObj, country: value }));
    id === "groups" &&
      setFilterObj((prevFilterObj) => ({ ...prevFilterObj, groups: value }));
  };

  const getAllUsers = useCallback(async (filterObj, pSize, pNumber) => {
    try {
      let res = await axios.get(
        `${mainURL}/Users/?pageSize=${pSize}&pageNumber=${pNumber}`,
        {
          headers: { ...RequestAuthorization },
          params: {
            userName: filterObj?.userName,
            email: filterObj?.email,
            country: filterObj?.country,
            groups: filterObj?.groups,
          },
        }
      );
      setUsersList(res.data.data);
      setPaginationNum(
        Array(res.data.totalNumberOfPages)
          .fill()
          .map((_, i) => i + 1)
      );
    } catch (error) {
      console.log(error);
    }
  }, []);

  const clearSearch = () => {
    setFilterObj({});
    getAllUsers(filterObj, 10, 1);
  };
  useEffect(() => {
    getAllUsers(filterObj, 10, 1);
    gettingUserData();
    loggedUserInfo?.group?.name === "SystemUser" && navigate("/notfound");
  }, [filterObj, gettingUserData, gettingUserData]);

  return (
    <>
      {openDeleteModal || viewModal ? (
        <ViewDeleteUser
          getAllUsers={getAllUsers}
          id={id}
          openDeleteModal={openDeleteModal}
          setOpenDeleteModal={setOpenDeleteModal}
          filterObj={filterObj}
          viewedUser={viewedUser}
          viewModal={viewModal}
          setViewModal={setViewModal}
        />
      ) : (
        ""
      )}

      <div className="con">
        <Header
          title="Users List"
          description="You can now add your items that any user can order it from the Application and you can edit"
          imgSource={Usersimg}
        />
        <div className="redirect d-flex align-items-center justify-content-between p-4 mt-3 bg-transparent">
          <div>
            <h5 className="fw-bold">Recipe Table Details</h5>
            <p className="">You can check all details</p>
          </div>
        </div>

        <div className="filtaration container-fluid w-100 my-3">
          <div className="row">
            <div className="col-md-3">
              <input
                type="text"
                placeholder="Search By Username"
                className="form-control"
                id="userName"
                onChange={(e) => handleFilterObj(e)}
              />
            </div>
            <div className="col-md-3">
              <input
                type="text"
                placeholder="Search By Email"
                className="form-control"
                id="email"
                onChange={(e) => handleFilterObj(e)}
              />
            </div>
            <div className="col-md-2">
              <input
                type="text"
                placeholder="Search By Country"
                className="form-control"
                id="country"
                onChange={(e) => handleFilterObj(e)}
              />
            </div>
            <div className="col-md-2">
              <select
                className="form-control"
                onChange={(e) => handleFilterObj(e)}
                id="groups"
              >
                <option value="" selected>
                  User Group
                </option>
                <option value="1">Admin</option>
                <option value="2">User</option>
              </select>
            </div>
            <div className="col-md-2">
              <button
                className="btn btn-outline-danger form-control"
                onClick={() => clearSearch()}
              >
                Clear Search
              </button>
            </div>
          </div>
        </div>

        {/* <div className="w-100 p-4 m-auto">
          <Table hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Image</th>
                <th>email</th>
                <th>country</th>
                <th>phoneNumber</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {usersList.length > 0 ? (
                usersList.map((ele) => {
                  return (
                    <tr key={ele?.id} className="infoRow">
                      <td>{ele?.userName}</td>
                      <td className="userImgRow">
                        {ele?.imagePath ? (
                          <img
                            src={`https://upskilling-egypt.com:3006/${ele.imagePath}`}
                            alt="..."
                            style={{ width: "60px", height: "60px" }}
                            className="rounded-circle userImage"
                          />
                        ) : (
                          "no Image"
                        )}
                      </td>
                      <td>{ele?.email}</td>
                      <td>{ele?.country}</td>
                      <td>{ele?.phoneNumber}</td>
                      <td>
                        <img
                          className="recipeActionIcons"
                          type="button"
                          src={viewUserImg}
                          onClick={() => {
                            setViewModal(true);
                            console.log(viewModal);
                            setViewedUser(ele);
                          }}
                        />
                        <img
                          className="recipeActionIcons"
                          type="button"
                          src={deleteUserImg}
                          onClick={() => {
                            setOpenDeleteModal(true);
                            console.log(openDeleteModal);
                            setId(ele.id);
                          }}
                        />
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
        </div> */}
        {/*responsive Recipes */}
        <div className="p-4 m-auto w-100">
          <div className={`recipesBody mt-4 `}>
            <ul className="responsive-table-recipes ">
              <li className="table-header  ">
                <div className="col col-1 ">#</div>
                <div role="button" className="col col-2">
                  User Name
                </div>
                <div className="col col-3">Image</div>
                <div className="col col-4">Country</div>
                <div className="col col-5">Email</div>
                <div className="col col-6">phoneNumber</div>
                <div className="col col-7">Actions</div>
              </li>
            </ul>
            <ul className="responsive-table-recipes">
              {usersList.length > 0 ? (
                usersList.map((item, index) => {
                  console.log(item.imagePath);
                  return (
                    <li key={index} className="table-row  ">
                      <div className="col col-1 " data-label="#">
                        {index + 1}
                      </div>
                      <div className="col col-2 " data-label="Recipe Name :">
                        {item.userName}
                      </div>
                      <div className="col col-3 " data-label="Image :">
                        {item.imagePath != null ? (
                          <img
                            className="recipe-img rounded-5"
                            src={`https://upskilling-egypt.com:3006/${item.imagePath}`}
                            alt=""
                            style={{ width: "60px", height: "60px" }}
                          />
                        ) : (
                          "no image"
                        )}
                      </div>
                      <div className="col col-4" data-label="price :">
                        {item.country}
                      </div>
                      <div className="col col-5" data-label="Price :">
                        {item.email}
                      </div>
                      <div className="col col-6" data-label="Tag :">
                        {item.phoneNumber}
                      </div>
                      <div className="col col-7" data-label="Actions :">
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
                                setViewModal(true);
                                setViewedUser(item);
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
                            {/* {loggedUserInfo?.group?.name == "SuperAdmin" ? (
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
                          )} */}
                            {loggedUserInfo?.group?.name == "SuperAdmin" ? (
                              <li
                                role="button"
                                onClick={() => {
                                  setOpenDeleteModal(true);
                                  setId(item.id);
                                  setViewedUser(item);
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
                  );
                })
              ) : (
                <NoData />
              )}
            </ul>
          </div>
        </div>
        {/*END Responsive usersList */}

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
                    onClick={() => getAllUsers(filterObj, 10, ele)}
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

export default Userslist;
