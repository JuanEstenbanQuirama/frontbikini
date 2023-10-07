import { httpService } from "src/libs/https";

const { httpPostHeaders, httpPutHeaders, httpGetHeaders } = httpService();

const apiUrl = "api/User/";

export function usersAdminApi() {
  async function getUsers() {
    let response = await httpGetHeaders(apiUrl + "GetUsers");
    return response;
  }

  const postUsers = async (data) => {
    let response = await httpPostHeaders(apiUrl + "PostUsers", data);
    return response;
  };

  const putUsers = async (data) => {
    let response = await httpPutHeaders(apiUrl + "PutUsers", data);
    return response;
  };

  async function getUserProfilePage(data) {
    let response = await httpGetHeaders(apiUrl + "getUserProfilePage/" + data);
    return response;
  }

  const postSetUserProfileInfo = async (data) => {
    let response = await httpPostHeaders(apiUrl + "SetUserProfileInfo", data);
    return response;
  };

  const postSetProfilePhoto = async (data) => {
    let response = await httpPostHeaders(apiUrl + "SetProfilePhoto", data);
    return response;
  };

  async function getUserMeasurements(id) {
    let response = await httpGetHeaders(apiUrl + "GetUserMeasurements/" + id);
    return response;
  }

  const postUserMeasurements = async (data) => {
    let response = await httpPostHeaders(apiUrl + "PostUserMeasurements", data);
    return response;
  };

  const putUserMeasurements = async (data) => {
    let response = await httpPutHeaders(apiUrl + "PutUserMeasurements", data);
    return response;
  };

  return {
    getUsers,
    postUsers,
    putUsers,
    getUserProfilePage,
    postSetUserProfileInfo,
    postSetProfilePhoto,
    getUserMeasurements,
    postUserMeasurements,
    putUserMeasurements,
  };
}
