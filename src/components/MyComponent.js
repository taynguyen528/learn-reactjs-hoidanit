// class component

// function component

import React, { useState } from "react";
import AddUserInfo from "../components/AddUserInfo";
import DisplayInfo from "../components/DisplayInfo";

const MyComponent = (props) => {
  const [listUsers, setListUsers] = useState([
    { id: 1, name: "Tây Nguyên", age: "18" },
    { id: 2, name: "Tây Nguyên 2", age: "23" },
    { id: 3, name: "Tây Nguyên 3", age: "24" },
    { id: 4, name: "Tây Nguyên 4", age: "25" },
  ]);

  const handleAddNewUser = (userObj) => {
    setListUsers([userObj, ...listUsers]);
  };

  // <DisplayInfo data={this.state.listUser} func={this.handleAddNewUser} />
  // bên trái: tên của props mình muốn truyền
  // bên phải: giá trị muốn gán cho props
  // khi state hoặc props thay đôi thì component sẽ bị render lại

  const handleDeleteUser = (userID) => {
    let listUsersClone = listUsers;
    listUsersClone = listUsersClone.filter((item) => item.id !== userID);
    setListUsers(listUsersClone);
  };
  return (
    <>
      <div className="a">
        <AddUserInfo func={handleAddNewUser} />
        <br></br>
        <DisplayInfo data={listUsers} handleDeleteUser={handleDeleteUser} />
      </div>
      <div className="b"></div>
    </>
  );
};

export default MyComponent;
