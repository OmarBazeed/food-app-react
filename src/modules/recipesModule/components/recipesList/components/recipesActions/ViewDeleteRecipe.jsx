/* eslint-disable react/prop-types */
import axios from "axios";
import PopUpImag from "../../../../../../assets/imgs/no-data.png";
import { Button, Modal } from "react-bootstrap";
import { useContext } from "react";
import NoRecipeImage from "../../../../../../assets/imgs/no-data.png";
import { AuthContext } from "../../../../../../context/AuthContext";
import { mainURL } from "../../../../../../utils";
import {
  FailToast,
  SuccessToast,
} from "../../../../../sharedModule/components/toasts/Toast";

const ViewDeleteRecipe = ({
  getAllRecipes,
  UpdatedRecipe,
  openDeleteModal,
  setOpenDeleteModal,
  viewBtnClicked,
  setViewBtnClicked,
  recipes,
  setRecipes,
}) => {
  const { loggedUserInfo, RequestAuthorization } = useContext(AuthContext);

  const handleClose = () => {
    setOpenDeleteModal(false);
    setViewBtnClicked(false);
  };

  const handleDelte = async (UpdatedRecipe) => {
    try {
      let res = await axios.delete(`${mainURL}/Recipe/${UpdatedRecipe.id}`);
      SuccessToast(res.data.message || "You Deleted This Recipe Successfully");
      getAllRecipes({}, 10, 1);
      handleClose();
    } catch (error) {
      FailToast(error.response.data.message);
    }
  };

  const handleAddFavorites = async (UpdatedRecipe) => {
    try {
      let res = await axios.post(
        `${mainURL}/userRecipe`,
        {
          recipeId: UpdatedRecipe.id,
        },
        {
          headers: { ...RequestAuthorization },
        }
      );
      SuccessToast(`You Added ${res.data.recipe.name} To Favs`);
      handleClose();
      const filteredFavs = recipes.filter((ele) => ele.id != UpdatedRecipe.id);
      setRecipes(filteredFavs);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <section>
        <Modal
          show={openDeleteModal || viewBtnClicked}
          onHide={handleClose}
          className="text-center m-auto"
        >
          <Modal.Header>
            <h4 className="text-capitalize">recipe details</h4>
            <Button
              variant="outline-danger ms-auto rounded-circle"
              onClick={() => handleClose()}
            >
              <i className="fa fa-close"></i>
            </Button>
          </Modal.Header>
          <Modal.Body>
            {openDeleteModal && (
              <>
                <img src={PopUpImag} alt="..." className="m-auto" />
                <h4 className="fw-bold my-3">Delete This Item ?</h4>
                <p className="text-muted">
                  are you sure you want to delete this item ? if you are sure
                  just click on delete it
                </p>
              </>
            )}
            {viewBtnClicked && (
              <>
                <img
                  src={
                    UpdatedRecipe.imagePath
                      ? `https://upskilling-egypt.com:3006/${UpdatedRecipe.imagePath}`
                      : NoRecipeImage
                  }
                  className="w-50 h-50 rounded-3 m-auto"
                />
                <div className="d-flex flex-column align-items-start justify-content-start gap-2 mt-3">
                  {loggedUserInfo?.group.name == "SystemUser" ? (
                    <p>{UpdatedRecipe.description}</p>
                  ) : (
                    ""
                  )}

                  {loggedUserInfo?.group.name !== "SystemUser" ? (
                    <>
                      <p>
                        <span className="fw-bold">Recipe Name </span> :
                        {UpdatedRecipe.name}
                      </p>
                      <p>
                        <span className="fw-bold"> Recipe Price </span>:
                        {UpdatedRecipe.price}
                      </p>
                      <p>
                        <span className="fw-bold"> Recipe Tag </span>:
                        {UpdatedRecipe.tag?.name}
                      </p>
                      <p>
                        <span className="fw-bold"> Recipe Category </span>:
                        {UpdatedRecipe.category[0]?.name}
                      </p>
                      <p>
                        <span className="fw-bold"> Recipe Description </span>:
                        {UpdatedRecipe.description}
                      </p>
                    </>
                  ) : (
                    ""
                  )}
                </div>
              </>
            )}
          </Modal.Body>
          {openDeleteModal && (
            <Button
              variant="outline-danger  ms-auto"
              onClick={() => handleDelte(UpdatedRecipe)}
              className="w-25 ms-auto"
            >
              Delete
            </Button>
          )}
          {viewBtnClicked && (
            <Button
              variant="outline-danger ms-auto"
              onClick={() => handleAddFavorites(UpdatedRecipe)}
              className={
                loggedUserInfo?.group.name == "SystemUser"
                  ? "d-block !important"
                  : "d-none !important"
              }
            >
              Favorite
            </Button>
          )}
        </Modal>
      </section>
    </>
  );
};

export default ViewDeleteRecipe;
