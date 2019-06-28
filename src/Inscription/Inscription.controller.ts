import { Request, Response, Router } from 'express';

import { IRouteInterface } from './../tools/route.interface';
import { InscriptionService } from './Inscription.service';

export class InscriptionController {
  constructor() {
    this.router = Router();
    this.inscriptionService = InscriptionService.getInstance;
  }

  private inscriptionService: () => InscriptionService;
  private router: Router;

  /**
   * Define and return the router of InscriptionController.
   *
   * @returns Resolves with the router and its routes
   */
  async getRoutes() {
    const routes: IRouteInterface[] = [
      { path: '/', method: 'post', actions: [this.create] },
    ];

    routes.forEach(item => {
      const { path, method, actions } = item;
      this.router[method](path, ...actions.map(action => action.bind(this)));
    });

    return this.router;
  }

  /**
   * Insert new User in Db
   *
   * @param req
   * @param res
   * @returns with the created Inscription
   */
  private async create(req: Request, res: Response) {
    const clients = await this.inscriptionService().getAll(
      req.body.mail_client,
    );
    if (clients.length === 0) {
      await this.inscriptionService().createClient(req.body);
      await this.inscriptionService().createLocalisation(req.body);
      return res.json();
    } else {
      return res.status(500).json({ message: 'This mail already exist.' });
    }
  }
}
