import "dotenv/config";
import express from "express";
import request from 'supertest';
import { orderBookRouter } from "../../internal/adapters/http/handlers/OrderBookHandler";
import { DependencyContainer } from "../../config/DI";

const app = express();
app.use('/order_book', orderBookRouter)
DependencyContainer.init();


describe('Order Book API E2E Tests', () => {

  it('should return 200 for BTCUSDT', async () => {
    const response = await request(app).get('/order_book/BTCUSDT');
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('averageMidPrice');
    expect(response.body).toHaveProperty('midPrices');
  });

  it('should return 400 for ETHUSDT', async () => {
    const response = await request(app).get('/order_book/ETHUSDT');
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error', 'PAIR_IS_NOT_HANDLED')
  });
});
