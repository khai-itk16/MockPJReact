import axios from "axios";
import { domain } from "../constants";

const DeleteItemShopProduct = (data) => {
  const url = `${domain}api/Item`;
  console.log(url);
  console.log(data);
  return axios({
    method: "delete",
    url,
    data,
  });
};

export default DeleteItemShopProduct;
