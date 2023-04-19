import { handlers, startServerAndCreateLambdaHandler } from '@as-integrations/aws-lambda';

import { server } from './src/utils/config/server-config';
import { db } from './src/utils/functions/db';

export const graphqlHandler = startServerAndCreateLambdaHandler(
  server,
  handlers.createAPIGatewayProxyEventV2RequestHandler(),
  {
    context: async () => {
      return { db };
    },
  }
);
