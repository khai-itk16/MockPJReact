import axios from "axios";
import { domain } from "../constants";

const AddItemShopProduct = (data) => {
  const url = `${domain}api/Item/create`;
  console.log(url);
  console.log(data);
  const { ShopId, Name, Price, Image } = data;
  var bodyFormData = new FormData();
  bodyFormData.append("ShopId", ShopId);
  bodyFormData.append("Name", Name);
  bodyFormData.append("Price", Price);
  bodyFormData.append("Image", Image);

  console.log(bodyFormData);
  return axios({
    method: "post",
    url,
    data: bodyFormData,
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export default AddItemShopProduct;
