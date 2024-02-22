import ModalCreateUser from "./ModalCreateUser";
import { FcPlus } from "react-icons/fc";
import "./ManageUser.scss";
import TableUser from "./TableUser";
import { useEffect, useState } from "react";
import { getAllUser } from "../../Services/apiServices";

const ManageUser = (props) => {
  const [showModalCreateUser, setShowModalCreateUser] = useState(false);
  const [listUser, setListUser] = useState([]);

  // useEffect sẽ được chạy sau khi hàm return được chạy -> hạn chế lỗi  tối đa
  // ComponentDidMount
  useEffect(() => {
    fetchListUser();
  }, []);

  console.log("render view");

  const fetchListUser = async () => {
    let res = await getAllUser();

    if (res.EC === 0) {
      setListUser(res.DT);
    }
  };

  return (
    <div className="manage-user-container">
      <div className="title">Manage User</div>
      <div className="users-content">
        <div>
          <button
            className="btn btn-primary btn-add-new "
            onClick={() => setShowModalCreateUser(true)}
          >
            <FcPlus />
            Add new user
          </button>
        </div>
        <div className="table-users-container">
          <div>
            <TableUser listUser={listUser} />
          </div>
        </div>
        <ModalCreateUser
          show={showModalCreateUser}
          setShow={setShowModalCreateUser}
          fetchListUser={fetchListUser}
        />
      </div>
    </div>
  );
};

export default ManageUser;
