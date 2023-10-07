import { httpService } from "src/libs/https";

const { httpPostHeaders, httpPutHeaders, httpGetHeaders } = httpService();

const apiUrl = "api/Catalogue/";

export function catalogueTimeZonesAdminApi() {
  async function getTimeZones() {
    let response = await httpGetHeaders(apiUrl + "GetTimeZones");
    return response;
  }

  const postTimeZones = async (data) => {
    let response = await httpPostHeaders(apiUrl + "PostTimeZones", data);
    return response;
  };

  const putTimeZones = async (id, data) => {
    let response = await httpPutHeaders(apiUrl + "PutTimeZones/" + id, data);
    return response;
  };

  return { getTimeZones, postTimeZones, putTimeZones };
}
