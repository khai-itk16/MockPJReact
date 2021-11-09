import axios from "axios";
import { domain } from "../constants";

const apiRegisterAccount = (data) => {
  const { username, phone, avatar, roleUser } = data;
  var bodyFormData = new FormData();
  var url = null;
  bodyFormData.append("Name", username);
  bodyFormData.append("PhoneNumber", phone);

  if (roleUser === "customer") {
    bodyFormData.append("Avatar", avatar);
    url = domain + "api/Customer/register";
  } else {
    bodyFormData.append("Logo", avatar);
    url = domain + "api/Shop/register";
  }

  return axios({
    method: "post",
    url: url,
    data: bodyFormData,
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export default apiRegisterAccount;
