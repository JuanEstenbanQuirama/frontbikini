import { httpService } from "src/libs/https";

const { httpGetHeaders, httpPostHeaders, httpPutHeaders, } = httpService();

const apiUrl = "api/Catalogue/";

export function catalogueClassAdminApi() {
  async function getClassModels() {
    let response = await httpGetHeaders(apiUrl + "GetClassModels");
    return response;
  }

  const postClassModels = async (data) => {
    let response = await httpPostHeaders(apiUrl + "PostClassModels", data);
    return response;
  }

  const putClassModels = async (id, data) => {
    let response = await httpPutHeaders(apiUrl + "PutClassModels/" + id, data);
    return response;
  }

  async function getClassTypes() {
    let response = await httpGetHeaders(apiUrl + "GetClassTypes");
    return response;
  }

  const postClassTypes = async (data) => {
    let response = await httpPostHeaders(apiUrl + "PostClassTypes", data);
    return response;
  }

  const putClassTypes = async (id, data) => {
    let response = await httpPutHeaders(apiUrl + "PutClassTypes/" + id, data);
    return response;
  }

  return {
    getClassModels,
    putClassModels,
    postClassModels,
    getClassTypes,
    putClassTypes,
    postClassTypes
  };
}
