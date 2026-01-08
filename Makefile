.PHONY: env
env:
	@ touch .env 
	@ echo "PORT=3000" >> .env
	@ echo "BINANCE_URL=https://api.binance.com/api/v3/depth" >> .env
	@ echo "HUOBI_URL=wss://api.huobi.pro/ws" >> .env
	@ echo "KRAKEN_URL=https://api.kraken.com/0/public/Depth" >> .env
	@ echo "done"

.PHONY: btcusdt
btcusdt:
	@ curl -X GET "http://localhost:3000/order-book/BTCUSDT" | jq '.'