
import { httpService } from "src/libs/https";

const { httpPostHeaders, httpPutHeaders, httpGetHeaders } = httpService();

const apiUrl = "api/Catalogue/";

export function cataloguePaymentAdminApi() {
  async function getPaymentTypes() {
    let response = await httpGetHeaders(apiUrl + "GetPaymentTypes");
    return response;
  }

  const postPaymentTypes = async (data) => {
    let response = await httpPostHeaders(apiUrl + "PostPaymentTypes", data);
    return response;
  }

  const putPaymentTypes = async (id, data) => {
    let response = await httpPutHeaders(apiUrl + "PutPaymentTypes/" + id, data);
    return response;
  }

  return {getPaymentTypes, postPaymentTypes, putPaymentTypes }
}
