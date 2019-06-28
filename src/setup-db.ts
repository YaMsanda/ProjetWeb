import chalk from 'chalk';
import 'reflect-metadata';
import { createConnection } from 'typeorm';

/**
 * Create connection to database with options set in `ormconfig.json` and log it.
 */
const setupDb = async () => {
  try {
    const connection = await createConnection();
    global.console.info(
      chalk.yellow(
        `Connection database is ready on ${(connection.options as any).host}:${
          (connection.options as any).port
        }.\n`,
      ),
    );
    return connection;
  } catch (e) {
    global.console.info(chalk.red(`Connection database is not ready: ${e}.`));
  }
};

export { setupDb };
