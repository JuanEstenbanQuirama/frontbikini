import axios from "axios";
import { Cookies } from "quasar";
import { spinnerService } from "./spinner";
import { authValidateTokenApi } from "src/api/auth/authValidateToken";

const { LoaderShown } = spinnerService();
const { postValidateToken, getIp } = authValidateTokenApi();

async function getData() {
  const token = Cookies.get("token_bikini");
  const ip = await getIp();
  const data = {
    token: token,
    lastIp: ip,
  };
  return data;
}

// MANDAR Y RECIBIR HTTTP REQUESTS
export function httpService() {
  let http = axios.create({
    baseURL: import.meta.env.BASE_URL,
  });

  async function hasCookie() {
    if (Cookies.has("token_bikini")) {
      const fromData = await getData();
      const response = await postValidateToken(fromData);
      if (!response) {
        Cookies.remove("token_bikini");
        localStorage.removeItem("user");
        window.location = "/login";
      }
      return response;
    } else {
      return false;
    }
  }

  function backLogin() {
    window.location = "/login";
  }

  // interceptor solicitudes
  http.interceptors.request.use(
    (config) => {
      if (config.url.includes("/login") || config.url.includes("/register")) {
        return config;
      }
      if (!hasCookie()) backLogin();
      return config;
    },
    (error) => {
      backLogin();
      return Promise.reject(error);
    }
  );

  // interceptor de respuesta
  http.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  const httpGet = async (url) => {
    LoaderShown(true);
    let response = await http.get(url);
    LoaderShown(false);
    return response.data;
  };

  const httpPost = async (url, data) => {
    LoaderShown(true);
    let response = await http.post(url, data);
    LoaderShown(false);
    return response.data;
  };

  const httpGetHeaders = async (url) => {
    LoaderShown(true);
    let headers = {
      Authorization: `Bearer ${Cookies.get("token_bikini")}`,
    };
    let response = await http.get(url, { headers });
    LoaderShown(false);
    return response.data;
  };

  const httpPostHeaders = async (url, data) => {
    LoaderShown(true);
    let headers = {
      Authorization: `Bearer ${Cookies.get("token_bikini")}`,
    };
    let response = await http.post(url, data, { headers });
    LoaderShown(false);
    return response.data;
  };

  const httpPutHeaders = async (url, data) => {
    LoaderShown(true);
    let headers = {
      Authorization: `Bearer ${Cookies.get("token_bikini")}`,
    };
    let response = await http.put(url, data, { headers });
    LoaderShown(false);
    return response.data;
  };

  const httpDeleteHeaders = async (url, data) => {
    LoaderShown(true);
    let headers = {
      Authorization: `Bearer ${Cookies.get("token_bikini")}`,
    };
    let response = await http.post(url, data, { headers });
    LoaderShown(false);
    return response.data;
  };

  return {
    httpGet,
    httpPost,
    httpGetHeaders,
    httpPostHeaders,
    httpPutHeaders,
    httpDeleteHeaders,
  };
}
