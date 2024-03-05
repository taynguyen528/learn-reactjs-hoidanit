import ModalCreateUser from "./ModalCreateUser";
import { FcPlus } from "react-icons/fc";
import "./ManageUser.scss";
import TableUser from "./TableUser";
import { useEffect, useState } from "react";
import { getAllUser, getUserWithPaginate } from "../../Services/apiServices";
import ModalUpdateUser from "./ModalUpdateUser";
import ModalViewUser from "./ModalViewUser";
import ModalDeleteUser from "./ModalDeleteUser";
import TableUserPaginate from "./TableUserPaginate";

const ManageUser = (props) => {
    const [showModalCreateUser, setShowModalCreateUser] = useState(false);
    const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);
    const [showModalViewUser, setShowModalViewUser] = useState(false);
    const [showModalDeleteUser, setShowModalDeleteUser] = useState(false);
    const [selectUser, setSelectUser] = useState("");
    const [listUser, setListUser] = useState([]);
    const [dataUpdate, setDataUpdate] = useState({});
    const [dataDelete, setDataDelete] = useState("");
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    const LIMIT_USER = 5;

    // useEffect sẽ được chạy sau khi hàm return được chạy -> hạn chế lỗi tối đa
    // ComponentDidMount
    useEffect(() => {
        // fetchListUser();
        fetchListUserWithPaginate(1);
    }, []);

    const fetchListUser = async () => {
        let res = await getAllUser();

        if (res.EC === 0) {
            setListUser(res.DT);
        }
    };

    const fetchListUserWithPaginate = async (page) => {
        let res = await getUserWithPaginate(page, LIMIT_USER);

        if (res.EC === 0) {
            setListUser(res.DT.users);
            setPageCount(res.DT.totalPages);
        }
    };

    const handleClickBtnUpdate = (user) => {
        setShowModalUpdateUser(true);
        setDataUpdate(user);
    };

    const handleClickBtnView = (user) => {
        setShowModalViewUser(true);
        setSelectUser(user);
    };

    const handleClickBtnDelete = (user) => {
        setShowModalDeleteUser(user);
        setDataDelete(user);
    };

    const resetUpdateData = () => {
        setDataUpdate({});
    };

    return (
        <div className="manage-user-container">
            <div className="title">Manage User </div>
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
                        {/* <TableUser
                            listUser={listUser}
                            handleClickBtnUpdate={handleClickBtnUpdate}
                            handleClickBtnView={handleClickBtnView}
                            handleClickBtnDelete={handleClickBtnDelete}
                        /> */}
                        <TableUserPaginate
                            listUser={listUser}
                            handleClickBtnUpdate={handleClickBtnUpdate}
                            handleClickBtnView={handleClickBtnView}
                            handleClickBtnDelete={handleClickBtnDelete}
                            fetchListUserWithPaginate={
                                fetchListUserWithPaginate
                            }
                            pageCount={pageCount}
                            currentPage={currentPage}
                            setCurrentPage={setCurrentPage}
                        />
                    </div>
                </div>
                <ModalCreateUser
                    show={showModalCreateUser}
                    setShow={setShowModalCreateUser}
                    fetchListUser={fetchListUser}
                    fetchListUserWithPaginate={fetchListUserWithPaginate}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
                <ModalUpdateUser
                    show={showModalUpdateUser}
                    setShow={setShowModalUpdateUser}
                    dataUpdate={dataUpdate}
                    fetchListUser={fetchListUser}
                    resetUpdateData={resetUpdateData}
                    fetchListUserWithPaginate={fetchListUserWithPaginate}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
                <ModalViewUser
                    show={showModalViewUser}
                    setShow={setShowModalViewUser}
                    selectUser={selectUser}
                />
                <ModalDeleteUser
                    show={showModalDeleteUser}
                    setShow={setShowModalDeleteUser}
                    dataDelete={dataDelete}
                    fetchListUser={fetchListUser}
                    fetchListUserWithPaginate={fetchListUserWithPaginate}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                />
            </div>
        </div>
    );
};

export default ManageUser;
