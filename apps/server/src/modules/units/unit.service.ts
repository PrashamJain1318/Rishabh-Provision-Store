import { unitRepository } from "./unit.repository";
import { IUnit } from "./unit.types";

export class UnitService {
  async getAllUnits(): Promise<IUnit[]> {
    return await unitRepository.findAll();
  }

  async getUnitById(id: string): Promise<IUnit | null> {
    return await unitRepository.findById(id);
  }

  async createUnit(data: Partial<IUnit>): Promise<IUnit> {
    return await unitRepository.create(data);
  }

  async updateUnit(id: string, updates: Partial<IUnit>): Promise<IUnit | null> {
    return await unitRepository.update(id, updates);
  }

  async deleteUnit(id: string): Promise<boolean> {
    return await unitRepository.delete(id);
  }
}

export const unitService = new UnitService();
