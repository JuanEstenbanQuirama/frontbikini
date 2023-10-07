import axios from "axios";

const apiUrl = "api/Auth/";
const http = axios.create({
  baseURL: import.meta.env.BASE_URL,
});

export function authValidateTokenApi() {
  async function getIp() {
    let response = await http.get(
      "https://api.ipify.org/?format=jsonp&callback=get_ip"
    );
    let ipObject = JSON.parse(
      response.data.substring(7, response.data.length - 2)
    );
    let resIp = ipObject.ip;
    return resIp;
  };
  const postValidateToken = async (data) => {
    let response = await http.post(apiUrl + "ValidateToken", data);
    return response.data.valid;
  };

  const postLogout = async (data) => {
    let response = await http.post(apiUrl + "logout", data);
    return response.data;
  };

  return { postValidateToken, getIp, postLogout };
}
