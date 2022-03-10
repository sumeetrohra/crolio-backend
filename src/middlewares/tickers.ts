import TickerModel from "../models/tickerModel";

export const getTickerById = async (tickerId) => {
  const ticker = await TickerModel.findById(tickerId);
  return ticker;
};
