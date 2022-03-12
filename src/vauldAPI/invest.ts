import request from "./_axiosInstance";

export const createVauldFiatOrder = (payload) => {
  return request("/fiat/createOrder", payload);
};

export const getVauldFiatOrderDetails = (payload) => {
  return request("/fiat/details", payload);
};
