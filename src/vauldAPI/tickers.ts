import request from "./_axiosInstance";

export const getVauldAllTickerPrice = () => {
  return request("/fiat/getAllPrice", {});
};
