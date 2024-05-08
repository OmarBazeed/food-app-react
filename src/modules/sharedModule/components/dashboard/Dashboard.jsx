import { NavLink } from "react-router-dom";
import homeImg from "../../../../assets/imgs/home-avatar.svg";
import Header from "../header/Header";
const Dashboard = () => {
  return (
    <div className="container-fluid">
      <Header
        title="Welcome Upskilling"
        description="This is a welcoming screen for the entry of the application , you can now see the options"
        imgSource={homeImg}
      />

      <div className="redirect d-flex align-items-center justify-content-between p-4 mt-3 flex-wrap">
        <div>
          <h4 className="fw-bold">
            Fill the <span className="text-success"> Recipes </span> !
          </h4>
          <p className="">
            you can now fill the meals easily using the table and form , <br />
            click here and sill it with the table !
          </p>
        </div>
        <div>
          <button className="btn btn-success p-2">
            <NavLink
              to="/dashboard/recipes"
              className="text-light text-decoration-none"
            >
              Fill Recipes <i className="fa-solid fa-arrow-right-long ms-2"></i>
            </NavLink>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
