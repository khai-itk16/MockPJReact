import axios from "axios";
import { domain } from "../constants";

const GetShopProductList = (currentShop) => {
  const url = `${domain}api/Shop/${currentShop.shopId}`;
  console.log(url);
  return axios({
    method: "get",
    url,
  });
};

export default GetShopProductList;
