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

  render() {
    return (
      <div>
        <AddUserInfo func={this.handleAddNewUser} />
        <br></br>
        <br></br>
        <DisplayInfo data={this.state.listUser} />
      </div>
    );
  }
}

export default MyComponent;
