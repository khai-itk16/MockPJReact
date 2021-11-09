import axios from "axios";
import { domain } from "../constants";

const submitCart = (data) => {
  const url = domain + "api/Cart/submit";

  return axios({
    method: "post",
    url: url,
    data,
  });
};

export default submitCart;
