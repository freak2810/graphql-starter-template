import { startStandaloneServer } from '@apollo/server/standalone';
import chalk from 'chalk';

import { server } from './src/utils/config/server-config';
import { db } from './src/utils/functions/db';
import { Context } from './src/utils/types/context';

const start = async () => {
  const { url } = await startStandaloneServer<Context>(server, {
    context: async (context) => {
      return { ...context, db };
    },
    listen: { port: 4000 },
  });

  console.log(chalk.hex('#f5587b')(`🚀 Server running at ${url}graphql`));
};

start();
