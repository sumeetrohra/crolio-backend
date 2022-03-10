import mongoose from "mongoose";

const { Schema } = mongoose;

const TickerPriceData = new Schema(
  {
    bid: {
      type: mongoose.Types.Decimal128,
      required: true,
    },
    ask: {
      type: mongoose.Types.Decimal128,
      required: true,
    },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

const TickerSchema = new Schema(
  {
    pair: {
      type: String,
      required: true,
      index: true,
      unique: true,
    },
    base: {
      type: Number,
      required: true,
    },
    dailyPriceHistory: [TickerPriceData],
  },
  { timestamps: true }
);

const Ticker = mongoose.model("tickers", TickerSchema);

export default Ticker;
