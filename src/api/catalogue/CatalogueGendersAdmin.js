
import { httpService } from "src/libs/https";

const { httpPostHeaders, httpPutHeaders, httpGetHeaders } = httpService();

const apiUrl = "api/Catalogue/";

export function catalogueGendersAdminApi() {
  async function getGenders() {
    let response = await httpGetHeaders(apiUrl + "GetGenders");
    return response;
  }

  const postGender = async (addGenderApi) => {
    let response = await httpPostHeaders(apiUrl + "PostGender", addGenderApi);
    return response;
  }

  const putGenders = async (id, data) => {
    let response = await httpPutHeaders(apiUrl + "PutGenders/" + id, data);
    return response;
  }

  return {getGenders, postGender, putGenders }
}
