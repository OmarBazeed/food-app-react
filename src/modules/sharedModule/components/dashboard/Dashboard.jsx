const Dashboard = () => {
  const handleLogOut = () => {
    console.log("first");
    localStorage.removeItem("token");
  };
  return (
    <div>
      Dashboard
      <button className="btn btn-danger" onClick={() => handleLogOut()}>
        logout
      </button>
    </div>
  );
};

export default Dashboard;
