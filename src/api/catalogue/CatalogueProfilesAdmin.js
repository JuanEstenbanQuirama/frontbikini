import { httpService } from "src/libs/https";

const { httpPostHeaders, httpPutHeaders, httpGetHeaders, httpDeleteHeaders } = httpService();

const apiUrl = "api/Catalogue/";

export function catalogueProfilesAdminApi() {
  async function getProfiles() {
    let response = await httpGetHeaders(apiUrl + "GetProfiles");
    return response;
  }

  const postProfile = async (data) => {
    let response = await httpPostHeaders(apiUrl + "PostProfile", data);
    return response;
  };

  const putProfile = async (id, data) => {
    let response = await httpPutHeaders(apiUrl + "PutProfile/" + id, data);
    return response;
  };

  async function getProfilePermission(idProfile) {
    let response = await httpGetHeaders(apiUrl + "GetProfile_Permissions/" + idProfile);
    return response;
  }

  const postProfilePermission = async (data) => {
    let response = await httpPostHeaders(apiUrl + "PostProfilePermission", data);
    return response;
  };

  async function getProfileSubMenus(idProfile) {
    let response = await httpGetHeaders(apiUrl + "GetProfile_Sub_Menus/"+ idProfile);
    return response;
  }

  const postProfileSubMenus = async (data) => {
    let response = await httpPostHeaders(
      apiUrl + "PostProfile_Sub_Menus",
      data
    );
    return response;
  };

  const deleteProfilePermission = async (data) => {
    let response = await httpDeleteHeaders(apiUrl + "DelProfile_Permissions", data);
    return response;
  };

  const deleteProfileSubMenu = async (data) => {
    let response = await httpDeleteHeaders(apiUrl + "DelProfile_Sub_Menus", data);
    return response;
  };

  return {
    getProfiles,
    postProfile,
    putProfile,
    getProfilePermission,
    postProfilePermission,
    deleteProfilePermission,
    getProfileSubMenus,
    postProfileSubMenus,
    deleteProfileSubMenu,
  };
}
