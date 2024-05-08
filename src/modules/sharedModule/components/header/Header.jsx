/* eslint-disable react/prop-types */
const Header = ({ title, description, imgSource }) => {
  return (
    <div className="header-content w-100 m-auto d-flex justify-content-center align-items-center ms-1 ms-md-0">
      <div className="d-flex align-items-center justify-content-md-around flex-wrap flex-md-nowrap p-2 w-100">
        <div className="col-md-5">
          <h2>{title}</h2>
          <p className="text-white">{description}</p>
        </div>
        <div className="col-md-5 m-auto m-md-0 text-md-center">
          <img src={imgSource} alt="..." />
        </div>
      </div>
    </div>
  );
};

export default Header;
