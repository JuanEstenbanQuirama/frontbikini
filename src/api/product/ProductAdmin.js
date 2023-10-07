import { httpService } from "src/libs/https";

const { httpPostHeaders, httpPutHeaders, httpGetHeaders } = httpService();

const apiUrl = "api/Product/";

export function productAdminApi() {
  async function getProducts() {
    let response = await httpGetHeaders(apiUrl + "GetProducts");
    return response;
  }

  const postProducts = async (data) => {
    let response = await httpPostHeaders(apiUrl + "PostProducts", data);
    return response;
  };

  const putProducts = async (data) => {
    let response = await httpPutHeaders(apiUrl + "PutProducts", data);
    return response;
  };


  async function getStorageProducts(id) {
    let response = await httpGetHeaders(apiUrl + "GetStorageProducts/" + id);
    return response;
  }

  const postStorageProducts = async (data) => {
    let response = await httpPostHeaders(apiUrl + "PostStorageProducts", data);
    return response;
  };

  const putStorageProducts = async (data) => {
    let response = await httpPutHeaders(apiUrl + "PutStorageProducts", data);
    return response;
  };

  const postProductImg = async (data) => {
    let response = await httpPostHeaders(apiUrl + "SetProductImg", data);
    return response;
  };

  async function getPackages() {
    let response = await httpGetHeaders(apiUrl + "GetPackages");
    return response;
  }

  const postPackages = async (data) => {
    let response = await httpPostHeaders(apiUrl + "PostPackages", data);
    return response;
  };

  const putPackages = async (data) => {
    let response = await httpPutHeaders(apiUrl + "PutPackages", data);
    return response;
  };

  const postPackageImg = async (data) => {
    let response = await httpPostHeaders(apiUrl + "SetPackageImg", data);
    return response;
  };

  const postPackagesProducts = async (data) => {
    let response = await httpPostHeaders(apiUrl + "PostPackagesProducts", data);
    return response;
  };

  const putPackagesProducts = async (data) => {
    let response = await httpPutHeaders(apiUrl + "PutPackagesProducts", data);
    return response;
  };

  return {
    getProducts,
    postProducts,
    putProducts,
    getStorageProducts,
    postStorageProducts,
    putStorageProducts,
    postProductImg,
    getPackages,
    postPackages,
    putPackages,
    postPackageImg,
    postPackagesProducts,
    putPackagesProducts
  };
}
