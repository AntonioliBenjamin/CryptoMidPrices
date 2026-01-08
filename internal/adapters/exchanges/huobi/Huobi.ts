import WebSocket from 'ws';
import zlib from 'zlib';
import { ExchangePort } from '../../../core/ports/ExchangePort';
import { OrderBook } from '../../../core/domain/entities/OrderBook';
import { PAIR } from '../../../core/domain/valueObjects/Pair';
import { HUOBI_PAIR, HuobiMapper, HuobiOrderBookResponse } from './HuobiMapper';
import "dotenv/config";

const huobiURL = process.env.HUOBI_URL!;

export class Huobi implements ExchangePort {
    private ws: WebSocket;
    private isConnected: boolean = false;

    constructor() {
        this.ws = new WebSocket(huobiURL);

        this.ws.on('open', () => {
            this.isConnected = true;
        });

        this.ws.on('error', (error) => {
            this.ws.close();
        });

        this.ws.on('close', () => {
            this.isConnected = false;
        });
    }

    async getOrderBook(pair: PAIR): Promise<OrderBook> {
        const huobiPair = HuobiMapper.pairFromDomain(pair);
        await this.waitForConnection();
        this.sendSubscriptionPayload(huobiPair);
        return await this.listenForOrderBook(huobiPair, pair);
    }

    private waitForConnection(): Promise<void> {
        return new Promise((resolve, reject) => {
            if (this.isConnected) {
                resolve();
            } else {
                this.ws.on('open', () => {
                    this.isConnected = true;
                    resolve();
                });

                this.ws.on('error', (error) => {
                    console.error('WebSocket error during waitForConnection:', error);
                    reject(error);
                });

                this.ws.on('close', () => {
                    console.warn('Huobi WebSocket connection closed during waitForConnection');
                    this.isConnected = false;
                    reject(new Error('WebSocket connection closed'));
                });
            }
        });
    }

    private sendSubscriptionPayload(huobiPair: HUOBI_PAIR): void {
        const payload = {
            sub: `market.${huobiPair}.depth.step0`,
            id: `${huobiPair}_depth`
        };

        const trySendPayload = () => {
            if (this.isConnected) {
                this.ws.send(JSON.stringify(payload));
            } else {
                setTimeout(trySendPayload, 100);
            }
        };

        trySendPayload();
    }

    private async listenForOrderBook(huobiPair: string, pair: PAIR): Promise<OrderBook> {
        return new Promise((resolve, reject) => {
            this.ws.on('message', (data: WebSocket.Data) => {

                try {
                    const message = this.parseMessage(data);

                    if (message.ping) {
                        this.ws.send(JSON.stringify({ pong: message.ping }));
                        return;
                    }

                    if (message.ch && message.ch.includes(huobiPair)) {
                        const orderBookResponse: HuobiOrderBookResponse = message;
                        const orderBook = HuobiMapper.orderBookToDomain(orderBookResponse, pair);
                        resolve(orderBook);
                    }
                } catch (error) {
                    console.error('Error parsing WebSocket message:', error);
                    reject(new Error('Failed to parse WebSocket message'));
                }
            });
        });
    }

    private parseMessage(data: WebSocket.Data): any {
        let message;

        if (data instanceof Buffer) {
            const decompressed = zlib.gunzipSync(data);
            message = JSON.parse(decompressed.toString());
        } else if (typeof data === 'string') {
            message = JSON.parse(data);
        } else {
            throw new Error('Received data in unknown format');
        }

        return message;
    }
}
