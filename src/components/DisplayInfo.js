import React, { useState, useEffect } from "react";
import "./DisplayInfo.scss";
import logo from "./../logo.svg";

const DisplayInfo = (props) => {
  const { data } = props; //obj -> chú ý {} chứ không phải []

  const [isShowHideListUser, setShowHideListUser] = useState(true);

  // this.state = {
  //   isShowHideListUser: true,
  // };

  const handelShowHideListUser = () => {
    // this.setState({
    //   isShowHideListUser: true,
    // });
    setShowHideListUser(!isShowHideListUser);
  };

  console.log("call me render");

  // hàm useEffect cũng được chạy lại khi ta render lại giao diện
  useEffect(() => {
    if (data.length === 0) {
      alert("You deleted all the users");
    }
    console.log("call me useEffect");
  }, [data]);
  // nếu useEffect không truyền tham số dầu vào thì nó chỉ chạy 1 lần

  return (
    //props -> properties
    <div className="display-info-container">
      <div>
        <span
          onClick={() => {
            handelShowHideListUser();
          }}
        >
          {isShowHideListUser === true ? "Hide list user" : "Show list user"}
        </span>
      </div>
      {isShowHideListUser && (
        <>
          {data.map((user) => {
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
                      props.handleDeleteUser(user.id);
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
};
export default DisplayInfo;
