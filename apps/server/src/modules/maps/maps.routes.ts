import { Router } from "express";
import {
  geocodeAddress,
  reverseGeocodeCoordinates,
  placeAutocompleteSuggestions,
  getPlaceDetailsById,
  getDirectionsRoute,
} from "./maps.controller";

const router = Router();

router.get("/geocode", geocodeAddress);
router.get("/reverse-geocode", reverseGeocodeCoordinates);
router.get("/place-autocomplete", placeAutocompleteSuggestions);
router.get("/place-details", getPlaceDetailsById);
router.get("/directions", getDirectionsRoute);

export default router;
