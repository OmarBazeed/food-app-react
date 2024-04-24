/* eslint-disable react/prop-types */
const Navbar = ({ loginData }) => {
  return (
    <div>
      Navbar
      <p> hello {loginData?.userName}</p>
    </div>
  );
};

export default Navbar;
