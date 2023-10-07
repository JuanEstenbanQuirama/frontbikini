import { httpService } from "src/libs/https";

const { httpPostHeaders, httpPutHeaders, httpGetHeaders } = httpService();

const apiUrl = "api/Catalogue/";

export function catalogueBlogAdminApi() {
  async function getBlogCategories() {
    let response = await httpGetHeaders(apiUrl + "GetBlogCategories");
    return response;
  }

  const postBlogCategories = async (data) => {
    let response = await httpPostHeaders(apiUrl + "PostBlogCategories", data);
    return response;
  };

  const putBlogCategories = async (id, data) => {
    let response = await httpPutHeaders(
      apiUrl + "PutBlogCategories/" + id,
      data
    );
    return response;
  };

  async function getBlogStatuses() {
    let response = await httpGetHeaders(apiUrl + "GetBlogStatuses");
    return response;
  }

  const postBlogStatuses = async (data) => {
    let response = await httpPostHeaders(apiUrl + "PostBlogStatuses", data);
    return response;
  };

  const putBlogStatuses = async (id, data) => {
    let response = await httpPutHeaders(apiUrl + "PutBlogStatuses/" + id, data);
    return response;
  };

  async function getBlogTopics() {
    let response = await httpGetHeaders(apiUrl + "GetBlogTopics");
    return response;
  }

  const postBlogTopics = async (data) => {
    let response = await httpPostHeaders(apiUrl + "PostBlogTopics", data);
    return response;
  };

  const putBlogTopics = async (id, data) => {
    let response = await httpPutHeaders(apiUrl + "PutBlogTopics/" + id, data);
    return response;
  };

  return {
    getBlogCategories,
    putBlogCategories,
    postBlogCategories,
    getBlogStatuses,
    putBlogStatuses,
    postBlogStatuses,
    getBlogTopics,
    putBlogTopics,
    postBlogTopics,
  };
}
