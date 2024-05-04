import Header from "../../../sharedModule/components/header/Header";
import recipesImg from "../../../../assets/imgs/recipesImg.png";
import { useEffect, useState } from "react";
import { FailToast } from "../../../sharedModule/components/toasts/Toast";
import { mainURL } from "../../../../utils";
import axios from "axios";

const Favorites = () => {
  const [favsList, setFavsList] = useState([]);

  const fetchFavsList = async () => {
    try {
      let res = await axios.get(`${mainURL}/userRecipe/`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setFavsList(res.data.data);
      console.log(res.data.data);
    } catch (error) {
      FailToast(error.reponse.data.message);
    }
  };

  const removeFav = async (id) => {
    console.log(id);
    try {
      let res = await axios.delete(`${mainURL}/userRecipe/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      console.log(res);
      fetchFavsList();
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
          {favsList.length > 0 &&
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
                      onClick={() => removeFav(fav.id)}
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
                      <p className="card-text">{description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Favorites;
