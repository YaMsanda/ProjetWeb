import { Request, Response, Router } from 'express';

import { IRouteInterface } from './../tools/route.interface';
import { AgenceService } from './Agence.service';

export class AgenceController {
  constructor() {
    this.router = Router();
    this.agenceService = AgenceService.getInstance;
  }

  private agenceService: () => AgenceService;
  private router: Router;

  /**
   * Define and return the router of AgenceController.
   *
   * @returns Resolves with the router and its routes
   */
  async getRoutes() {
    const routes: IRouteInterface[] = [
      { path: '/', method: 'post', actions: [this.create] },
      { path: '/update/:agenceId', method: 'put', actions: [this.update] },
      { path: '/:agenceId', method: 'get', actions: [this.getAgence] },
      {
        path: '/id/:agenceId',
        method: 'get',
        actions: [this.getAgenceId],
      },
      { path: '/', method: 'get', actions: [this.getAll] },
      { path: '/delete/:agenceId', method: 'delete', actions: [this.delete] },
    ];

    routes.forEach(item => {
      const { path, method, actions } = item;
      this.router[method](path, ...actions.map(action => action.bind(this)));
    });

    return this.router;
  }

  /**
   * Insert new Agence in Db
   *
   * @param req
   * @param res
   * @returns with the created Agence
   */
  private async create(req: Request, res: Response) {
    res.json({ inserted: await this.agenceService().create(req.body) });
  }

  private async delete(req: Request, res: Response) {
    res.json({ results: await this.agenceService().delete(req.params) });
  }

  private async getAgence(req: Request, res: Response) {
    res.json({ results: await this.agenceService().getAgence(req.params) });
  }

  private async getAgenceId(req: Request, res: Response) {
    res.json({
      results: await this.agenceService().getAgenceId(req.params),
    });
  }

  /**
   * Return a list of all agences from Db
   *
   * @param req
   * @param res
   * @returns Resolves with the list of all Agences
   */
  private async getAll(req: Request, res: Response) {
    res.json({ results: await this.agenceService().getAll() });
  }

  private async update(req: Request, res: Response) {
    res.json({
      results: await this.agenceService().update(req.body, req.params.agenceId),
    });
  }
}
