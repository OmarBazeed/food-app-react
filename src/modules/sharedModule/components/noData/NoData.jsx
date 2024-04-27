import NoDataImag from "../../../../assets/imgs/no-data.png";
const NoData = () => {
  return (
    <div>
      <img src={NoDataImag} alt="..." />
      <h4 className="fw-bold my-3">Delete This Item ?</h4>
      <p className="text-muted">
        are you sure you want to delete this item ? if you are sure just click
        on delete it
      </p>
    </div>
  );
};

export default NoData;
