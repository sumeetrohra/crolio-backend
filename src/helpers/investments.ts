import { getCryptoFiatSellPrice } from "../vauldAPI/tickers";

export const getInvestmentStats = async (
  holdings,
  moneyPutIn,
  realizedReturns
) => {
  const currentPriceData = await Promise.all(
    holdings.map(async (holding) => {
      const token = holding.pair.split("/")[0].toLowerCase();
      const price = await getCryptoFiatSellPrice({
        amount: holding.base,
        token,
      }).then((data) => ({
        ...JSON.parse(JSON.stringify(holding)),
        quoteAmount: (data as any).data.quoteAmount,
      }));

      return price;
    })
  );

  const totalCurrentInvestment = currentPriceData.reduce(
    (acc, curr) => acc + curr.currentInvestment,
    0
  );

  const totalCurrentValue = currentPriceData.reduce(
    (acc, curr) => curr.tickerAmount * curr.quoteAmount + acc,
    0
  );

  const currentReturns = totalCurrentValue - totalCurrentInvestment;
  const totalReturns = currentReturns + realizedReturns;
  const stats = {
    moneyPutIn,
    realizedReturns,
    totalCurrentInvestment,
    totalCurrentValue,
    currentReturns,
    totalReturns,
  };

  return stats;
};
