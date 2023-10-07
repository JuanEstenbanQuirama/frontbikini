// login
import { httpService } from "src/libs/https";

const { httpGet, httpPost } = httpService();

// esta constante es solo para saber a que controlador me estoy digirigiendo en el back
const apiUrl = "api/Auth/";

export function authLoginApi() {
  async function getIp() {
    let response = await httpGet(
      "https://api.ipify.org/?format=jsonp&callback=get_ip"
    );
    let ipObject = JSON.parse(response.substring(7, response.length - 2));
    let resIp = ipObject.ip;
    return resIp;
  }
  const login = async (userConfirm) => {
    let response = await httpPost(apiUrl + "login", userConfirm);
    return response;
  };
  return { getIp, login };
}




