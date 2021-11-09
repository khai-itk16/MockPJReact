import axios from "axios";
import { domain } from "../constants";

const GetShopOrderList = (currentShop) => {
  const url = `${domain}api/Order/${currentShop.shopId}/shop/all`;
  console.log(url);
  return axios({
    method: "get",
    url,
  });
};

export default GetShopOrderList;
