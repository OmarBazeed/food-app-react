import Header from "../../../sharedModule/components/header/Header";
import recipesImg from "../../../../assets/imgs/recipesImg.png";
import { Table } from "react-bootstrap";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { mainURL } from "../../../../utils";
import DeleteModal from "../../../sharedModule/components/popUpModal/DeleteModal";
import NoData from "../../../sharedModule/components/noData/NoData";
import AddRecipe from "../AddRecipe";
import UpdateRecipe from "./UpdateRecipe";
const RecipesList = () => {
  const [recipes, setRecipes] = useState([]);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const [addBtnClicked, setaAddBtnClicked] = useState(false);
  const [updateBtnClicked, setUpdateBtnClicked] = useState(false);

  const [UpdatedRecipe, setUpdatedRecipe] = useState({});

  const token = localStorage.getItem("token");
  const [id, setId] = useState("");

  const getAllRecipes = useCallback(async () => {
    try {
      let res = await axios.get(`${mainURL}/Recipe/?pageSize=10&pageNumber=1`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setRecipes(res.data.data);
    } catch (error) {
      console.log(error);
    }
  }, [token]);

  useEffect(() => {
    getAllRecipes();
  }, [getAllRecipes]);

  return (
    <>
      {openDeleteModal && (
        <DeleteModal
          getAllRecipes={getAllRecipes}
          id={id}
          openDeleteModal={openDeleteModal}
          setOpenDeleteModal={setOpenDeleteModal}
        />
      )}

      {addBtnClicked ? (
        <AddRecipe
          setaAddBtnClicked={setaAddBtnClicked}
          getAllRecipes={getAllRecipes}
        />
      ) : updateBtnClicked ? (
        <UpdateRecipe
          setUpdateBtnClicked={setUpdateBtnClicked}
          UpdatedRecipe={UpdatedRecipe}
          getAllRecipes={getAllRecipes}
        />
      ) : (
        <div className="d-flex align-items-start flex-column w-100">
          <Header
            title="Recipes Items"
            description="You can now add your items that any user can order it from the Application and you can edit"
            imgSource={recipesImg}
          />
          <div className="redirect d-flex align-items-center justify-content-between p-4 mt-3">
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

          <div className="w-100 p-4 m-auto">
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
                      <tr key={ele?.id}>
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
                          <i
                            className="me-3 fa-regular fa-eye text-warning"
                            type="button"
                          ></i>
                          <i
                            className="me-3 fa-solid fa-pen-to-square text-primary"
                            onClick={() => {
                              setUpdateBtnClicked(true);
                              setId(ele.id);
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
                              setId(ele.id);
                            }}
                          ></i>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <div className="w-100 m-auto text-center ms-">
                    <NoData />
                  </div>
                )}
              </tbody>
            </Table>
          </div>
        </div>
      )}
    </>
  );
};

export default RecipesList;
