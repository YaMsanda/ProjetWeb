import { EntityRepository, Repository } from 'typeorm';

import { Agence } from './Agence.entity';

@EntityRepository(Agence)
export class AgenceRepository extends Repository<Agence> {}
