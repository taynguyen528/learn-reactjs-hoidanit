// class component

// function component

import React from "react";
import AddUserInfo from "../components/AddUserInfo";
import DisplayInfo from "../components/DisplayInfo";

class MyComponent extends React.Component {
  state = {
    listUser: [
      { id: 1, name: "Tây Nguyên", age: "18" },
      { id: 2, name: "Tây Nguyên 2", age: "23" },
      { id: 3, name: "Tây Nguyên 3", age: "24" },
      { id: 4, name: "Tây Nguyên 4", age: "25" },
    ],
  };

  handleAddNewUser = (userObj) => {
    this.setState({ listUser: [userObj, ...this.state.listUser] });
  };

  // <DisplayInfo data={this.state.listUser} func={this.handleAddNewUser} />
  // bên trái: tên của props mình muốn truyền
  // bên phải: giá trị muốn gán cho props
  // khi state hoặc props thay đôi thì component sẽ bị render lại

  handleDeleteUser = (userID) => {
    let listUserClone = [...this.state.listUser];
    listUserClone = listUserClone.filter((item) => item.id !== userID);
    this.setState({
      listUser: listUserClone,
    });
  };

  render() {
    // const test = { name: "Nhung", age: 21 };
    return (
      <>
        <br></br>
        {/* {console.log(test)} */}
        {/* {JSON.stringify(test)} */}
        <div className="a">
          <AddUserInfo func={this.handleAddNewUser} />
          <br></br>
          <DisplayInfo
            data={this.state.listUser}
            handleDeleteUser={this.handleDeleteUser}
          />
        </div>
        <div className="b"></div>
      </>
    );
  }
}

export default MyComponent;
