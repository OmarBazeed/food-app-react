import Header from "../../../sharedModule/components/header/Header";
import recipesImg from "../../../../assets/imgs/recipesImg.png";
const RecipesList = () => {
  return (
    <div>
      <Header
        title="Recipes Items"
        description="You can now add your items that any user can order it from the Application and you can edit"
        imgSource={recipesImg}
      />
    </div>
  );
};

export default RecipesList;
