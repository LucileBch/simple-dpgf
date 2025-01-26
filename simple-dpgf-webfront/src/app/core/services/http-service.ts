const BASE_URL = "http://localhost:8080/api";

export type RequestParam = {
  key: string;
  value: string;
};

export function addRequestParams(
  url: string,
  token: string | undefined,
  requestParams?: RequestParam[]
): { finalUrl: RequestInfo; headers: Headers } {
  let finalUrl = BASE_URL + url;
  if (requestParams && requestParams.length > 0) {
    finalUrl += "?";
    requestParams.forEach((requestParam, index) => {
      if (index !== 0) {
        finalUrl += "&";
      }
      finalUrl += `${requestParam.key}=${requestParam.value}`;
    });
  }
  const headers = new Headers();
  if (token !== undefined) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  return { finalUrl, headers };
}
