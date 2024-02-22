import instance from "../Utils/axiosCustomize";

const postCreateNewUser = (email, password, username, role, image) => {
  //submit data
  const data = new FormData();
  data.append("email", email);
  data.append("password", password);
  data.append("username", username);
  data.append("role", role);
  data.append("userImage", image);

  return instance.post("api/v1/participant", data);
};
const getAllUser = () => {
  return instance.get("api/v1/participant/all");
};
export { postCreateNewUser, getAllUser };
