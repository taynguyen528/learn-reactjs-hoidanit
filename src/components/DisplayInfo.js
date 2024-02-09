import React from "react";

class DisplayInfo extends React.Component {
  state = { isShowListUser: true };
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
      <div>
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
          <div>
            {data.map((item) => {
              return (
                <div
                  key={item.id}
                  className={item.age * 1 > 18 ? "green" : "red"}
                >
                  <div>My name is {item.name}</div>
                  <div>My age {item.age}</div>
                  <hr />
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  }
}

export default DisplayInfo;
