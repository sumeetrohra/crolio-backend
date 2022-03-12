import { getCryptoFiatPrice } from "../vauldAPI/tickers";
import { getMinimumINRAmountToInvest } from "../helpers/portfolio";
import PortfolioModel from "../models/portfolioModel";
import UserModel from "../models/userModel";
import InvestmentModel, { OrderType } from "../models/investmentModel";
import {
  createVauldFiatOrder,
  getVauldFiatOrderDetails,
} from "../vauldAPI/invest";
import { getInvestmentStats } from "../helpers/investments";

const createAndGetOrderDetails = async (userID, holding, amount) => {
  const token = holding.pair.split("/")[0].toLowerCase();
  // getCryptoFiatPrice
  const getPrice = await getCryptoFiatPrice({
    amount: holding.base,
    type: "buy",
    token,
  });

  // createVauldFiatOrder
  const order = await createVauldFiatOrder({
    userID,
    type: "buy",
    token,
    inrAmount: Number(amount),
    tokenAmount: Number(amount) / Number((getPrice as any).data.quoteAmount),
  });

  // getVauldFiatOrderDetails
  const orderDetails = await getVauldFiatOrderDetails({
    userID,
    orderID: (order as any).data.orderID,
  });
  return orderDetails;
};

export const addInvestment = async (req, res) => {
  const user = await UserModel.findOne({ firebaseIdentifier: req.uid });
  const { portfolioId, amount } = req.body;
  const portfolio = await PortfolioModel.findById(portfolioId);
  const minAmount = await getMinimumINRAmountToInvest(portfolio.holdings);
  if (amount < minAmount) {
    res.status(400).send("Amount is less than min amount");
  }

  const { holdings } = portfolio;
  const orderData = [];
  // tslint:disable-next-line: prefer-for-of
  for (let i = 0; i < holdings.length; i++) {
    const data = await createAndGetOrderDetails(
      user._private._vauldUserId,
      holdings[i],
      (amount * holdings[i].weight) / 100
    );
    orderData.push({
      ...JSON.parse(JSON.stringify(data)).data.data,
      holding: holdings[i],
    });
  }

  const investmentResult = await InvestmentModel.create({
    portfolioRef: portfolioId,
    currentInvestment: amount,
    moneyPutIn: amount,
    realizedReturns: 0,
    orders: {
      batch: OrderType.INVEST,
      transactions: orderData.map((order) => ({
        orderID: order.orderID,
        depositToken: order.depositToken,
        destinationToken: order.destinationToken,
        depositAmount: order.depositAmount,
        destinationAmount: order.destinationAmount,
        type: order.type,
        fee: order.fee,
      })),
    },
    holdings: orderData.map((order) => ({
      _id: order.holding.id,
      pair: order.holding.pair,
      weight: order.holding.weight,
      base: order.holding.base,
      tickerAmount: order.destinationAmount,
      currentInvestment: order.depositAmount,
    })),
  });

  await UserModel.findByIdAndUpdate(user._id, {
    $push: {
      investments: investmentResult._id,
    },
  });
  return res.status(201).json(investmentResult);
};

export const getAllUserInvestments = async (req, res) => {
  const user = await UserModel.findOne({ firebaseIdentifier: req.uid });
  const investmentIds = user.investments;
  const investments = await InvestmentModel.find({
    _id: { $in: investmentIds },
  });
  const totalMoneyPutIn = investments.reduce(
    (acc, curr) => acc + curr.moneyPutIn,
    0
  );
  const totalRealizedReturns = investments.reduce(
    (acc, curr) => acc + curr.realizedReturns,
    0
  );
  const holdingsArr = investments.map((investment) => investment.holdings);
  const allHoldings = holdingsArr.reduce((acc, curr) => {
    curr.forEach((holding) => acc.push(holding));
    return acc;
  }, []);
  const investmentStats = await getInvestmentStats(
    allHoldings,
    totalMoneyPutIn,
    totalRealizedReturns
  );
  return res.status(200).json({ investments, investmentStats });
};
