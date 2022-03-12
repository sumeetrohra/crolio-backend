import { getCryptoFiatPrice } from "../vauldAPI/tickers";

export const getUSDTBuyPrice = async () => {
  return getCryptoFiatPrice({
    amount: 1000000,
    type: "buy",
    token: "usdt",
  });
};

export const getUSDTSellPrice = async () => {
  return getCryptoFiatPrice({
    amount: 1000000,
    type: "sell",
    token: "usdt",
  });
};
