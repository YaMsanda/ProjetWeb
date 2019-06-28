import { EntityRepository, Repository } from 'typeorm';

import { Bien } from './Bien.entity';

@EntityRepository(Bien)
export class BienRepository extends Repository<Bien> {}
