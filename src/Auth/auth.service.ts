import bcrypt from 'bcrypt';

import { getCustomRepository } from 'typeorm';
import { Client } from '../Client/Client.entity';
import { ClientRepository } from '../Client/Client.repository';
import { ClientService } from '../Client/Client.service';
import { Localisation } from '../Localisation/Localisation.entity';
import { LocalisationRepository } from '../Localisation/Localisation.repository';

export class AuthService {
  /**
   * SINGLETON PATTERN
   * @see https://en.wikipedia.org/wiki/Singleton_pattern
   */
  public static getInstance() {
    if (!this.instance) {
      this.instance = new AuthService();
    }
    return this.instance;
  }

  constructor() {
    this.clientService = ClientService.getInstance();
    this.clientRepository = getCustomRepository(ClientRepository);
    this.localisationRepository = getCustomRepository(LocalisationRepository);
  }
  private static instance: AuthService;

  private clientRepository: ClientRepository;
  private localisationRepository: LocalisationRepository;
  private clientService: ClientService;

  /**
   * Sign in a client
   *
   * @param client
   * @returns Resolves with Client inserted
   */
  public async signIn(mail_client: string, pass_client: string) {
    const client = await this.clientService.findOneByEmail(mail_client);

    const isMatched = await bcrypt.compare(
      pass_client,
      (client && client.pass_client) || '',
    );
    if (!client || !isMatched) {
      return undefined;
    }

    return client;
  }

  /**
   * Sign up a client
   *
   * @param client
   * @returns Resolves with Client inserted
   */
  public async signUp(
    mail_client: string,
    pass_client: string,
    nom_client: string,
    prenom_client: string,
    datenaiss_client: string,
    tel_client: string,
    note_client: string,
  ) {
    return this.clientService.create({
      mail_client,
      pass_client: await bcrypt.hash(pass_client, 10),
      nom_client,
      prenom_client,
      datenaiss_client,
      tel_client,
      note_client,
    });
  }

  /**
   * Insert a Client in Db
   *
   * @param Client
   * @returns Resolves with Client inserted
   */
  // tslint:disable-next-line:no-shadowed-variable
  public async createClient(Client: any) {
    const ClientToInsert: Partial<Client> = {
      ...Client,
    };
    return this.clientRepository.save(ClientToInsert);
  }

  /**
   * Retrieve all client from Db
   *
   * @returns Resolves with the list of all clients in Db
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

  /**
   * Return true if mail_client from JWT payload return a valid mail_client of client, else false
   *
   * @param payload
   */
  public async validateClient(payload: { mail_client: string }) {
    return (
      (await this.clientService.findOneByEmail(payload.mail_client)) || false
    );
  }
}
