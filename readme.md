## Installation

  

Clone the repository and install the dependencies

  

## Configuration

  

Begin by creating an `.env` file at the root of the project :

  

    make env

  
  

## Execution

  

To start the application:

  

`npm start`

  

## Testing

  

To run the tests:

  

`npm run test`

  

## Architecture

  
  

This program adheres to the principles of hexagonal architecture. I chose this architecture to easily add new crypto providers. You only need to create a new exchange in adapters and add it to the dependency injection file. It is composed of three main layers:

  

-  **Domain**: The core of the application containing business logic. This layer includes entities, value objects, services, and interfaces (ports).

-  **Adapters**: This layer connects the application to external systems, such as exchanges and HTTP endpoints. It includes exchange-specific adapters, mappers, and HTTP handlers.

-  **Configuration**: Manages dependency injection and application setup, ensuring proper initialization and integration of different components.

  
  

## API

  
  
  

> Base URL: `http://localhost:3000/`

  

**ORDER BOOK**:

  

To make things easier for you, I have provided the `make btcusdt` command which will execute this request.

  

-  **`GET /order-book/BTCUSDT`**: Fetches the order book average mid price for the BTCUSDT pair.

  

**Responses:**

-  `200: OK`

```json

{

	"averageMidPrice": 64325.52,

	"midPrices": [

	{

		"broker": "Binance",

		"midPrice": 64322.005000000005

	},

	{

		"broker": "Kraken",

		"midPrice": 64327.55

	},

	{

		"broker": "Huobi",

		"midPrice": 64327.005000000005

	}
	]

}

```

-  `400: BAD REQUEST`

```json

{

	"error": "PAIR_IS_NOT_HANDLED"

}

```

  

  

## Testing Details

  
  

The program's layers are tested with Jest and Supertest. The tests are organized in a dedicated `tests` directory as follows:

  

-  **Unit Tests**: Located in the `tests/unit` directory, these tests focus on the business logic of the services and entities in the domain layer.

-  **Integration Tests**: Located in the `tests/integration` directory, these tests validate the integration of the adapters with the external services.

-  **End-to-End Tests**: Located in the `tests/e2e` directory, these tests cover the entire application flow, from the domain logic through the implementation of the adapters.
