import axios from "axios";
import { domain } from "../constants";

const getOrderById = (orderId) => {
  const url = `${domain}api/Order/${orderId}`;
  console.log(url);
  return axios({
    method: "get",
    url,
  });
};

export default getOrderById;
