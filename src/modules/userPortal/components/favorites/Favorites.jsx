import Header from "../../../sharedModule/components/header/Header";
import recipesImg from "../../../../assets/imgs/recipesImg.png";
import { useContext, useEffect, useState } from "react";
import {
  FailToast,
  SuccessToast,
} from "../../../sharedModule/components/toasts/Toast";
import { mainURL } from "../../../../utils";
import axios from "axios";
import NoData from "../../../sharedModule/components/noData/NoData";
import { AuthContext } from "../../../../context/AuthContext";

const Favorites = () => {
  const [favsList, setFavsList] = useState([]);
  const { RequestAuthorization } = useContext(AuthContext);
  const fetchFavsList = async () => {
    try {
      let res = await axios.get(`${mainURL}/userRecipe/`, {
        headers: { ...RequestAuthorization },
      });
      setFavsList(res.data.data);
      const favsListIds = res.data.data.map((ele) => ele.id);
      localStorage.setItem("favsArr", JSON.stringify(favsListIds));
    } catch (error) {
      FailToast(error.reponse.data.message);
    }
  };

  const removeFav = async (fav) => {
    try {
      await axios.delete(`${mainURL}/userRecipe/${fav.id}`, {
        headers: { ...RequestAuthorization },
      });
      fetchFavsList();
      SuccessToast("You Deleted This Recipe Successfully");
      const oldRes = JSON.parse(localStorage.getItem("NewRecipes"));
      oldRes.push(fav);
      localStorage.setItem("NewRecipes", JSON.stringify(oldRes));
    } catch (error) {
      FailToast(error.reponse.data.message);
    }
  };

  useEffect(() => {
    fetchFavsList();
  }, []);
  return (
    <div className="container-fluid">
      <Header
        title="Favorites Items !!"
        description="You can now add your items that any user can order it from the Application and you can edit"
        imgSource={recipesImg}
      />

      <div className="container my-4">
        <div className="row">
          {favsList.length > 0 ? (
            favsList.map((fav) => {
              const { description, name, imagePath } = fav.recipe;
              return (
                <div className="col-md-3" key={fav.recipe.id}>
                  <div
                    className="card favsCard"
                    style={{ width: "18rem", height: "400px" }}
                  >
                    <button
                      className="favsButton"
                      style={{ outline: "none" }}
                      onClick={() => removeFav(fav)}
                    >
                      <i className="fa fa-heart text-warning"></i>
                    </button>
                    <img
                      src={`https://upskilling-egypt.com:3006/${imagePath}`}
                      className="card-img-top"
                      alt="..."
                    />
                    <div className="card-body">
                      <p className="card-text fw-bold">{name}</p>
                      <p className="card-text">{description.slice(50)}</p>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <NoData />
          )}
        </div>
      </div>
    </div>
  );
};

export default Favorites;
