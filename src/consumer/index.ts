import "dotenv/config";

import logger from "../utils/logger";

import { moneys, provider } from "../config";

import { onMessage } from "./listener";

import socketBuilder from "./socket/bitFinexbuilder";
import book from "../store/book";

const { host } = provider.bitfinex;

const sockets: any = {};

const createSockets = () => {
	moneys.forEach((money) => {
		logger.debug(`CONSUMER: Register socket for pair - ${money}`);
		sockets[money] = socketBuilder(money, onMessage, host);
	});
};

const boostrap = () => {
	book.fill(moneys);

	createSockets();
};

export { boostrap, createSockets };
