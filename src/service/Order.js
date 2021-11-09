import axios from "axios";
import { domain } from "../constants";

const submitOrder = (data) => {
  const url = domain + "api/Order";

  return axios({
    method: "post",
    url: url,
    data,
  });
};

export default submitOrder;
