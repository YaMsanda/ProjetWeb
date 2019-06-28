import { getCustomRepository } from 'typeorm';

import { Agent } from './Agent.entity';
import { AgentRepository } from './Agent.repository';

export class AgentService {
  /**
   * SINGLETON PATTERN
   * @see https://en.wikipedia.org/wiki/Singleton_pattern
   */
  public static getInstance() {
    if (!this.instance) {
      this.instance = new AgentService();
    }
    return this.instance;
  }

  constructor() {
    this.agentRepository = getCustomRepository(AgentRepository);
  }
  private static instance: AgentService;

  private agentRepository: AgentRepository;

  /**
   * Insert a Agent in Db
   *
   * @param agent
   * @returns Resolves with Agent inserted
   */
  public async create(agence: any) {
    const agentToInsert: Partial<Agent> = {
      ...agence,
    };
    return this.agentRepository.save(agentToInsert);
  }

  public async delete(agentId: string) {
    return this.agentRepository.delete(agentId);
  }

  public async getAgent(agentId: string) {
    return this.agentRepository.findOne(agentId);
  }

  /**
   * Retrieve all agent from Db
   *
   * @returns Resolves with the list of all agent in Db
   */
  public async getAll() {
    return this.agentRepository.find();
  }

  public async update(body: Partial<Agent>, agentId: string) {
    const agentToUpdate = await this.agentRepository.findOne(agentId);
    if (!agentToUpdate) {
      'Cet id n\'existe pas';
    }
    return this.agentRepository.save({ ...agentToUpdate, ...body });
  }
}
