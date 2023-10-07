import { httpService } from "src/libs/https";

const { httpPostHeaders, httpPutHeaders, httpGetHeaders } = httpService();

const apiUrl = "api/Catalogue/";

export function catalogueBenefitsAdminApi() {
  async function getBenefits() {
    let response = await httpGetHeaders(apiUrl + "GetBenefits");
    return response;
  }

  const postBenefits = async (addBenefitsApi) => {
    let response = await httpPostHeaders(
      apiUrl + "PostBenefits",
      addBenefitsApi
    );
    return response;
  };

  const putBenefits = async (id, data) => {
    let response = await httpPutHeaders(apiUrl + "PutBenefits/" + id, data);
    return response;
  };

  return { getBenefits, postBenefits, putBenefits };
}
