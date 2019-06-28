import { EntityRepository, Repository } from 'typeorm';

import { Client } from './Client.entity';

@EntityRepository(Client)
export class ClientRepository extends Repository<Client> {}
