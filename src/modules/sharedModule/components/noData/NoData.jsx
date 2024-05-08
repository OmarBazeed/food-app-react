import NoDataImag from "../../../../assets/imgs/no-data.png";
const NoData = () => {
  return (
    <div className="m-auto w-100 d-flex flex-column align-items-center">
      <img src={NoDataImag} alt="..." />
      <h4 className="fw-bold my-3"> No Data !</h4>
      <p className="text-muted">
        are you sure you want to still قاعد كدا ? You Can Change The View
      </p>
    </div>
  );
};

export default NoData;
