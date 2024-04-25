import Header from "../../../sharedModule/components/header/Header";
import usersImg from "../../../../assets/imgs/recipesImg.png";

const Userslist = () => {
  return (
    <div>
      <Header
        title="Users List"
        description="You can now add your items that any user can order it from the Application and you can edit"
        imgSource={usersImg}
      />
    </div>
  );
};

export default Userslist;
