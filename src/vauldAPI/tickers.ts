import request from "./_axiosInstance";

export const getVauldAllTickerPrice = () => {
  return request("/fiat/getAllPrice", {});
};

export const getCryptoFiatPrice = (payload) => {
  return request("/fiat/getPrice", { ...payload, type: "buy" });
};

export const getCryptoFiatSellPrice = (payload) => {
  return request("/fiat/getPrice", { ...payload, type: "sell" });
};
