import { UnitModel, IUnitDocument } from "./unit.model";
import { IUnit } from "./unit.types";

const mockUnits: IUnit[] = [
  { id: "UNT-001", name: "Kilogram", shortName: "Kg", symbol: "kg", status: "Active" },
  { id: "UNT-002", name: "Gram", shortName: "g", symbol: "g", status: "Active" },
  { id: "UNT-003", name: "Liter", shortName: "L", symbol: "L", status: "Active" },
  { id: "UNT-004", name: "Milliliter", shortName: "ml", symbol: "ml", status: "Active" },
  { id: "UNT-005", name: "Packet", shortName: "Pkt", symbol: "pkt", status: "Active" },
  { id: "UNT-006", name: "Piece", shortName: "Pc", symbol: "pc", status: "Active" },
  { id: "UNT-007", name: "Box", shortName: "Box", symbol: "box", status: "Active" },
  { id: "UNT-008", name: "Bottle", shortName: "Btl", symbol: "btl", status: "Active" },
  { id: "UNT-009", name: "Dozen", shortName: "Dz", symbol: "dz", status: "Active" },
  { id: "UNT-010", name: "Carton", shortName: "Ctn", symbol: "ctn", status: "Active" },
  { id: "UNT-011", name: "Bundle", shortName: "Bdl", symbol: "bdl", status: "Active" },
];

export class UnitRepository {
  async findAll(): Promise<IUnit[]> {
    try {
      const dbUnits = await UnitModel.find();
      if (dbUnits.length > 0) return dbUnits;
    } catch {}
    return mockUnits;
  }

  async findById(id: string): Promise<IUnit | null> {
    try {
      const dbUnit = await UnitModel.findById(id);
      if (dbUnit) return dbUnit;
    } catch {}
    return mockUnits.find((u) => u.id === id || u.symbol === id) || null;
  }

  async create(data: Partial<IUnit>): Promise<IUnit> {
    try {
      const newUnit = new UnitModel(data);
      return await newUnit.save();
    } catch {
      const mockNew: IUnit = {
        id: `UNT-0${mockUnits.length + 1}`,
        name: data.name!,
        shortName: data.shortName!,
        symbol: data.symbol!,
        status: data.status || "Active",
      };
      mockUnits.push(mockNew);
      return mockNew;
    }
  }

  async update(id: string, updates: Partial<IUnit>): Promise<IUnit | null> {
    try {
      const dbUnit = await UnitModel.findByIdAndUpdate(id, updates, { new: true });
      if (dbUnit) return dbUnit;
    } catch {}
    const index = mockUnits.findIndex((u) => u.id === id);
    if (index !== -1) {
      mockUnits[index] = { ...mockUnits[index], ...updates };
      return mockUnits[index];
    }
    return null;
  }

  async delete(id: string): Promise<boolean> {
    try {
      await UnitModel.findByIdAndDelete(id);
    } catch {}
    const index = mockUnits.findIndex((u) => u.id === id);
    if (index !== -1) {
      mockUnits.splice(index, 1);
    }
    return true;
  }
}

export const unitRepository = new UnitRepository();
