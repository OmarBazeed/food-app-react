import { NavLink } from "react-router-dom";
import Logo from "../../../../assets/imgs/logo.png";
import { useForm } from "react-hook-form";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <div className="auth-container">
      <div className="bg-overlay vh-100">
        <div className="d-flex align-items-center justify-content-center vh-100">
          <div className="login-content bg-white border border-2 rounded-2 p-4 my-3">
            <div>
              <div className="text-center mx-auto mb-3">
                <img src={Logo} alt="logo" />
              </div>
              <h2>Login</h2>
              <p className="text-muted">
                Welcome Back! Please enter your details
              </p>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-5">
              <div className="input-group formIn my-3 bg-lighter p-2 d-flex  align-items-center justify-content-center">
                <i className="fa-regular fa-envelope fa-2x me-1"></i>
                <input
                  type="text"
                  className="form-control bg-transparent border-0 ms-2"
                  placeholder="Enter Your Email"
                  {...register("email", {
                    required: "Email Is Required",
                    pattern: /^[w]+@([\w-]+\.)+[\w-]{2,4}$/i,
                  })}
                />
                <p className="text-danger">{errors?.email}</p>
              </div>
              <div className="input-group formIn my-3 bg-lighter p-2 d-flex  align-items-center justify-content-center">
                <i className="fa-solid fa-lock fa-2x me-1"></i>
                <input
                  type="text"
                  className="form-control bg-transparent border-0 ms-2"
                  placeholder="Enter Your Password"
                  {...register("email", { required: "Password Is Required" })}
                />
              </div>
              <div className="mt-5">
                <div className="d-flex align-items-center justify-content-between my-4">
                  <NavLink
                    className="text-decoration-none text-secondary fs-6"
                    to="/register"
                  >
                    Registr Now ?
                  </NavLink>
                  <NavLink
                    className="text-decoration-none text-secondary fs-6"
                    to="/forgetpass"
                  >
                    Forget Password!
                  </NavLink>
                </div>
                <div className="w-100 mt-4">
                  <button
                    className="btn btn-success w-100 fw-bold text-white fs-5"
                    type="submit"
                  >
                    Login
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
