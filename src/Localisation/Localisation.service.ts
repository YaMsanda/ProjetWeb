import { getCustomRepository } from 'typeorm';

import { Localisation } from './Localisation.entity';
import { LocalisationRepository } from './Localisation.repository';

export class LocalisationService {
  /**
   * SINGLETON PATTERN
   * @see https://en.wikipedia.org/wiki/Singleton_pattern
   */
  public static getInstance() {
    if (!this.instance) {
      this.instance = new LocalisationService();
    }
    return this.instance;
  }

  constructor() {
    this.localisationRepository = getCustomRepository(LocalisationRepository);
  }
  private static instance: LocalisationService;

  private localisationRepository: LocalisationRepository;

  /**
   * Insert a localisation in Db
   *
   * @param localisation
   * @returns Resolves with Localisation inserted
   */
  public async create(localisation: any) {
    const localisationToInsert: Partial<Localisation> = {
      ...localisation,
    };
    return this.localisationRepository.save(localisationToInsert);
  }

  public async delete(localisationId: string) {
    return this.localisationRepository.delete(localisationId);
  }

  public async getLocalisation(id: string) {
    const localisation = await this.localisationRepository.findOneOrFail(id);
    return localisation;
  }

  public async getLocalisationId(id: string) {
    const localisation = await this.localisationRepository.findOneOrFail(id);
    return localisation.id;
  }

  public async getLocalisationAdresse(id: string) {
    const localisation = await this.localisationRepository.findOneOrFail(id);
    return localisation.adresse;
  }

  /**
   * Retrieve all localisations from Db
   *
   * @returns Resolves with the list of all localisations in Db
   */
  public async getAll() {
    return this.localisationRepository.find();
  }

  public async update(body: Partial<Localisation>, localisationId: string) {
    const localisationToUpdate = await this.localisationRepository.findOne(
      localisationId,
    );
    if (!localisationToUpdate) {
      'Cet id n\'existe pas';
    }
    return this.localisationRepository.save({
      ...localisationToUpdate,
      ...body,
    });
  }
}
