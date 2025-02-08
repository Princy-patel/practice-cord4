const defaultHeaders = {
  "Content-Type": "application/json",
};

export const makeApiCall = async (
  url,
  method = "get",
  headers = defaultHeaders
) => {
  const response = await fetch(url, {
    method,
    headers,
  });
  const data = await response.json();
  return data;
};
