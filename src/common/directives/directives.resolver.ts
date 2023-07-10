/* eslint-disable no-param-reassign */
/* eslint-disable unicorn/no-abusive-eslint-disable */
/* eslint-disable consistent-return */
import { getDirective, mapSchema } from '@graphql-tools/utils';
import { GraphQLSchema } from 'graphql';

import { ForbiddenError } from '../../utils/functions/errors';
import { LoggedInUser } from '../../utils/types/context';

const checkAuthorization = (user: LoggedInUser | null) => {
  if (!user) throw new ForbiddenError('Unauthenticated');
};

export const authorizationDirectiveTransformer = (schema: GraphQLSchema, directiveName: string) => {
  const typeDirectiveArgumentMaps: Record<string, any> = {};

  return mapSchema(schema, {
    'MapperKind.TYPE': (type) => {
      const authDirective = getDirective(schema, type, directiveName)?.[0];

      if (authDirective) {
        typeDirectiveArgumentMaps[type.name] = authDirective;
      }

      // eslint-disable-next-line
      return undefined;
    },
    'MapperKind.OBJECT_FIELD': (fieldConfig) => {
      const authDirective =
        getDirective(schema, fieldConfig, directiveName)?.[0] ?? typeDirectiveArgumentMaps[directiveName];

      if (authDirective) {
        const { requires } = authDirective;

        if (requires) {
          const { resolve } = fieldConfig;

          fieldConfig.resolve = (source, args, context, info) => {
            const { user } = context;

            checkAuthorization(user);

            if (resolve) return resolve(source, args, context, info);
          };

          return fieldConfig;
        }
      }
    },
  });
};
