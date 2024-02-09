import React from "react";

class AddUserInfo extends React.Component {
  state = {
    name: "Tây Nguyên",
    address: "HCM",
    age: 22,
  };

  handleOnChangeInput = (event) => {
    // bad code: this.state.name = event.target.value -> Sửa đổi trạng thái gián tiếp, không có sự đồng bộ hóa giữa state và hàm render -> bug
    this.setState({ name: event.target.value });
  };
  handleOnChangeAge = (event) => {
    // bad code: this.state.age = event.target.value -> Sửa đổi trạng thái gián tiếp, không có sự đồng bộ hóa giữa state và hàm render -> bug
    this.setState({ age: event.target.value });
  };

  handleOnSubmit = (event) => {
    // Ngăn chặn hành động tải lại trang
    event.preventDefault();
    this.props.func({
      id: Math.floor(Math.random() * 100) + 1 + "random",
      name: this.state.name,
      age: this.state.age,
      address: this.state.address,
    });
  };
  // JSX
  render() {
    return (
      <div>
        My name is {this.state.name} and age {this.state.age}
        <form onSubmit={(event) => this.handleOnSubmit(event)}>
          <label>Your Name: </label>
          <input
            value={this.state.name}
            type="text"
            onChange={(event) => this.handleOnChangeInput(event)}
          ></input>

          <label>Your Age: </label>
          <input
            value={this.state.age}
            type="number"
            onChange={(event) => this.handleOnChangeAge(event)}
          ></input>
          <button>Submit</button>
        </form>
      </div>
    );
  }
}

export default AddUserInfo;
