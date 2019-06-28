import { EntityRepository, Repository } from 'typeorm';

import { Contreproposition } from './Contreproposition.entity';

@EntityRepository(Contreproposition)
export class ContrepropositionRepository extends Repository<
  Contreproposition
> {}
