import { TBookData, TPairBook } from "../store/book.type";

import book from "../store/book";
import logger from "../utils/logger";

import { TSocketData } from "./socket/socket.type";

import { checkBookFormat } from "./message/validators";

import { parseBookData } from "./message/parsers";

import { bidAskLogic } from "./biz/bidasks";

const updateBook = (bookData: TBookData) => {
  const { pair, tips } = bookData;

  const pairInfo: TPairBook = book.get(pair);

  if (!pairInfo) {
    logger.info(
      `CONSUMER: Pair name ${pair} not found in book, unable to store.`
    );
    return null;
  }

  if (Array.isArray(tips) && tips.length > 0) {
    logger.info(`CONSUMER: Updating pair ${pair}.`);
    tips.forEach((tip) => bidAskLogic(tip, pair));
    return tips;
  }

  return null;
};

const onMessage = (message: { pair: string; msg: TSocketData }) => {
  try {
    const { pair, msg } = message;

    const payload = JSON.parse(msg.toString());

    if (checkBookFormat(payload)) {
      const parsed = parseBookData(pair, payload);
      updateBook(parsed);
    } else {
      logger.error(`CONSUMER: ${pair} invalid message format`);
    }
  } catch (err) {
    logger.error(`CONSUMER: ${(err as Error).message}`);
  }
};

export { onMessage, updateBook };
