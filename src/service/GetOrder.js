import axios from "axios";
import { domain } from "../constants";

const getOrders = (customerId) => {
  const url = `${domain}api/Order/${customerId}/customer/all`;
  console.log(url);
  return axios({
    method: "get",
    url,
  });
};

export default getOrders;
