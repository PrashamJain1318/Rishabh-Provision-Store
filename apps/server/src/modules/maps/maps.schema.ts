import { z } from "zod";

export const geocodeSchema = z.object({
  address: z.string().min(1, "Address parameter is required"),
});

export const reverseGeocodeSchema = z.object({
  lat: z.string().transform((val) => parseFloat(val)),
  lng: z.string().transform((val) => parseFloat(val)),
});

export const placeAutocompleteSchema = z.object({
  input: z.string().min(1, "Search query input is required"),
});

export const placeDetailsSchema = z.object({
  placeId: z.string().min(1, "Place ID is required"),
});

export const directionsSchema = z.object({
  origin: z.string().min(1, "Origin is required"),
  destination: z.string().min(1, "Destination is required"),
});
