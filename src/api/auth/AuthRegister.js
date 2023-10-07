// Register
import { httpService } from "src/libs/https";

const { httpGet, httpPost } = httpService();

const apiUrl = "api/Auth/";

export function authRegisterApi() {
  async function getIp() {
    let response = await httpGet(
      "https://api.ipify.org/?format=jsonp&callback=get_ip"
    );
    let ipObject = JSON.parse(response.substring(7, response.length - 2));
    let resIp = ipObject.ip;
    return resIp;
  }
  const register = async (userCreate) => {
    let response = await httpPost(apiUrl + "Register", userCreate);
    return response;
  };

  async function infoForRegister() {
    let response = await httpGet(apiUrl + "GetInfoForRegister");
    return response;
  }

  const availableEmail = async (userCreate) => {
    let data = {
      email: userCreate,
    };
    let response = await httpPost(apiUrl + "AvailableEmail", data);
    return response;
  };

  const availableUserName = async (userCreate) => {
    let data = {
      userName: userCreate,
    };
    let response = await httpPost(apiUrl + "AvailableUserName", data);
    return response;
  };
  const availableNameToShow = async (userCreate) => {
    let data = {
      nameToShow: userCreate,
    };
    let response = await httpPost(apiUrl + "AvailableNameToShow", data);
    return response;
  };

  return {
    getIp,
    register,
    infoForRegister,
    availableEmail,
    availableNameToShow,
    availableUserName,
  };
}
