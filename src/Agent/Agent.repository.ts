import { EntityRepository, Repository } from 'typeorm';

import { Agent } from './Agent.entity';

@EntityRepository(Agent)
export class AgentRepository extends Repository<Agent> {}
