import { getCustomRepository } from 'typeorm';

import { Proposition } from './Proposition.entity';
import { PropositionRepository } from './Proposition.repository';

export class PropositionService {
  /**
   * SINGLETON PATTERN
   * @see https://en.wikipedia.org/wiki/Singleton_pattern
   */
  public static getInstance() {
    if (!this.instance) {
      this.instance = new PropositionService();
    }
    return this.instance;
  }

  constructor() {
    this.propositionRepository = getCustomRepository(PropositionRepository);
  }
  private static instance: PropositionService;

  private propositionRepository: PropositionRepository;

  /**
   * Insert a proposition in Db
   *
   * @param proposition
   * @returns Resolves with Proposition inserted
   */
  public async create(proposition: any) {
    const propositionToInsert: Partial<Proposition> = {
      ...proposition,
    };
    return this.propositionRepository.save(propositionToInsert);
  }

  public async delete(propositionId: string) {
    return this.propositionRepository.delete(propositionId);
  }

  public async getProposition(propositionId: string) {
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

  public async update(body: Partial<Proposition>, propositionId: string) {
    const propositionToUpdate = await this.propositionRepository.findOne(
      propositionId,
    );
    if (!propositionToUpdate) {
      'Cet id n\'existe pas';
    }
    return this.propositionRepository.save({ ...propositionToUpdate, ...body });
  }
}
