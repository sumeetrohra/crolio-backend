import { getCryptoFiatPrice } from "../vauldAPI/tickers";
import { getTickerById } from "../middlewares/tickers";
import PortfolioModel from "../models/portfolioModel";

const INDEX_CALC_INVESTMENT = 100000;

export const createPortfolio = async (req, res) => {
  const { name, description, holdings } = req.body;
  const totalWeight = holdings.reduce(
    (acc, curr) => acc + Number(curr.weight),
    0
  );

  if (totalWeight !== 100) {
    return res.status(400).send("Total weights are not 100");
  }

  // Ticker data
  let tickers;
  try {
    tickers = await Promise.all(
      holdings.map((ticker) => getTickerById(ticker.id))
    );
  } catch (err) {
    return res.status(400).send("Invalid ticker ids");
  }

  // Ticker buy price
  let tickerPrice;
  try {
    tickerPrice = await Promise.all(
      tickers.map((ticker) =>
        getCryptoFiatPrice({
          amount: ticker.base,
          token: ticker.pair.split("/")[0].toLowerCase(),
        }).then((data) => ({
          // @ts-ignore
          ...data.data,
          id: ticker.id,
          pair: ticker.pair,
        }))
      )
    );
  } catch (err) {
    return res.status(500).send("Internal error");
  }

  const holdingValues = tickerPrice.map((data) => {
    const weight = holdings.find(
      (holdingData) => holdingData.id === data.id
    ).weight;
    const base = Math.log10(data.baseAmount);
    const tickerAmount = (
      (INDEX_CALC_INVESTMENT * weight) /
      (100 * data.quoteAmount)
    ).toFixed(base);
    return {
      id: data.id,
      pair: data.pair,
      weight,
      tickerAmount,
      base,
    };
  });

  const portfolio = await PortfolioModel.create({
    name,
    description,
    holdings: holdingValues,
    dailyIndexHistory: [
      {
        indexValue: 100,
      },
    ],
  });

  return res.status(201).send({ portfolio });
};

export const getAllPortfolios = async (req, res) => {
  try {
    const portfolios = await PortfolioModel.find();
    return res.status(200).json({ portfolios });
  } catch (err) {
    return res.send(500).send("Internal error");
  }
};

export const getPortfolioData = async (req, res) => {
  try {
    const portfolio = await PortfolioModel.findById(req.params.portfolioId);
    return res.status(200).json(portfolio);
  } catch (err) {
    return res.send(500).send("Internal error");
  }
};
