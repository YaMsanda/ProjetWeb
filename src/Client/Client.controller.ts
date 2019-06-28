import { Request, Response, Router } from 'express';

import { IRouteInterface } from '../tools/route.interface';
import { ClientService } from './Client.service';

export class ClientController {
  constructor() {
    this.router = Router();
    this.ClientService = ClientService.getInstance;
  }
  private router: Router;

  private ClientService: () => ClientService;

  /**
   * Define and return the router of ClientController.
   *
   * @returns Resolves with the router and its routes
   */
  async getRoutes() {
    const routes: IRouteInterface[] = [
      { path: '/', method: 'post', actions: [this.create] },
      { path: '/update/:ClientId', method: 'put', actions: [this.update] },
      { path: '/:ClientId', method: 'get', actions: [this.getClient] },
      { path: '/', method: 'get', actions: [this.getAll] },
      { path: '/delete/:ClientId', method: 'delete', actions: [this.delete] },
    ];

    routes.forEach(item => {
      const { path, method, actions } = item;
      this.router[method](path, ...actions.map(action => action.bind(this)));
    });

    return this.router;
  }

  /**
   * Insert new Client in Db
   *
   * @param req
   * @param res
   * @returns with the created Client
   */
  private async create(req: Request, res: Response) {
    res.json({ inserted: await this.ClientService().create(req.body) });
  }

  private async delete(req: Request, res: Response) {
    res.json({ results: await this.ClientService().delete(req.params) });
  }

  /**
   * Return a list of all Clients from Db
   *
   * @param req
   * @param res
   * @returns Resolves with the list of all Clients
   */
  private async getAll(req: Request, res: Response) {
    res.json({ results: await this.ClientService().getAll() });
  }

  private async getClient(req: Request, res: Response) {
    res.json({ results: await this.ClientService().getClient(req.params) });
  }

  private async update(req: Request, res: Response) {
    res.json({
      results: await this.ClientService().update(req.body, req.params.ClientId),
    });
  }
}
