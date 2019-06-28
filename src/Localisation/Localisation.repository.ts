import { EntityRepository, Repository } from 'typeorm';

import { Localisation } from './Localisation.entity';

@EntityRepository(Localisation)
export class LocalisationRepository extends Repository<Localisation> {}
