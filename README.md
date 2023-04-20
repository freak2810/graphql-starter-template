## About the template

This is a starter template containing all the required tools to build a backend application using graphql.

## Built with

- [NodeJS](https://nodejs.org/en)
- [Typescript](https://www.typescriptlang.org/)
- [GraphQL](https://graphql.org/)
- [Apollo Server + Federation](https://www.apollographql.com/docs/apollo-server/)
- [MongoDB](https://www.mongodb.com/)
- [Serverless](https://www.serverless.com/framework/docs)

## Features

- ✅ Supports both server and serverless deployments
- ✅ ESLint + Prettier
- ✅ GraphQL API
- ✅ Apollo Federation
- ✅ Automatic code generation for GraphQL types and resolvers using [graphql-code-generator](https://the-guild.dev/graphql/codegen)
- ✅ Validation using Zod. [Learn more](https://github.com/withshepherd/graphql-codegen-zod)
- ✅ Testing setup using Jest

<br/>

## Updates

### 17th April, 2023

- Updated the codegen to use `mergeTypeDefs` instead of `graphql-ast`. Now graphql schema is updated on the fly, but still requires a restart if the types need to be updated.
- Updated directives to support proper schema generation with mongo-db related directives and zod validations.

### 20th April, 2023

- Added `ts-node` to the dev dependencies. This is now used to run the development server.

<br/>

## Author

[Aditya Manikanth Rao](https://github.com/freak2810)
