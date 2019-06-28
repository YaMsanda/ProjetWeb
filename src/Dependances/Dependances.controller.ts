import { Request, Response, Router } from 'express';

import { DependancesService } from '../Dependances/Dependances.service';
import { IRouteInterface } from './../tools/route.interface';

export class DependancesController {
  constructor() {
    this.router = Router();
    this.DependancesService = DependancesService.getInstance;
  }

  private DependancesService: () => DependancesService;
  private router: Router;

  /**
   * Define and return the router of DependancesController.
   *
   * @returns Resolves with the router and its roulltes
   */
  async getRoutes() {
    const routes: IRouteInterface[] = [
      { path: '/', method: 'post', actions: [this.create] },
      { path: '/update/:id', method: 'put', actions: [this.update] },
      {
        path: '/:DependancesId',
        method: 'get',
        actions: [this.getDependances],
      },
      { path: '/', method: 'get', actions: [this.getAll] },
      {
        path: '/delete/:DependancesId',
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
   * Insert new Dependances in Db
   *
   * @param req
   * @param res
   * @returns with the created Dependances
   */
  private async create(req: Request, res: Response) {
    res.json({ inserted: await this.DependancesService().create(req.body) });
  }

  private async delete(req: Request, res: Response) {
    res.json({ results: await this.DependancesService().delete(req.params) });
  }
  /**
   * Return a list of all Dependancess from Db
   *
   * @param req
   * @param res
   * @returns Resolves with the list of all Dependancess
   */
  private async getAll(req: Request, res: Response) {
    res.json({ results: await this.DependancesService().getAll() });
  }

  private async getDependances(req: Request, res: Response) {
    res.json({
      results: await this.DependancesService().getdependances(req.params),
    });
  }

  private async update(req: Request, res: Response) {
    res.json({
      results: await this.DependancesService().update(
        req.body,
        req.params.DependancesId,
      ),
    });
  }
}
