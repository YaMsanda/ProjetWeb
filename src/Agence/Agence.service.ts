import { getCustomRepository } from 'typeorm';

import { Agence } from './Agence.entity';
import { AgenceRepository } from './Agence.repository';

export class AgenceService {
  /**
   * SINGLETON PATTERN
   * @see https://en.wikipedia.org/wiki/Singleton_pattern
   */
  public static getInstance() {
    if (!this.instance) {
      this.instance = new AgenceService();
    }
    return this.instance;
  }

  constructor() {
    this.agenceRepository = getCustomRepository(AgenceRepository);
  }
  private static instance: AgenceService;

  private agenceRepository: AgenceRepository;

  /**
   * Insert a agence in Db
   *
   * @param agence
   * @returns Resolves with Agence inserted
   */
  public async create(agence: any) {
    const agenceToInsert: Partial<Agence> = {
      ...agence,
    };
    return this.agenceRepository.save(agenceToInsert);
  }

  public async delete(agenceId: string) {
    return this.agenceRepository.delete(agenceId);
  }

  public async getAgence(id: string) {
    const agence = await this.agenceRepository.findOneOrFail(id);
    return agence;
  }

  public async getAgenceId(id: string) {
    const agence = await this.agenceRepository.findOneOrFail(id);
    return agence.id;
  }

  /**
   * Retrieve all agences from Db
   *
   * @returns Resolves with the list of all agences in Db
   */
  public async getAll() {
    return this.agenceRepository.find();
  }

  public async update(body: Partial<Agence>, agenceId: string) {
    const agenceToUpdate = await this.agenceRepository.findOne(agenceId);
    if (!agenceToUpdate) {
      'Cet id n\'existe pas';
    }
    return this.agenceRepository.save({ ...agenceToUpdate, ...body });
  }
}
