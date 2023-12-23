import { TBookItem, TBookData } from "../../store/book.type";

import { checkItemTuple } from "./validators";

const parseTuple = (tuple: [number, number, number]): TBookItem => ({
  PRICE: tuple[0],
  COUNT: tuple[1],
  AMOUNT: tuple[2],
});

const parseBookItem = (item: any): TBookItem[] =>
  checkItemTuple(item)
    ? [parseTuple(item)]
    : item.map((e: [number, number, number]) => parseTuple(e));

const parseBookData = (pair: string, orderData: [number, any]): TBookData => ({
  pair,
  chanelId: orderData[0],
  tips: parseBookItem(orderData[1]),
});

export { parseTuple, parseBookData, parseBookItem };
