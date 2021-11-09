import axios from "axios";
import { domain } from "../constants";

const apiLoginAccount = (data) => {
  const { phoneNumber, roleUser } = data;
  var url = null;

  if (roleUser === "customer") {
    url = domain + "api/Customer/login";
  } else {
    url = domain + "api/Shop/login";
  }

  return axios({
    method: "post",
    url: url,
    data: { phoneNumber },
  });
};

export default apiLoginAccount;
