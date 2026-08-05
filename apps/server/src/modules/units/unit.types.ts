export interface IUnit {
  id?: string;
  name: string;
  shortName: string;
  symbol: string;
  status: "Active" | "Inactive";
  createdAt?: Date;
  updatedAt?: Date;
}
