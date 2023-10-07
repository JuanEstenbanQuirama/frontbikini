import { httpService } from "src/libs/https";

const { httpPostHeaders, httpPutHeaders, httpGetHeaders } = httpService();

const apiUrl = "api/Classes/";

export function classesAdminApi() {
  // ejercicios 
  async function getClassExcercises() {
    let response = await httpGetHeaders(apiUrl + "GetClassExcercises");
    return response;
  }

  const postClassExcercises = async (data) => {
    let response = await httpPostHeaders(apiUrl + "PostClassExcercises", data);
    return response;
  };

  const putClassExcercises = async (data) => {
    let response = await httpPutHeaders(apiUrl + "PutClassExcercises", data);
    return response;
  };
//----------CLASES
  async function getClasses() {
    let response = await httpGetHeaders(apiUrl + "GetClasses");
    return response;
  }

  const postClasses = async (data) => {
    let response = await httpPostHeaders(apiUrl + "PostClasses", data);
    return response;
  };

  const putClasses = async (data) => {
    let response = await httpPutHeaders(apiUrl + "PutClasses", data);
    return response;
  };

  // Calendario
  async function getActivePersonalClassScheduler() {
    let response = await httpGetHeaders(
      apiUrl + "GetActivePersonalClassScheduler"
    );
    return response;
  }

  async function getActiveGroupClassScheduler() {
    let response = await httpGetHeaders(
      apiUrl + "GetActiveGroupClassScheduler"
    );
    return response;
  }

  const postClassScheduler = async (data) => {
    let response = await httpPostHeaders(apiUrl + "PostClassScheduler", data);
    return response;
  };

  return {
    getClasses,
    postClasses,
    putClasses,
    getClassExcercises,
    postClassExcercises,
    putClassExcercises,
    getActivePersonalClassScheduler,
    getActiveGroupClassScheduler,
    postClassScheduler
  };
}
