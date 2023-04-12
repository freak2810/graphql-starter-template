/* eslint-disable unicorn/prefer-module */
import { ApolloServer } from '@apollo/server';
import { buildSubgraphSchema } from '@apollo/subgraph';
import { handlers, startServerAndCreateLambdaHandler } from '@as-integrations/aws-lambda';
import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeResolvers } from '@graphql-tools/merge';
import fs from 'fs';
import gql from 'graphql-tag';
import path from 'path';
import { plugins } from 'src/utils/functions/plugins';
import { Context } from 'src/utils/types/context';

import { db } from './src/utils/functions/db';

const typeDefs = gql`
  ${fs.readFileSync(path.resolve(path.join(__dirname, 'common/@generated/schema.graphql')).toString())}
`;

const resolvers = () => {
  const appResolvers = loadFilesSync(path.join(__dirname, './**/*.resolver.js'));

  const response = mergeResolvers(appResolvers);

  return response;
};

const server = new ApolloServer<Context>({
  status400ForVariableCoercionErrors: true,
  plugins,

  schema: buildSubgraphSchema({
    typeDefs,
    resolvers: resolvers() as never,
  }),
});

export const graphqlHandler = startServerAndCreateLambdaHandler(
  server,
  handlers.createAPIGatewayProxyEventV2RequestHandler(),
  {
    context: async () => {
      return { db };
    },
  }
);
