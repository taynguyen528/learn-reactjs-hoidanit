import React from "react";
import "./DisplayInfo.scss";
import logo from "./../logo.svg";
class DisplayInfo extends React.Component {
  constructor(props) {
    // -> Đây là nơi khai báo state cho react component nó sẽ nhận đầy đủ props, state từ component cha truyền xuống
    super(props);
    //babel compiler
    this.state = { isShowListUser: true };
  }
  handelShowHide() {
    this.setState({
      isShowListUser: !this.state.isShowListUser,
    });
  }
  render() {
    // console.log(this.props);
    // dùng destructuring js arr/obj
    // <DisplayInfo data={this.state.listUser} />   -> data chứ không phải listUser
    const { data } = this.props; //obj -> chú ý {} chứ không phải []
    // const listUser = this.props.listUser
    return (
      //props -> properties
      <div className="display-info-container">
        {/* <img src={logo}></img> */}
        <div>
          <span
            onClick={() => {
              this.handelShowHide();
            }}
          >
            {this.state.isShowListUser === true
              ? "Hide list user"
              : "Show list user "}
          </span>
        </div>
        {this.state.isShowListUser && (
          <>
            {data.map((user) => {
              console.log(user);
              return (
                <div
                  key={user.id}
                  className={user.age * 1 > 18 ? "green" : "red"}
                >
                  <div>My name is {user.name}</div>
                  <div>My age {user.age}</div>

                  <div>
                    <button
                      onClick={() => {
                        this.props.handleDeleteUser(user.id);
                      }}
                    >
                      Delete
                    </button>
                  </div>
                  <hr />
                </div>
              );
            })}
          </>
        )}
      </div>
    );
  }
}

export default DisplayInfo;
