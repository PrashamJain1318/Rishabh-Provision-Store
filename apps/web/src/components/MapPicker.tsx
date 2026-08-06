import React, { useState } from "react";
import { MapPin, Navigation, Search, CheckCircle, Compass, LocateFixed } from "lucide-react";
import { Button } from "@rishabh-store/ui";
import api from "../lib/api";

export interface MapLocation {
  lat: number;
  lng: number;
  formattedAddress: string;
}

interface MapPickerProps {
  initialLocation?: MapLocation;
  onLocationSelect: (location: MapLocation) => void;
}

export const MapPicker: React.FC<MapPickerProps> = ({
  initialLocation = { lat: 19.0178, lng: 72.8478, formattedAddress: "Shop #4, Rishabh Provision Store, Dadar West, Mumbai 400028" },
  onLocationSelect,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState<Array<{ description: string; placeId: string }>>([]);
  const [currentLocation, setCurrentLocation] = useState<MapLocation>(initialLocation);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearchChange = async (val: string) => {
    setSearchQuery(val);
    if (!val.trim()) {
      setSuggestions([]);
      return;
    }

    try {
      const res = await api.get(`/maps/place-autocomplete`, { params: { input: val } });
      if (res.data?.data) {
        setSuggestions(res.data.data);
      }
    } catch (err) {
      console.error("Place autocomplete error", err);
    }
  };

  const handleSelectSuggestion = async (placeId: string, description: string) => {
    setIsSearching(true);
    setSearchQuery(description);
    setSuggestions([]);

    try {
      const res = await api.get(`/maps/place-details`, { params: { placeId } });
      const loc: MapLocation = res.data?.data || {
        lat: 19.0178,
        lng: 72.8478,
        formattedAddress: description,
      };
      setCurrentLocation(loc);
      onLocationSelect(loc);
    } catch (err) {
      console.error("Place details error", err);
    } finally {
      setIsSearching(false);
    }
  };

  const handleUseCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lng = position.coords.longitude;
          try {
            const res = await api.get(`/maps/reverse-geocode`, { params: { lat, lng } });
            const loc: MapLocation = res.data?.data || {
              lat,
              lng,
              formattedAddress: `Current Location (${lat.toFixed(4)}, ${lng.toFixed(4)})`,
            };
            setCurrentLocation(loc);
            onLocationSelect(loc);
          } catch (err) {
            const fallback: MapLocation = { lat, lng, formattedAddress: `GPS Location (${lat.toFixed(4)}, ${lng.toFixed(4)})` };
            setCurrentLocation(fallback);
            onLocationSelect(fallback);
          }
        },
        () => {
          alert("Could not retrieve GPS location. Defaulting to Dadar West, Mumbai.");
        }
      );
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-5 space-y-4 shadow-xl">
      {/* Search Input with Google Autocomplete Suggestions */}
      <div className="relative">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => handleSearchChange(e.target.value)}
              placeholder="🔍 Search delivery location, landmark or pin code..."
              className="w-full bg-slate-950 border border-slate-700 text-white placeholder-slate-400 text-xs pl-10 pr-4 py-2.5 rounded-xl font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
            />
          </div>

          <Button
            type="button"
            size="sm"
            onClick={handleUseCurrentLocation}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl px-3 flex items-center gap-1.5 shrink-0"
          >
            <LocateFixed className="w-3.5 h-3.5" />
            GPS Location
          </Button>
        </div>

        {/* Autocomplete Dropdown List */}
        {suggestions.length > 0 && (
          <div className="absolute z-50 left-0 right-0 top-12 bg-slate-950 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden divide-y divide-slate-800 max-h-48 overflow-y-auto">
            {suggestions.map((sug) => (
              <div
                key={sug.placeId}
                onClick={() => handleSelectSuggestion(sug.placeId, sug.description)}
                className="p-3 hover:bg-slate-850 cursor-pointer text-xs text-slate-300 flex items-center gap-2 font-medium transition-all"
              >
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                <span className="truncate">{sug.description}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Interactive Map Visual Container */}
      <div className="relative w-full h-52 bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden flex items-center justify-center group">
        {/* Mock Map Background Grid Pattern */}
        <div className="absolute inset-0 opacity-25 bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px]" />

        {/* Store & Customer Markers */}
        <div className="relative z-10 flex flex-col items-center gap-1.5 animate-bounce">
          <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-lg shadow-emerald-500/50 ring-4 ring-emerald-500/20">
            <MapPin className="w-5 h-5 fill-white" />
          </div>
          <span className="bg-slate-900/90 border border-slate-700 text-emerald-400 font-mono text-[10px] font-bold px-2 py-0.5 rounded-full shadow-md">
            {currentLocation.lat.toFixed(4)}, {currentLocation.lng.toFixed(4)}
          </span>
        </div>

        {/* Floating Controls Overlay */}
        <div className="absolute bottom-3 left-3 right-3 bg-slate-900/90 backdrop-blur-md border border-slate-800 rounded-xl p-2.5 flex items-center justify-between text-[11px] font-mono text-slate-300">
          <span className="truncate flex items-center gap-1.5 font-bold text-white">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            {currentLocation.formattedAddress}
          </span>
        </div>
      </div>
    </div>
  );
};

export default MapPicker;
