import { httpService } from "src/libs/https";

const { httpPostHeaders, httpPutHeaders, httpGetHeaders } = httpService();

const apiUrl = "api/Catalogue/";

export function catalogueMenuAdminApi() {
  async function getMenus() {
    let response = await httpGetHeaders(apiUrl + "GetMenus");
    return response;
  }

  const postMenu = async (AddMenuApi) => {
    let response = await httpPostHeaders(apiUrl + "PostMenus", AddMenuApi);
    return response;
  };

  const putMenu = async (id, selectedMenu) => {
    let response = await httpPutHeaders(apiUrl + "PutMenus/" + id, selectedMenu);
    return response;
  };

  async function getMenuSubs() {
    let response = await httpGetHeaders(apiUrl + "GetMenuSubs");
    return response;
  }

  const postMenuSubs = async (addMenuSubApi) => {
    let response = await httpPostHeaders(apiUrl + "PostMenusSubs", addMenuSubApi);
    return response;
  };

  const putMenuSubs = async (selectedMenuSub) => {
    let response = await httpPutHeaders(apiUrl + "PutMenuSubs", selectedMenuSub);
    return response;
  };

  return {
    getMenus,
    postMenu,
    putMenu,
    getMenuSubs,
    postMenuSubs,
    putMenuSubs,
  };
}
