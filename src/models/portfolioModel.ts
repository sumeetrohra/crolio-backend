import mongoose from "mongoose";

const { Schema } = mongoose;

const TickerHoldingData = new Schema({
  id: {
    type: Schema.Types.ObjectId,
    ref: "tickers",
    required: true,
  },
  pair: {
    type: String,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  tickerAmount: {
    type: Number,
    required: true,
  },
  base: {
    type: Number,
    required: true,
  },
});

const PortfolioIndexData = new Schema(
  {
    indexValue: {
      type: Number,
      required: true,
    },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

const PortfolioSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      index: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    initialInvestment: {
      type: Number,
      required: true,
      default: 100000,
    },
    holdings: [TickerHoldingData],
    dailyIndexHistory: [PortfolioIndexData],
  },
  { timestamps: true }
);

const Portfolio = mongoose.model("portfolios", PortfolioSchema);

export default Portfolio;
