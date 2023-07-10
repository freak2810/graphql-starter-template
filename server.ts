import { startStandaloneServer } from '@apollo/server/standalone';
import chalk from 'chalk';

import { env } from './src/utils/config/env';
import { server } from './src/utils/config/server-config';
import { getUserFromHeader } from './src/utils/config/user';
import { db } from './src/utils/functions/db';
import { Context } from './src/utils/types/context';

const start = async () => {
  const { url } = await startStandaloneServer<Context>(server, {
    context: async (context) => {
      const user = getUserFromHeader(context.req.headers['x-user']);

      return { db, user } satisfies Context;
    },
    listen: { port: +env.PORT },
  });

  console.log(chalk.hex('#f5587b')(`🚀 Server running at ${url}graphql`));
};

start();
