
import { httpService } from "src/libs/https";

const { httpPostHeaders, httpPutHeaders, httpGetHeaders } = httpService();

const apiUrl = "api/Catalogue/";

export function cataloguInvoiceAdminApi() {
  async function getInvoiceStatuses() {
    let response = await httpGetHeaders(apiUrl + "GetInvoiceStatuses");
    return response;
  }

  const postInvoiceStatuses = async (data) => {
    let response = await httpPostHeaders(apiUrl + "PostInvoiceStatuses", data);
    return response;
  }

  const putInvoiceStatuses = async (id, data) => {
    let response = await httpPutHeaders(apiUrl + "PutInvoiceStatuses/" + id, data);
    return response;
  }

  return {getInvoiceStatuses, putInvoiceStatuses, postInvoiceStatuses }
}
