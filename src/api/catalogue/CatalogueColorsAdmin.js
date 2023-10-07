import { httpService } from "src/libs/https";

const { httpPostHeaders, httpPutHeaders, httpGetHeaders } = httpService();

const apiUrl = "api/Catalogue/";

export function catalogueColorsAdminApi() {
  async function getColors() {
    let response = await httpGetHeaders(apiUrl + "GetColors");
    return response;
  }

  const postColors = async (addColorApi) => {
    let response = await httpPostHeaders(apiUrl + "PostColors", addColorApi);
    return response;
  };

  const putColors = async (id, data) => {
    let response = await httpPutHeaders(apiUrl + "PutColors/" + id, data);
    return response;
  };

  return { getColors, postColors, putColors };
}
