import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Search, Scale, CheckCircle, XCircle, Trash2, Edit3, X, Tag } from "lucide-react";
import { Button } from "@rishabh-store/ui";

interface UnitItem {
  id: string;
  name: string;
  shortName: string;
  symbol: string;
  status: "Active" | "Inactive";
}

const initialUnits: UnitItem[] = [
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

export const Units: React.FC = () => {
  const [units, setUnits] = useState<UnitItem[]>(initialUnits);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [unitName, setUnitName] = useState("");
  const [unitShortName, setUnitShortName] = useState("");
  const [unitSymbol, setUnitSymbol] = useState("");

  const filteredUnits = units.filter(
    (unit) =>
      unit.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      unit.shortName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      unit.symbol.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddUnit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!unitName.trim()) return;

    const newUnit: UnitItem = {
      id: `UNT-0${units.length + 1}`,
      name: unitName,
      shortName: unitShortName || unitName.slice(0, 2),
      symbol: unitSymbol || unitName.toLowerCase().slice(0, 2),
      status: "Active",
    };

    setUnits([...units, newUnit]);
    setUnitName("");
    setUnitShortName("");
    setUnitSymbol("");
    setIsModalOpen(false);
  };

  const handleDeleteUnit = (id: string) => {
    setUnits(units.filter((u) => u.id !== id));
  };

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
            <Scale className="w-8 h-8 text-emerald-600" />
            Units Taxonomy Management
          </h1>
          <p className="text-slate-500 text-sm mt-1">
            Configure standardized weights, liquid volumes, packaging metrics and SKU pricing units
          </p>
        </div>
        <Button
          onClick={() => setIsModalOpen(true)}
          className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-5 py-2.5 rounded-xl shadow-lg shadow-emerald-500/20 flex items-center gap-2 transition-all hover:scale-105"
        >
          <Plus className="w-5 h-5" />
          Add Measurement Unit
        </Button>
      </div>

      {/* Filter & Search */}
      <div className="bg-white/80 backdrop-blur-md p-4 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between gap-4">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search units by name, short name or symbol..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500 transition-all"
          />
        </div>

        <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200">
          Total Units: {units.length}
        </span>
      </div>

      {/* Grid Cards for Units */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredUnits.map((unit) => (
          <motion.div
            key={unit.id}
            whileHover={{ scale: 1.02 }}
            className="bg-white/80 backdrop-blur-md p-5 rounded-2xl border border-slate-200/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-4"
          >
            <div className="flex items-start justify-between">
              <div>
                <span className="text-xs font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                  {unit.id}
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-2">{unit.name}</h3>
              </div>
              <span className="px-2.5 py-1 bg-slate-100 text-slate-700 font-mono font-bold text-xs rounded-lg border border-slate-200">
                {unit.symbol}
              </span>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-slate-100">
              <span className="text-xs text-slate-500 font-medium">
                Short Code: <strong className="text-slate-800">{unit.shortName}</strong>
              </span>
              <div className="flex items-center gap-1">
                <button className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-colors">
                  <Edit3 className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDeleteUnit(unit.id)}
                  className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add Unit Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl p-6 w-full max-w-md shadow-2xl border border-slate-100 space-y-6"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <Scale className="w-5 h-5 text-emerald-600" />
                  Add Measurement Unit
                </h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleAddUnit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Unit Name * (e.g. Kilogram)
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Kilogram"
                    value={unitName}
                    onChange={(e) => setUnitName(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Short Name (e.g. Kg)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Kg"
                    value={unitShortName}
                    onChange={(e) => setUnitShortName(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                    Symbol (e.g. kg)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. kg"
                    value={unitSymbol}
                    onChange={(e) => setUnitSymbol(e.target.value)}
                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 focus:border-emerald-500"
                  />
                </div>

                <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
                  <Button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="px-4 py-2 text-sm text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-xl font-semibold"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="px-5 py-2 text-sm text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl font-semibold shadow-lg shadow-emerald-500/20"
                  >
                    Save Unit
                  </Button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Units;
