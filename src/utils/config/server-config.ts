/* eslint-disable unicorn/prefer-module */
import { ApolloServer } from '@apollo/server';
import { buildSubgraphSchema } from '@apollo/subgraph';
import { loadFilesSync } from '@graphql-tools/load-files';
import { mergeResolvers, mergeTypeDefs } from '@graphql-tools/merge';
import { gql } from 'graphql-tag';
import path from 'path';

import { plugins } from '../functions/plugins';
import { Context } from '../types/context';

const appResolvers = loadFilesSync(path.join(__dirname, '../../', './src/**/*.resolver.js'));
export const resolvers = mergeResolvers(appResolvers);

const schemas = loadFilesSync(path.join(__dirname, '../../../../', './src/**/*.graphql'));
const directiveTypeDefinition = gql`
  directive @entity(embedded: Boolean, additionalFields: [AdditionalEntityFields]) on OBJECT
`;
export const schema = mergeTypeDefs([...schemas, directiveTypeDefinition]);

export const server = new ApolloServer<Context>({
  status400ForVariableCoercionErrors: true,
  plugins,
  schema: buildSubgraphSchema({
    typeDefs: schema,
    resolvers: resolvers as never,
  }),
});
