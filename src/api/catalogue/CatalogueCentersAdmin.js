import { httpService } from "src/libs/https";

const { httpPostHeaders, httpPutHeaders, httpGetHeaders } = httpService();

const apiUrl = "api/Catalogue/";

export function catalogueCentersAdminApi() {
  async function getCenter() {
    let response = await httpGetHeaders(apiUrl + "GetCenter");
    return response;
  }

  const postCenter = async (data) => {
    let response = await httpPostHeaders(apiUrl + "PostCenter", data);
    return response;
  };

  const putCenter = async (data) => {
    let response = await httpPutHeaders(apiUrl + "PutCenter", data);
    return response;
  };

  async function getColors() {
    let response = await httpGetHeaders(apiUrl + "GetColors");
    return response;
  }

  async function getStates() {
    let response = await httpGetHeaders(apiUrl + "GetStates");
    return response;
  }

  async function getCenterTypes() {
    let response = await httpGetHeaders(apiUrl + "GetCenterTypes");
    return response;
  }
  const postCenterTypes = async (addCenterTypeApi) => {
    let response = await httpPostHeaders(
      apiUrl + "PostCenterTypes",
      addCenterTypeApi
    );
    return response;
  };

  const putCenterTypes = async (id, data) => {
    let response = await httpPutHeaders(apiUrl + "PutCenterTypes/" + id, data);
    return response;
  };

  return {
    getCenter,
    postCenter,
    putCenter,
    getColors,
    getStates,
    getCenterTypes,
    postCenterTypes,
    putCenterTypes,
  };
}
