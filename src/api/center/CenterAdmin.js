import { httpService } from "src/libs/https";

const { httpPostHeaders, httpPutHeaders, httpGetHeaders } = httpService();

const apiUrl = "api/Center/";

export function centerAdminApi() {
  async function getALLCenters() {
    let response = await httpGetHeaders(apiUrl + "GetALLCenters");
    return response;
  }

  async function getALLCentersStorage() {
    let response = await httpGetHeaders(apiUrl + "GetALLCentersStorage");
    return response;
  }

  const postCenterStorages = async (data) => {
    let response = await httpPostHeaders(apiUrl + "PostCenterStorages", data);

    return response;
  };

  const putCenterStorages = async (data) => {
    let response = await httpPutHeaders(apiUrl + "PutCenterStorages", data);
    return response;
  };

  return {
    getALLCentersStorage,
    postCenterStorages,
    putCenterStorages,
    getALLCenters
  };
}
