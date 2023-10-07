import { api } from "src/boot/axios";
import { httpService } from "src/libs/https";

const { httpPostHeaders, httpPutHeaders, httpGetHeaders } = httpService();

const apiUrl = "api/Catalogue/";

export function cataloguePartnerTypesAdminApi() {
  async function getPartnerTypes() {
    let response = await httpGetHeaders(apiUrl + "GetPartnerTypes");
    return response;
  }

  const postPartnerTypes = async (addPartnerTypeApi) => {
   
    let response = await httpPostHeaders(apiUrl + "PostPartnerTypes", addPartnerTypeApi);
    return response;
  }

  const putPartnerTypes = async (id, data) => {
    let response = await httpPutHeaders(apiUrl + "PutPartnerTypes/" + id, data);
    return response;
  }
  
  async function getPartners() {
    let response = await httpGetHeaders(apiUrl + "GetPartners");
    return response;
  }

  const putPartners = async (id, data) => {
    let response = await httpPutHeaders(apiUrl + "PutPartners/" + id, data);
    return response;
  }

  const postPartners = async (data) => {
    let response = await httpPostHeaders(apiUrl + "PostPartners", data);
    return response;
  }
  
  return {getPartnerTypes, postPartnerTypes, putPartnerTypes, getPartners, putPartners, postPartners }
}
