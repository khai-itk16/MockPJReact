import axios from "axios";
import { domain } from "../constants";

const EditItemShopProduct = (data) => {
  const url = `${domain}api/Item`;
  console.log(url);
  console.log(data);
  const { ShopId, ItemId, Name, Price, Image } = data;
  var bodyFormData = new FormData();
  bodyFormData.append("ShopId", ShopId);
  bodyFormData.append("ItemId", ItemId);
  bodyFormData.append("Name", Name);
  bodyFormData.append("Price", Price);
  if (Image) {
    bodyFormData.append("Image", Image);
  }

  console.log(bodyFormData);
  return axios({
    method: "put",
    url,
    data: bodyFormData,
    headers: { "Content-Type": "multipart/form-data" },
  });
};

export default EditItemShopProduct;
