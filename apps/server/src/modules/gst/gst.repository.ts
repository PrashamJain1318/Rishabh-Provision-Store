import { GSTSettingsModel, GSTTransactionModel, IGSTSettingsDoc } from "./gst.model";
import { IGSTSettings } from "./gst.types";

export class GSTRepository {
  async getSettings(): Promise<IGSTSettings> {
    let settings = await GSTSettingsModel.findOne();
    if (!settings) {
      settings = await GSTSettingsModel.create({
        gstin: "27AAACR1234A1Z5",
        pan: "AAACR1234A",
        businessName: "Rishabh Provision Store",
        address: "Shop No 4, Station Road, Dadar West, Mumbai",
        stateCode: "27",
        stateName: "Maharashtra",
        placeOfSupply: "27-Maharashtra",
        defaultGstRate: 18,
        taxInclusivePricing: false,
        invoicePrefix: "RPS/2026/",
      });
    }
    return settings.toObject();
  }

  async updateSettings(payload: Partial<IGSTSettings>): Promise<IGSTSettings> {
    const settings = await GSTSettingsModel.findOneAndUpdate({}, payload, { new: true, upsert: true });
    return settings.toObject();
  }

  async createTransaction(tx: any) {
    return GSTTransactionModel.create(tx);
  }

  async getTransactions(filter: any = {}) {
    return GSTTransactionModel.find(filter).sort({ createdAt: -1 }).lean();
  }
}

export const gstRepository = new GSTRepository();
