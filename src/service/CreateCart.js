import axios from "axios";
import { domain } from "../constants";

const CreateCart = (data) => {
  const url = `${domain}api/Cart/create`;
  console.log(url);
  console.log(data);

  return axios({
    method: "post",
    url,
    data,
  });
};

export default CreateCart;
