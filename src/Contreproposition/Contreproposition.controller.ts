import { Request, Response, Router } from 'express';

import { IRouteInterface } from '../tools/route.interface';
import { ContrepropositionService } from './Contreproposition.service';

export class ContrepropositionController {
  constructor() {
    this.router = Router();
    this.ContrepropositionService = ContrepropositionService.getInstance;
  }

  private ContrepropositionService: () => ContrepropositionService;
  private router: Router;

  /**
   * Define and return the router of ContrepropositionController.
   *
   * @returns Resolves with the router and its routes
   */
  async getRoutes() {
    const routes: IRouteInterface[] = [
      { path: '/', method: 'post', actions: [this.create] },
      {
        path: '/update/:ContrepropositionId',
        method: 'put',
        actions: [this.update],
      },
      {
        path: '/:ContrepropositionId',
        method: 'get',
        actions: [this.getContreproposition],
      },
      {
        path: '/id/:ContrepropositionId',
        method: 'get',
        actions: [this.getContreproposition],
      },
      { path: '/', method: 'get', actions: [this.getAll] },
      {
        path: '/delete/:ContrepropositionId',
        method: 'delete',
        actions: [this.delete],
      },
    ];

    routes.forEach(item => {
      const { path, method, actions } = item;
      this.router[method](path, ...actions.map(action => action.bind(this)));
    });

    return this.router;
  }

  /**
   * Insert new Contreproposition in Db
   *
   * @param req
   * @param res
   * @returns with the created Contreproposition
   */
  private async create(req: Request, res: Response) {
    res.json({
      inserted: await this.ContrepropositionService().create(req.body),
    });
  }

  private async delete(req: Request, res: Response) {
    res.json({
      results: await this.ContrepropositionService().delete(req.params),
    });
  }

  private async getContreproposition(req: Request, res: Response) {
    res.json({
      results: await this.ContrepropositionService().getContreproposition(
        req.params,
      ),
    });
  }

  /**
   * Return a list of all Contrepropositions from Db
   *
   * @param req
   * @param res
   * @returns Resolves with the list of all Contrepropositions
   */
  private async getAll(req: Request, res: Response) {
    res.json({ results: await this.ContrepropositionService().getAll() });
  }

  private async update(req: Request, res: Response) {
    res.json({
      results: await this.ContrepropositionService().update(
        req.body,
        req.params.ContrepropositionId,
      ),
    });
  }
}
