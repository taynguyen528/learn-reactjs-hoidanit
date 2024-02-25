import { useEffect, useState } from "react";
import ReactPaginate from "https://cdn.skypack.dev/react-paginate";
import { set } from "lodash";

const TableUserPaginate = (props) => {
    const { listUser, pageCount } = props;
    // const [pageCount, setPageCount] = useState(0);

    const handlePageClick = (event) => {
        console.log(`User requested page number ${event.selected}`);
        props.fetchListUserWithPaginate(+event.selected + 1);
        props.setCurrentPage(+event.selected + 1);
    };
    return (
        <>
            <table className="table table-hover table-bordered">
                <thead>
                    <tr>
                        <th scope="col">ID</th>
                        <th scope="col">User name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Row</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {listUser &&
                        listUser.length > 0 &&
                        listUser.map((user, indexUser) => {
                            return (
                                <tr key={`table users - ${indexUser}`}>
                                    <td>{user.id}</td>
                                    <td>{user.username}</td>
                                    <td>{user.email}</td>
                                    <td>{user.role}</td>
                                    <td>
                                        <button
                                            className="btn btn-primary"
                                            onClick={() => {
                                                props.handleClickBtnView(user);
                                            }}
                                        >
                                            View
                                        </button>
                                        <button
                                            className="btn btn-warning mx-3"
                                            onClick={() => {
                                                props.handleClickBtnUpdate(
                                                    user
                                                );
                                            }}
                                        >
                                            Update
                                        </button>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => {
                                                props.handleClickBtnDelete(
                                                    user
                                                );
                                            }}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    {listUser && listUser.length === 0 && (
                        <tr>
                            <td colSpan={4}>Not found data</td>
                        </tr>
                    )}
                </tbody>
            </table>
            <div className="user-pagination ">
                <ReactPaginate
                    nextLabel="Next >"
                    onPageChange={handlePageClick}
                    pageRangeDisplayed={3}
                    marginPagesDisplayed={2}
                    pageCount={[pageCount]}
                    previousLabel="< Prev"
                    pageClassName="page-item"
                    pageLinkClassName="page-link"
                    previousClassName="page-item"
                    previousLinkClassName="page-link"
                    nextClassName="page-item"
                    nextLinkClassName="page-link"
                    breakLabel="..."
                    breakClassName="page-item"
                    breakLinkClassName="page-link"
                    containerClassName="pagination"
                    activeClassName="active"
                    renderOnZeroPageCount={null}
                    forcePage={props.currentPage - 1}
                />
            </div>
        </>
    );
};

export default TableUserPaginate;
