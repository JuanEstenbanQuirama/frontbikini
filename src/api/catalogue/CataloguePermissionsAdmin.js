import { api } from "src/boot/axios";
import { httpService } from "src/libs/https";

const { httpPostHeaders, httpPutHeaders, httpGetHeaders } = httpService();

const apiUrl = "api/Catalogue/";

export function cataloguePermissionsAdminApi() {
  async function getPermissions() {
    let response = await httpGetHeaders(apiUrl + "GetPermissions");
    return response;
  }

  const postPermissions = async (addPermissionApi) => {
    let response = await httpPostHeaders(apiUrl + "PostPermissions", addPermissionApi);
    return response;
  }

  const putPermissions = async (id, data) => {
    let response = await httpPutHeaders(apiUrl + "PutPermissions/" + id, data);
    return response;
  }


  return {getPermissions, postPermissions, putPermissions }
}
