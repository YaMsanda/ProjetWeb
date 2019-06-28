import bodyParser from 'body-parser';
import chalk from 'chalk';
import express from 'express';
import passport from 'passport';

import { AgenceController } from './Agence/Agence.controller';
import { AgentController } from './Agent/Agent.controller';
import { AuthController } from './Auth/auth.controller';
import './Auth/auth.strategy';
import { BienController } from './Bien/Bien.controller';
import { ClientController } from './Client/Client.controller';
import { ContrepropositionController } from './Contreproposition/Contreproposition.controller';
import { DependancesController } from './Dependances/Dependances.controller';
import { InscriptionController } from './inscription/inscription.controller';
import { LocalisationController } from './Localisation/Localisation.controller';
import logger from './logger.tools';
import { PropositionController } from './Proposition/Proposition.controller';
import { setupDb } from './setup-db';

async function bootstrap() {
  // create db connection
  await setupDb();

  // initialize express app
  const app = express();

  // set the body parser
  app.use(
    bodyParser.urlencoded({
      extended: true,
    }),
  );
  app.use(bodyParser.json());

  // call custom middleware for logging globally
  app.use(logger);

  // exemple of a GET route on '/' pattern
  app.get('/', (req: express.Request, res: express.Response) => {
    return res.json({ message: 'Hello world !' });
  });

  // use custom controllers patterns
  const inscriptionRoutes = await new InscriptionController().getRoutes();
  app.use('/inscription', inscriptionRoutes);

  const agentRoutes = await new AgentController().getRoutes();
  app.use('/agent', agentRoutes);

  const bienRoutes = await new BienController().getRoutes();
  app.use('/bien', bienRoutes);

  const dependancesRoutes = await new DependancesController().getRoutes();
  app.use('/dependances', dependancesRoutes);

  const propositionRoutes = await new PropositionController().getRoutes();
  app.use('/proposition', propositionRoutes);

  const contrepropositionRoutes = await new ContrepropositionController().getRoutes();
  app.use('/contreproposition', contrepropositionRoutes);

  const agenceRoutes = await new AgenceController().getRoutes();
  app.use('/agence', agenceRoutes);

  const clientRoutes = await new ClientController().getRoutes();
  app.use(
    '/client',
    passport.authenticate('jwt', { session: false }),
    clientRoutes,
  );

  const authRoutes = await new AuthController().getRoutes();
  app.use('/auth', authRoutes);

  const localisationRoutes = await new LocalisationController().getRoutes();
  app.use('/localisation', localisationRoutes);

  // define application port
  app.listen(3015);

  global.console.log(chalk.green('----- Server up! -----\n'));
}

// start application
bootstrap();
