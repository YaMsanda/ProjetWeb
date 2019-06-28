import { getCustomRepository } from 'typeorm';

import { Dependances } from '../Dependances/Dependances.entity';
import { DependancesRepository } from '../Dependances/Dependances.repository';

export class DependancesService {
  getdependances(params: any): any {
    throw new Error('Method not implemented.');
  }
  /**
   * SINGLETON PATTERN
   * @see https://en.wikipedia.org/wiki/Singleton_pattern
   */
  public static getInstance() {
    if (!this.instance) {
      this.instance = new DependancesService();
    }
    return this.instance;
  }

  constructor() {
    this.dependancesRepository = getCustomRepository(DependancesRepository);
  }
  private static instance: DependancesService;

  private dependancesRepository: DependancesRepository;

  /**
   * Insert a Dependances in Db
   *
   * @param dependances
   * @returns Resolves with Dependances inserted
   */
  public async create(agence: any) {
    const dependancesToInsert: Partial<Dependances> = {
      ...agence,
    };
    return this.dependancesRepository.save(dependancesToInsert);
  }

  public async delete(dependancesId: string) {
    return this.dependancesRepository.delete(dependancesId);
  }

  public async getAgence(dependancesId: string) {
    return this.dependancesRepository.findOne(dependancesId);
  }

  /**
   * Retrieve all dependances from Db
   *
   * @returns Resolves with the list of all dependances in Db
   */
  public async getAll() {
    return this.dependancesRepository.find();
  }

  public async update(body: Partial<Dependances>, dependancesId: string) {
    const dependancesToUpdate = await this.dependancesRepository.findOne(
      dependancesId,
    );
    if (!dependancesToUpdate) {
      'Cet id n\'existe pas';
    }
    return this.dependancesRepository.save({ ...dependancesToUpdate, ...body });
  }
}
