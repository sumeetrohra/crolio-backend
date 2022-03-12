import mongoose from "mongoose";

const { Schema } = mongoose;

const TickerHoldingData = new Schema({
  _id: {
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
  currentInvestment: {
    type: Number,
    required: true,
  },
});

export enum OrderType {
  INVEST = "INVEST",
  INVEST_MORE = "INVEST_MORE",
  REBALANCE = "REBALANCE",
  EXIT = "EXIT",
  PARTIAL_EXIT = "PARTIAL_EXIT",
}

enum TransactionType {
  BUY = "buy",
  SELL = "sell",
}

const OrderTransactionData = new Schema({
  orderID: {
    type: String,
    required: true,
  },
  depositToken: { type: String, required: true },
  destinationToken: { type: String, required: true },
  depositAmount: { type: Number, required: true },
  destinationAmount: { type: Number, required: true },
  type: { type: String, required: true },
  fee: { type: Number, required: true },
});

const OrderData = new Schema(
  {
    batch: {
      type: String,
      required: true,
    },
    transactions: [OrderTransactionData],
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

const InvestmentSchema = new Schema(
  {
    portfolioRef: {
      type: Schema.Types.ObjectId,
      ref: "portfolios",
      required: true,
    },
    currentInvestment: {
      type: Number,
      required: true,
    },
    moneyPutIn: {
      type: Number,
      required: true,
    },
    realizedReturns: {
      type: Number,
      required: true,
    },
    userRef: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    holdings: [TickerHoldingData],
    orders: [OrderData],
  },
  { timestamps: true }
);

const Investment = mongoose.model("investments", InvestmentSchema);

export default Investment;
