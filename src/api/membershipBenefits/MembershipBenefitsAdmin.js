import { httpService } from "src/libs/https";

const { httpPostHeaders, httpPutHeaders, httpGetHeaders } = httpService();

const apiUrl = "api/Membership/";

export function membershipBenefitsAdminApi() {
  async function getMemberships() {
    let response = await httpGetHeaders(apiUrl + "GetMemberships");
    return response;
  }
  async function getMembershipBenefits() {
    let response = await httpGetHeaders(apiUrl + "GetMembershipBenefits");
    return response;
  }

  const postMembershipBenefits = async (data) => {
    let response = await httpPostHeaders(apiUrl + "PostMembershipBenefits", data);
    return response;
  };

  const putMembershipBenefits = async (data) => {
    let response = await httpPutHeaders(apiUrl + "PutMembershipBenefits", data);
    return response;
  };
  async function getMembershipBenefitsById(id) {
    let response = await httpGetHeaders(apiUrl + "GetMembershipBenefitsById/" + id);
    return response;
  }

  return {
    getMembershipBenefits,
    postMembershipBenefits,
    putMembershipBenefits,
    getMemberships,
    getMembershipBenefitsById,
  };
}
