import { getCustomRepository } from 'typeorm';

import { Client } from './Client.entity';
import { ClientRepository } from './Client.repository';

export class ClientService {
  /**
   * SINGLETON PATTERN
   * @see https://en.wikipedia.org/wiki/Singleton_pattern
   */
  public static getInstance() {
    if (!this.instance) {
      this.instance = new ClientService();
    }
    return this.instance;
  }

  constructor() {
    this.ClientRepository = getCustomRepository(ClientRepository);
  }
  private static instance: ClientService;

  private ClientRepository: ClientRepository;

  /**
   * Insert a Client in Db
   *
   * @param Client
   * @returns Resolves with Client inserted
   */
  // tslint:disable-next-line:no-shadowed-variable
  public async create(Client: any) {
    const ClientToInsert: Partial<Client> = {
      ...Client,
    };
    return this.ClientRepository.save(ClientToInsert);
  }

  public async delete(ClientId: string) {
    return this.ClientRepository.delete(ClientId);
  }

  /**
   * Retrieve all Clients from Db
   *
   * @returns Resolves with the list of all Clients in Db
   */
  public async getAll() {
    return this.ClientRepository.find();
  }

  public async getClient(ClientId: string) {
    return this.ClientRepository.findOne(ClientId);
  }

  /**
   * Find one user by email
   */
  public async findOneByEmail(email: string) {
    return this.ClientRepository.findOne({ where: { email } });
  }

  public async update(body: Partial<Client>, ClientId: string) {
    const ClientToUpdate = await this.ClientRepository.findOne(ClientId);
    if (!ClientToUpdate) {
      'Cet id n\'existe pas';
    }
    return this.ClientRepository.save({ ...ClientToUpdate, ...body });
  }
}
