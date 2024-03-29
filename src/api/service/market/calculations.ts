import {
  TPairBook,
  TBookItem,
} from '../../../store/book.type';

import {
  getBestBid,
  getBestAsk,
} from '../bidAsk';

import ICalculate from './calculations.type';

const calcBuy:ICalculate = (pair:TPairBook, amount:number):number => {
  const bidItem:TBookItem = getBestBid(pair.bids);
  return bidItem.PRICE * amount;
};

const calcSell:ICalculate = (pair:TPairBook, amount:number):number => {
  const askItem:TBookItem = getBestAsk(pair.asks);
  return askItem.PRICE * amount;
};

export {
  calcBuy,
  calcSell,
};
