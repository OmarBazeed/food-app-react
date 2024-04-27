/* eslint-disable react/prop-types */
const Header = ({ title, description, imgSource }) => {
  return (
    <div className="header-content d-flex align-items-center justify-content-around w-100">
      <div>
        <h2> {title}</h2>
        <p>{description}</p>
      </div>
      <div>
        <img src={imgSource} alt="..." />
      </div>
    </div>
  );
};

export default Header;
