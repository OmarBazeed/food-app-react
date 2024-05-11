/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import { useCallback, useContext, useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import usersImg from "../../../../assets/imgs/recipesImg.png";
import { mainURL } from "../../../../utils";
import Header from "../../../sharedModule/components/header/Header";
import NoData from "../../../sharedModule/components/noData/NoData";
import DeleteUser from "../DeleteUser";
import { AuthContext } from "../../../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Userslist = () => {
  const [usersList, setUsersList] = useState([]);
  const [paginationNum, setPaginationNum] = useState([]);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
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
      {openDeleteModal && (
        <DeleteUser
          getAllUsers={getAllUsers}
          id={id}
          openDeleteModal={openDeleteModal}
          setOpenDeleteModal={setOpenDeleteModal}
          filterObj={filterObj}
        />
      )}

      <div className="con">
        <Header
          title="Users List"
          description="You can now add your items that any user can order it from the Application and you can edit"
          imgSource={usersImg}
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

        <div className="w-100 p-4 m-auto">
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
                    <tr key={ele?.id}>
                      <td>{ele?.userName}</td>
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
                      <td>{ele?.email}</td>
                      <td>{ele?.country}</td>
                      <td>{ele?.phoneNumber}</td>
                      <td>
                        <i
                          className="me-3 fa-regular fa-eye text-warning"
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
                <tr>
                  <td colSpan={7} className="bg-transparent m-auto">
                    <NoData />
                  </td>
                </tr>
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
