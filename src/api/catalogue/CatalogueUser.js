import { httpService } from "src/libs/https";

const { httpGetHeaders, httpPostHeaders } = httpService();

const apiUrl = "api/Catalogue/";

export function getCatalogueUserApi() {
  async function getGenders() {
    let response = await httpGetHeaders(apiUrl + "GetGenders");
    return response;
  }

  async function getPronouns() {
    let response = await httpGetHeaders(apiUrl + "GetPronouns");
    return response;
  }

  async function getProfiles() {
    let response = await httpGetHeaders(apiUrl + "GetProfiles");
    return response;
  }

  return {
    getGenders,
    getPronouns,
    getProfiles,
  };
}
