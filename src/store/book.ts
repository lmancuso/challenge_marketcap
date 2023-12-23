import { TBook, TPairBook, TBookItem } from "./book.type";

import config from "../config";

let BOOK: TBook = {};
const PAIR_MAX: any = config.store.limit;

const clear = () => {
  BOOK = {};
};

const fill = (pairList: string[]) => {
  pairList.forEach((pair: string) => {
    BOOK[pair] = {
      asks: [],
      bids: [],
    };
  });
};

const get = (pairName: string): TPairBook => BOOK[pairName];

const all = (): TBook => BOOK;

const removeFromArray = (arr: any, obj: any) =>
  arr.filter((v: any) => v !== obj);

const purgeLimit = (list: TBookItem[]) =>
  list.slice(list.length - PAIR_MAX, list.length);

const increaseBids = (pair: string, item: TBookItem) => {
  const pairStore: TPairBook = get(pair);
  pairStore.bids.push(item);
  if (pairStore.bids.length > PAIR_MAX)
    pairStore.bids = purgeLimit(pairStore.bids);
};

const increaseAsks = (pair: string, item: TBookItem) => {
  const pairStore: TPairBook = get(pair);
  pairStore.asks.push(item);
  if (pairStore.asks.length > PAIR_MAX)
    pairStore.asks = purgeLimit(pairStore.asks);
};

const decreaseBids = (pair: string, item: TBookItem) => {
  const pairStore: TPairBook = get(pair);
  pairStore.bids = removeFromArray(pairStore.bids, item);
};

const decreaseAsks = (pair: string, item: TBookItem) => {
  const pairStore: TPairBook = get(pair);
  pairStore.asks = removeFromArray(pairStore.asks, item);
};

export default {
  fill,
  get,
  clear,
  all,
  increaseAsks,
  increaseBids,
  decreaseAsks,
  decreaseBids,
  removeFromArray,
  purgeLimit,
};
