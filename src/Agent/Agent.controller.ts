import { Request, Response, Router } from 'express';

import { IRouteInterface } from '../tools/route.interface';
import { AgentService } from './Agent.service';

export class AgentController {
  constructor() {
    this.router = Router();
    this.AgentService = AgentService.getInstance;
  }

  private AgentService: () => AgentService;
  private router: Router;

  /**
   * Define and return the router of AgentController.
   *
   * @returns Resolves with the router and its roulltes
   */
  async getRoutes() {
    const routes: IRouteInterface[] = [
      { path: '/', method: 'post', actions: [this.create] },
      { path: '/update/:id', method: 'put', actions: [this.update] },
      {
        path: '/:AgentId',
        method: 'get',
        actions: [this.getAgent],
      },
      { path: '/', method: 'get', actions: [this.getAll] },
      {
        path: '/delete/:AgentId',
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
   * Insert new Agent in Db
   *
   * @param req
   * @param res
   * @returns with the created Agent
   */
  private async create(req: Request, res: Response) {
    res.json({ inserted: await this.AgentService().create(req.body) });
  }

  private async delete(req: Request, res: Response) {
    res.json({ results: await this.AgentService().delete(req.params) });
  }
  /**
   * Return a list of all Agents from Db
   *
   * @param req
   * @param res
   * @returns Resolves with the list of all Agents
   */
  private async getAll(req: Request, res: Response) {
    res.json({ results: await this.AgentService().getAll() });
  }

  private async getAgent(req: Request, res: Response) {
    res.json({
      results: await this.AgentService().getAgent(req.params),
    });
  }

  private async update(req: Request, res: Response) {
    res.json({
      results: await this.AgentService().update(req.body, req.params.AgentId),
    });
  }
}
