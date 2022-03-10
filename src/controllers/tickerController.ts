import { getVauldAllTickerPrice } from "../vauldAPI/tickers";
import TickerModel from "../models/tickerModel";

export const updateAllTickerPrice = async (req, res) => {
  try {
    const data = await getVauldAllTickerPrice();
    if (!(data as any).success) {
      return res.status(500).send("Internal Error");
    }

    const allINRPairs = (data as any).data.allPair;
    await Promise.all(
      allINRPairs.map(async (inrPairData) => {
        const pair = await TickerModel.findOne({ pair: inrPairData.pair });
        if (!pair) {
          return await TickerModel.create({
            pair: inrPairData.pair,
            dailyPriceHistory: [
              {
                ask: inrPairData.ask,
                bid: inrPairData.bid,
              },
            ],
          });
        }
        return TickerModel.updateOne(
          { pair: inrPairData.pair },
          {
            $push: {
              dailyPriceHistory: {
                ask: inrPairData.ask,
                bid: inrPairData.bid,
              },
            },
          }
        );
      })
    );

    return res.status(200).json({ success: true, data });
  } catch (err) {
    res.status(500).send("Internal Error");
  }
};

export const getAllTickers = async (req, res) => {
  try {
    const tickers = await TickerModel.find();
    return res.status(200).json({ tickers });
  } catch (err) {
    return res.status(500).send(err);
  }
};
