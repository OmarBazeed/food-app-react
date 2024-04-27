import Header from "../../../sharedModule/components/header/Header";
import usersImg from "../../../../assets/imgs/recipesImg.png";
import Table from "react-bootstrap/Table";
const CategoriesList = () => {
  return (
    <div>
      <Header
        title="Categories List"
        description="You can now add your items that any user can order it from the Application and you can edit"
        imgSource={usersImg}
      />
      <div>
        <Table hover>
          <thead>
            <tr>
              <th>#</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Username</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Jacob</td>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
            <tr>
              <td>3</td>
              <td colSpan={2}>Larry the Bird</td>
              <td>@twitter</td>
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default CategoriesList;
