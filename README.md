# Pet Store

REST API for the pet store which holds cats, dogs and rabbits.

- Each pet has a name, date of birth and a species attribute.
- The pets can be queried for all attributes.
- Each pets' attribute can be updated.

## Uses

- Node.js 16.x
- NestJS 9.x
- TypeORM
- Postgres
- Swagger

## Setup

- Use the correct Node.js version

```
nvm use
```

- Install project dependencies

```
npm install
```

- Create a Postgres database
- Create a file for environment variables.

```
cp .env.example .env
```

- Fill in the values for your DB credentials.

## Start the server

```
npm run start
```

## OpenAPI documentation

See [http://localhost:3001/api](http://localhost:3001/api).

## Testing

### Unit tests

These tests make sure that the PetsService methods are working as expected. 
The TypeORM repositories for the Pet and Species entities are mocked.

```
npm run test
```

### Integration tests

These tests mock the PetsService, and make sure that the API requests are working as expected.

```
npm run test:e2e
```
