import { getUSDTBuyPrice } from "./tickers";

export const getMinimumINRAmountToInvest = async (holdings) => {
  const usdtBuyPrice = await getUSDTBuyPrice();
  const minWeight = Math.min(
    ...holdings.map((holding) => Number(holding.weight))
  );
  const minAmt = ((usdtBuyPrice as any).data.quoteAmount * 1500) / minWeight;
  return minAmt;
};
