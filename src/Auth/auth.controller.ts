import { Request, Response, Router } from 'express';
import jwt from 'jsonwebtoken';

import { IRouteInterface } from '../tools/route.interface';
import { AuthService } from './auth.service';

export class AuthController {
  constructor() {
    this.router = Router();
    this.authService = AuthService.getInstance;
  }

  private authService: () => AuthService;
  private router: Router;

  /**
   * Define and return the router of AuthController.
   *
   * @returns Resolves with the router and its routes
   */
  async getRoutes() {
    const routes: IRouteInterface[] = [
      { path: '/signin', method: 'post', actions: [this.signIn] },
      { path: '/signup', method: 'post', actions: [this.signUp] },
    ];

    routes.forEach(item => {
      const { path, method, actions } = item;
      this.router[method](path, ...actions.map(action => action.bind(this)));
    });

    return this.router;
  }

  /**
   * Sign in a client
   *
   * @param req
   * @param res
   * @returns with the created Auth
   */
  private async signIn(req: Request, res: Response) {
    const client = await this.authService().signIn(
      req.body.mail_client,
      req.body.pass_client,
    );

    if (!client) {
      res.status(401).json({ status: 'Unauthorized' });
    }

    const token = jwt.sign({ mail_client: client!.mail_client }, 'secret', {
      expiresIn: 86400,
    });

    res.json({
      token,
      client,
    });
  }

  /**
   * Return a list of all auths from Db
   *
   * @param req
   * @param res
   * @returns Resolves with the list of all Auths
   */
  private async signUp(req: Request, res: Response) {
    const clients = await this.authService().getAll(req.body.mail_client);
    if (clients.length === 0) {
      const client = await this.authService().signUp(
        req.body.mail_client,
        req.body.pass_client,
        req.body.nom_client,
        req.body.prenom_client,
        req.body.datenaiss_client,
        req.body.tel_client,
        req.body.note_client,
      );
      global.console.log('Test');
      const token = jwt.sign({ mail_client: client.mail_client }, 'secret', {
        expiresIn: 86400,
      });
      res.json({
        token,
        clients,
      });
      await this.authService().createClient(req.body);
      await this.authService().createLocalisation(req.body);
      return res.json();
    } else {
      return res.status(500).json({ message: 'This mail already exist.' });
    }
  }
}
