import { getVauldAllTickerPrice } from "../vauldAPI/tickers";
import TickerModel from "../models/tickerModel";

export const updateAllTickerPrice = async (req, res) => {
  try {
    const { id, pwd } = req.body;
    if (id !== process.env.CRON_ID || pwd !== process.env.CRON_PWD) {
      return res.status(401).send("Unauthorized");
    }
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
        return TickerModel.update(
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
