import React, { useEffect, useState } from "react";

// truyền vào props để nhận data từ cha truyễn xuống
const AddUserInfo = (props) => {
  const [name, setName] = useState("Nguyên");
  const [address, setAddress] = useState("HCM");
  const [age, setAge] = useState(22);
  const handleOnChangeInput = (event) => {
    // bad code: this.state.name = event.target.value -> Sửa đổi trạng thái gián tiếp, không có sự đồng bộ hóa giữa state và hàm render -> bug
    setName(event.target.value);
  };
  const handleOnChangeAge = (event) => {
    // bad code: this.state.age = event.target.value -> Sửa đổi trạng thái gián tiếp, không có sự đồng bộ hóa giữa state và hàm render -> bug
    setAge(event.target.value);
  };

  const handleOnSubmit = (event) => {
    // Ngăn chặn hành động tải lại trang
    event.preventDefault();
    props.func({
      id: Math.floor(Math.random() * 100) + 1 + "random",
      name: name,
      age: age,
      address: address,
    });
  };

  return (
    <>
      My name is {name} and age {age}
      <form onSubmit={(event) => handleOnSubmit(event)}>
        <label>Your Name: </label>
        <input
          value={name}
          type="text"
          onChange={(event) => handleOnChangeInput(event)}
        ></input>

        <label>Your Age: </label>
        <input
          value={age}
          type="number"
          onChange={(event) => handleOnChangeAge(event)}
        ></input>
        <button>Submit</button>
      </form>
    </>
  );
};

export default AddUserInfo;
