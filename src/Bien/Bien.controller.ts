import { Request, Response, Router } from 'express';

import { IRouteInterface } from '../tools/route.interface';
import { BienService } from './Bien.service';

export class BienController {
  constructor() {
    this.router = Router();
    this.BienService = BienService.getInstance;
  }
  private router: Router;

  private BienService: () => BienService;

  /**
   * Define and return the router of BienController.
   *
   * @returns Resolves with the router and its routes
   */
  async getRoutes() {
    const routes: IRouteInterface[] = [
      { path: '/', method: 'post', actions: [this.create] },
      { path: '/update/:BienId', method: 'put', actions: [this.update] },
      { path: '/:BienId', method: 'get', actions: [this.getBien] },
      { path: '/', method: 'get', actions: [this.getAll] },
      { path: '/delete/:BienId', method: 'delete', actions: [this.delete] },
    ];

    routes.forEach(item => {
      const { path, method, actions } = item;
      this.router[method](path, ...actions.map(action => action.bind(this)));
    });

    return this.router;
  }

  /**
   * Insert new Bien in Db
   *
   * @param req
   * @param res
   * @returns with the created Bien
   */
  private async create(req: Request, res: Response) {
    res.json({ inserted: await this.BienService().create(req.body) });
  }

  private async delete(req: Request, res: Response) {
    res.json({ results: await this.BienService().delete(req.params) });
  }

  /**
   * Return a list of all Biens from Db
   *
   * @param req
   * @param res
   * @returns Resolves with the list of all Biens
   */
  private async getAll(req: Request, res: Response) {
    res.json({ results: await this.BienService().getAll() });
  }

  private async getBien(req: Request, res: Response) {
    res.json({ results: await this.BienService().getBien(req.params) });
  }

  private async update(req: Request, res: Response) {
    res.json({
      results: await this.BienService().update(req.body, req.params.BienId),
    });
  }
}
