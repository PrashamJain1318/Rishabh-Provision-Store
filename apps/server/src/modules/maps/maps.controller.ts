import { Request, Response } from "express";
import { mapsService } from "./maps.service";
import { sendSuccess, sendError } from "../../utils/response";
import { asyncHandler } from "../../utils/asyncHandler";

export const geocodeAddress = asyncHandler(async (req: Request, res: Response) => {
  const address = req.query.address as string;
  if (!address) {
    return sendError({ res, statusCode: 400, message: "Address query parameter is required." });
  }

  const result = await mapsService.geocode(address);

  return sendSuccess({
    res,
    message: "Geocoding performed successfully",
    data: result,
  });
});

export const reverseGeocodeCoordinates = asyncHandler(async (req: Request, res: Response) => {
  const lat = parseFloat(req.query.lat as string);
  const lng = parseFloat(req.query.lng as string);

  if (isNaN(lat) || isNaN(lng)) {
    return sendError({ res, statusCode: 400, message: "Valid numeric lat and lng query parameters are required." });
  }

  const result = await mapsService.reverseGeocode(lat, lng);

  return sendSuccess({
    res,
    message: "Reverse geocoding performed successfully",
    data: result,
  });
});

export const placeAutocompleteSuggestions = asyncHandler(async (req: Request, res: Response) => {
  const input = req.query.input as string;
  if (!input) {
    return sendError({ res, statusCode: 400, message: "Input text query parameter is required for place autocomplete." });
  }

  const result = await mapsService.placeAutocomplete(input);

  return sendSuccess({
    res,
    message: "Place autocomplete suggestions retrieved",
    data: result,
  });
});

export const getPlaceDetailsById = asyncHandler(async (req: Request, res: Response) => {
  const placeId = req.query.placeId as string;
  if (!placeId) {
    return sendError({ res, statusCode: 400, message: "Place ID query parameter is required." });
  }

  const result = await mapsService.placeDetails(placeId);

  return sendSuccess({
    res,
    message: "Place details retrieved",
    data: result,
  });
});

export const getDirectionsRoute = asyncHandler(async (req: Request, res: Response) => {
  const origin = req.query.origin as string;
  const destination = req.query.destination as string;

  if (!origin || !destination) {
    return sendError({ res, statusCode: 400, message: "Both origin and destination query parameters are required." });
  }

  const result = await mapsService.directions(origin, destination);

  return sendSuccess({
    res,
    message: "Directions route calculated successfully",
    data: result,
  });
});
