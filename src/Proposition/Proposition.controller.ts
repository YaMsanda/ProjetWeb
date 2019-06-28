import { Request, Response, Router } from 'express';

import { IRouteInterface } from '../tools/route.interface';
import { PropositionService } from './Proposition.service';

export class PropositionController {
  constructor() {
    this.router = Router();
    this.PropositionService = PropositionService.getInstance;
  }

  private PropositionService: () => PropositionService;
  private router: Router;

  /**
   * Define and return the router of PropositionController.
   *
   * @returns Resolves with the router and its routes
   */
  async getRoutes() {
    const routes: IRouteInterface[] = [
      { path: '/', method: 'post', actions: [this.create] },
      { path: '/update/:PropositionId', method: 'put', actions: [this.update] },
      {
        path: '/:PropositionId',
        method: 'get',
        actions: [this.getProposition],
      },
      {
        path: '/id/:PropositionId',
        method: 'get',
        actions: [this.getProposition],
      },
      { path: '/', method: 'get', actions: [this.getAll] },
      {
        path: '/delete/:PropositionId',
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
   * Insert new Proposition in Db
   *
   * @param req
   * @param res
   * @returns with the created Proposition
   */
  private async create(req: Request, res: Response) {
    res.json({ inserted: await this.PropositionService().create(req.body) });
  }

  private async delete(req: Request, res: Response) {
    res.json({ results: await this.PropositionService().delete(req.params) });
  }

  private async getProposition(req: Request, res: Response) {
    res.json({
      results: await this.PropositionService().getProposition(req.params),
    });
  }

  /**
   * Return a list of all Propositions from Db
   *
   * @param req
   * @param res
   * @returns Resolves with the list of all Propositions
   */
  private async getAll(req: Request, res: Response) {
    res.json({ results: await this.PropositionService().getAll() });
  }

  private async update(req: Request, res: Response) {
    res.json({
      results: await this.PropositionService().update(
        req.body,
        req.params.PropositionId,
      ),
    });
  }
}
