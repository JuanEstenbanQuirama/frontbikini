import { httpService } from "src/libs/https";

const { httpGetHeaders, httpPostHeaders, httpPutHeaders } = httpService();

const apiUrl = "api/Catalogue/";

export function catalogueProductsAdminApi() {
  async function getProductCategories() {
    let response = await httpGetHeaders(apiUrl + "Getproductcategories");
    return response;
  }

  const putProductCategories = async (id, data) => {
    let response = await httpPutHeaders(apiUrl + "PutProductCategories/" + id, data);
    return response;
  }

  const postProductCategories = async (addGenderApi) => {
    let response = await httpPostHeaders(apiUrl + "PostProductCategories", addGenderApi);
    return response;
  }

  async function getProductTypes() {
    let response = await httpGetHeaders(apiUrl + "GetProductTypes");
    return response;
  }
  const putProductTypes = async (id, data) => {
    let response = await httpPutHeaders(apiUrl + "PutProductTypes/" + id, data);
    return response;
  }

  const postProductTypes = async (addGenderApi) => {
    let response = await httpPostHeaders(apiUrl + "PostProductTypes", addGenderApi);
    return response;
  }
  
  return {
    getProductCategories,
    putProductCategories,
    postProductCategories,
    getProductTypes,
    putProductTypes,
    postProductTypes
  };
}
