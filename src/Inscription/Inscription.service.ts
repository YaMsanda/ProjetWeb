import { getCustomRepository } from 'typeorm';
import { Client } from '../Client/Client.entity';
import { ClientRepository } from '../Client/Client.repository';
import { Localisation } from '../Localisation/Localisation.entity';
import { LocalisationRepository } from '../Localisation/Localisation.repository';

export class InscriptionService {
  /**
   * SINGLETON PATTERN
   * @see https://en.wikipedia.org/wiki/Singleton_pattern
   */
  public static getInstance() {
    if (!this.instance) {
      this.instance = new InscriptionService();
    }
    return this.instance;
  }

  constructor() {
    this.clientRepository = getCustomRepository(ClientRepository);
    this.localisationRepository = getCustomRepository(LocalisationRepository);
  }

  private static instance: InscriptionService;

  private clientRepository: ClientRepository;
  private localisationRepository: LocalisationRepository;

  /**
   * Insert a Client in Db
   *
   * @param client
   * @returns Resolves with Client inserted
   */
  public async createClient(client: any) {
    const clientToInsert: Partial<Client> = {
      ...client,
    };
    return this.clientRepository.save(clientToInsert);
  }

  /**
   * Retrieve all client from Db
   *
   * @returns Resolves with the list of all client in Db
   */
  public async getAll(mail_client: string) {
    return this.clientRepository.find({ mail_client });
  }

  /**
   * Insert a localisation in Db
   *
   * @param localisation
   * @returns Resolves with Localisation inserted
   */
  public async createLocalisation(localisation: any) {
    const localisationToInsert: Partial<Localisation> = {
      ...localisation,
    };
    return this.localisationRepository.save(localisationToInsert);
  }
}
