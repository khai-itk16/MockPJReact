import axios from "axios";
import { domain } from "../constants";

const ChangeStatus = (data) => {
  const url = `${domain}api/Order/status`;
  console.log(url);
  console.log(data);

  return axios({
    method: "put",
    url,
    data,
  });
};

export default ChangeStatus;
