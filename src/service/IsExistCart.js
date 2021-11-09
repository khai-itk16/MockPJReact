import axios from "axios";
import { domain } from "../constants";

const IsExistCart = (data) => {
  const url = `${domain}api/Cart/exist/shop/customer`;
  console.log(url);
  console.log(data);

  return axios({
    method: "post",
    url,
    data,
  });
};

export default IsExistCart;
