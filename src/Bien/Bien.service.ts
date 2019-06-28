import { getCustomRepository } from 'typeorm';

import { Bien } from './Bien.entity';
import { BienRepository } from './Bien.repository';

export class BienService {
  /**
   * SINGLETON PATTERN
   * @see https://en.wikipedia.org/wiki/Singleton_pattern
   */
  public static getInstance() {
    if (!this.instance) {
      this.instance = new BienService();
    }
    return this.instance;
  }

  constructor() {
    this.bienRepository = getCustomRepository(BienRepository);
  }
  private static instance: BienService;

  private bienRepository: BienRepository;

  /**
   * Insert a Bien in Db
   *
   * @param bien
   * @returns Resolves with Bien inserted
   */
  public async create(bien: any) {
    const bienToInsert: Partial<Bien> = {
      ...bien,
    };
    return this.bienRepository.save(bienToInsert);
  }

  public async delete(bienId: string) {
    return this.bienRepository.delete(bienId);
  }

  public async getAgence(bienId: string) {
    return this.bienRepository.findOne(bienId);
  }

  /**
   * Retrieve all bien from Db
   *
   * @returns Resolves with the list of all bien in Db
   */
  public async getAll() {
    return this.bienRepository.find();
  }

  public async getBien(BienId: string) {
    return this.bienRepository.findOne(BienId);
  }

  public async update(body: Partial<Bien>, bienId: string) {
    const bienToUpdate = await this.bienRepository.findOne(bienId);
    if (!bienToUpdate) {
      'Cet id n\'existe pas';
    }
    return this.bienRepository.save({
      ...bienToUpdate,
      ...body,
    });
  }
}
