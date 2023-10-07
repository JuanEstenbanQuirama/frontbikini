import { httpService } from "src/libs/https";

const { httpGetHeaders, httpPostHeaders, httpPutHeaders } = httpService();

const apiUrl = "api/Catalogue/";

export function catalogueNotificationsAdminApi() {
 
  async function getNotificationStatuses() {
    let response = await httpGetHeaders(apiUrl + "GetNotificationStatuses");
    return response;
  }
  const postNotificationStatuses = async (addGenderApi) => {
    let response = await httpPostHeaders(apiUrl + "PostNotificationStatusess", addGenderApi);
    return response;
  }

  const putNotificationStatuses = async (id, data) => {
    let response = await httpPutHeaders(apiUrl + "PutNotificationStatuses/" + id, data);
    return response;
  }

  async function getNotificationTypes() {
    let response = await httpGetHeaders(apiUrl + "GetNotificationTypes");
    return response;
  }

  const postNotificationTypes = async (addGenderApi) => {
    let response = await httpPostHeaders(apiUrl + "PostNotificationTypes", addGenderApi);
    return response;
  }

  const putNotificationTypes = async (id, data) => {
    let response = await httpPutHeaders(apiUrl + "PutNotificationTypes/" + id, data);
    return response;
  }

  return {
    getNotificationStatuses,
    postNotificationStatuses,
    putNotificationStatuses,
    getNotificationTypes,
    putNotificationTypes,
    postNotificationTypes
  };
}
