
import { httpService } from "src/libs/https";

const { httpPostHeaders, httpPutHeaders, httpGetHeaders } = httpService();

const apiUrl = "api/Catalogue/";

export function cataloguePronounsAdminApi() {
  async function getPronouns() {
    let response = await httpGetHeaders(apiUrl + "GetPronouns");
    return response;
  }

  const postPronoun = async (data) => {
   
    let response = await httpPostHeaders(apiUrl + "PostPronoun", data);
    return response;
  }

  const putPronouns = async (id, data) => {
    let response = await httpPutHeaders(apiUrl + "PutPronouns/" + id, data);
    return response;
  }

  return {getPronouns, postPronoun, putPronouns }
}
