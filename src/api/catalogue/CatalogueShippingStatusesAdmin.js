
import { httpService } from "src/libs/https";

const { httpPostHeaders, httpPutHeaders, httpGetHeaders } = httpService();

const apiUrl = "api/Catalogue/";

export function catalogueShippingStatusesAdminApi() {
  async function getShippingStatuses() {
    let response = await httpGetHeaders(apiUrl + "GetShippingStatuses");
    return response;
  }

  const postShippingStatuses = async (data) => {
    let response = await httpPostHeaders(apiUrl + "PostShippingStatuses", data);
    return response;
  }

  const putShippingStatuses = async (id, data) => {
    let response = await httpPutHeaders(apiUrl + "PutShippingStatuses/" + id, data);
    return response;
  }

  return {getShippingStatuses, postShippingStatuses, putShippingStatuses }
}
