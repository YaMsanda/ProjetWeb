import { getCustomRepository } from 'typeorm';

import { Contreproposition } from './Contreproposition.entity';
import { ContrepropositionRepository } from './Contreproposition.repository';

export class ContrepropositionService {
  /**
   * SINGLETON PATTERN
   * @see https://en.wikipedia.org/wiki/Singleton_pattern
   */
  public static getInstance() {
    if (!this.instance) {
      this.instance = new ContrepropositionService();
    }
    return this.instance;
  }

  constructor() {
    this.propositionRepository = getCustomRepository(
      ContrepropositionRepository,
    );
  }
  private static instance: ContrepropositionService;

  private propositionRepository: ContrepropositionRepository;

  /**
   * Insert a contreproposition in Db
   *
   * @param contreproposition
   * @returns Resolves with Contreproposition inserted
   */
  public async create(contreproposition: any) {
    const propositionToInsert: Partial<Contreproposition> = {
      ...contreproposition,
    };
    return this.propositionRepository.save(propositionToInsert);
  }

  public async delete(propositionId: string) {
    return this.propositionRepository.delete(propositionId);
  }

  public async getContreproposition(propositionId: string) {
    return this.propositionRepository.findOne(propositionId);
  }

  /**
   * Retrieve all propositions from Db
   *
   * @returns Resolves with the list of all propositions in Db
   */
  public async getAll() {
    return this.propositionRepository.find();
  }

  public async update(body: Partial<Contreproposition>, propositionId: string) {
    const propositionToUpdate = await this.propositionRepository.findOne(
      propositionId,
    );
    if (!propositionToUpdate) {
      'Cet id n\'existe pas';
    }
    return this.propositionRepository.save({ ...propositionToUpdate, ...body });
  }
}
