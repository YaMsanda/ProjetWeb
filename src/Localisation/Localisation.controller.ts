import { Request, Response, Router } from 'express';

import { IRouteInterface } from './../tools/route.interface';
import { LocalisationService } from './Localisation.service';

export class LocalisationController {
  constructor() {
    this.router = Router();
    this.localisationService = LocalisationService.getInstance;
  }

  private localisationService: () => LocalisationService;
  private router: Router;

  /**
   * Define and return the router of LocalisationController.
   *
   * @returns Resolves with the router and its routes
   */
  async getRoutes() {
    const routes: IRouteInterface[] = [
      { path: '/', method: 'post', actions: [this.create] },
      {
        path: '/update/:localisationId',
        method: 'put',
        actions: [this.update],
      },
      {
        path: '/:localisationId',
        method: 'get',
        actions: [this.getLocalisation],
      },
      {
        path: '/id/:localisationId',
        method: 'get',
        actions: [this.getLocalisationId],
      },
      {
        path: '/ville/:localisationId',
        method: 'get',
        actions: [this.getLocalisationVille],
      },
      { path: '/', method: 'get', actions: [this.getAll] },
      {
        path: '/delete/:localisationId',
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
   * Insert new Localisation in Db
   *
   * @param req
   * @param res
   * @returns with the created Localisation
   */
  private async create(req: Request, res: Response) {
    res.json({ inserted: await this.localisationService().create(req.body) });
  }

  private async delete(req: Request, res: Response) {
    res.json({ results: await this.localisationService().delete(req.params) });
  }

  private async getLocalisation(req: Request, res: Response) {
    res.json({
      results: await this.localisationService().getLocalisation(req.params),
    });
  }

  private async getLocalisationId(req: Request, res: Response) {
    res.json({
      results: await this.localisationService().getLocalisationId(req.params),
    });
  }

  private async getLocalisationVille(req: Request, res: Response) {
    res.json({
      results: await this.localisationService().getLocalisationAdresse(
        req.params,
      ),
    });
  }

  /**
   * Return a list of all localisations from Db
   *
   * @param req
   * @param res
   * @returns Resolves with the list of all Localisations
   */
  private async getAll(req: Request, res: Response) {
    res.json({ results: await this.localisationService().getAll() });
  }

  private async update(req: Request, res: Response) {
    res.json({
      results: await this.localisationService().update(
        req.body,
        req.params.localisationId,
      ),
    });
  }
}
