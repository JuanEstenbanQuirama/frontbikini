import { httpService } from "src/libs/https";

const { httpPostHeaders, httpPutHeaders, httpGetHeaders } = httpService();

const apiUrl = "api/Catalogue/";

export function catalogueCountriesAdminApi() {
  async function getCountries() {
    let response = await httpGetHeaders(apiUrl + "GetCountries");
    return response;
  }

  const postCountries = async (addCountriesApi) => {
    let response = await httpPostHeaders(
      apiUrl + "PostCountries",
      addCountriesApi
    );
    return response;
  };

  const putCountries = async (id, data) => {
    let response = await httpPutHeaders(apiUrl + "PutCountries/" + id, data);
    return response;
  };

  async function getStates() {
    let response = await httpGetHeaders(apiUrl + "GetStates");
    return response;
  }

  const putStates = async (id, data) => {
    let response = await httpPutHeaders(apiUrl + "PutStates/" + id, data);
    return response;
  };
  const postStates = async (data) => {
    let response = await httpPostHeaders(apiUrl + "PostStates", data);
    return response;
  };

  return {
    getCountries,
    postCountries,
    putCountries,
    getStates,
    putStates,
    postStates,
  };
}
