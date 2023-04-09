/* eslint-disable unicorn/prefer-module */
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { buildSubgraphSchema } from '@apollo/subgraph';
import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeResolvers } from '@graphql-tools/merge';
import chalk from 'chalk';
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

const start = async () => {
  const server = new ApolloServer<Context>({
    status400ForVariableCoercionErrors: true,
    plugins,

    schema: buildSubgraphSchema({
      typeDefs,
      resolvers: resolvers() as never,
    }),
  });

  const { url } = await startStandaloneServer<Context>(server, {
    context: async (context) => {
      return { ...context, db };
    },
    listen: { port: 4000 },
  });

  console.log(chalk.hex('#f5587b')(`🚀 Server running at ${url}graphql`));
};

start();
