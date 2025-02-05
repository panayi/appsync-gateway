# Appsync API Gateway

Utility method for making API calls to AppSync from Lambdas in AWS.

This library essentially implements the suggested approach outlined by [AWS Amplify Docs](https://docs.amplify.aws/lib/graphqlapi/graphql-from-nodejs/q/platform/js) in a nice package.

## Usage

Install via NPM: 

```
npm i @crft/appsync-gateway --save
```

then use like:

```ts
const {
  GraphQLGateway,
  IAMCredentialsStrategy,
  APIKeyCredentialsStrategy,
  AuthHeaderCredentialsStrategy
} = require('@crft/appsync-gateway');

// IAM Mode
const creds = new IAMCredentialsStrategy();

// API Key Mode
const creds = new APIKeyCredentialsStrategy(API_KEY);

// Auth Headers Mode
const creds = new AuthHeaderCredentialsStrategy(authHeader);

const gateway = new GraphQLGateway(
  creds,
  process.env.API_API_GRAPHQLAPIENDPOINTOUTPUT
);

const myQuery = `
  query ListTodosOperation {
    listTodos {
      items {
        title
      }
    }
  }
`;

await gateway.runQuery({
  operationName: 'ListTodosOperation',
  query: myQuery,
  variables: {
    input: {}
  }
});
```

## Commands
- `npm build` - Run the typescript build
