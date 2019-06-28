import { EntityRepository, Repository } from 'typeorm';

import { Proposition } from './Proposition.entity';

@EntityRepository(Proposition)
export class PropositionRepository extends Repository<Proposition> {}
