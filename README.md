# Meetups Api

🎉 Meetups microservices

## Installation:

```
$ git clone https://github.com/Defou1ts/product-catalog-management-system
```

### Install dependencies

```
yarn install
```

### Configure environment for each app.

-   [Carts Service](https://github.com/Defou1ts/product-catalog-management-system/tree/main/apps/carts/README.md)
-   [Gateway](https://github.com/Defou1ts/product-catalog-management-system/tree/main/apps/gateway/README.md)
-   [Orders Service](https://github.com/Defou1ts/product-catalog-management-system/tree/main/apps/orders/README.md)
-   [Products Service](https://github.com/Defou1ts/product-catalog-management-system/tree/main/apps/products/README.md)
-   [Users Service](https://github.com/Defou1ts/product-catalog-management-system/tree/main/apps/users/README.md)

### Start production or development docker-compose file with folowwing command:

```
$ yarn start:dev
//or
$ yarn start:prod
```

## Basic functionality:

-   GraphQL supergraph with relations bounded with Apollo Federation
-   Remote logging to logtail, separated saving combined and error logs
-   Paypal orders payments
-   Redis data caching
-   Many to Many relations
-   Users role guards
-   Input data validation
-   JWT authorization with access token and refresh token

## Technologies stack & project structure:

-   **_NestJS_**
-   **_GraphQL_**
-   **_PostgreSQL_**
-   **_Typeorm_**
-   **_Apollo Federation_**
-   **_Eslint_**
-   **_Redis_**
-   **_PassportJS_**
-   **_Passport_**
-   **_Microservices_**
-   **_Redis_**
