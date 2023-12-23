import ws from "ws";
import { TSocketData } from "./socket.type";
import logger from "../../utils/logger";

const exchangeBuilder = (pair: string, msgHandler: any, host: any) => {
  // eslint-disable-next-line new-cap
  const socket = new ws(host);

  socket.on("open", () => {
    logger.info(`CONSUMER: Socket open to: - ${pair}`);

    const subscription = JSON.stringify({
      event: "subscribe",
      channel: "book",
      freq: "F1",
      pair,
      prec: "P0",
    });

    socket.send(subscription);
  });

  socket.on("message", (msg: TSocketData) => msgHandler({ pair, msg }));

  return socket;
};

export default exchangeBuilder;
