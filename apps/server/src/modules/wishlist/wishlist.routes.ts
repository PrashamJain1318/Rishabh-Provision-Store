import { Router } from "express";
import {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
  moveToCart,
  getSharedWishlist,
} from "./wishlist.controller";

const router = Router();

router.get("/", getWishlist);
router.post("/items", addToWishlist);
router.delete("/items/:productId", removeFromWishlist);
router.post("/move-to-cart", moveToCart);
router.get("/share/:shareToken", getSharedWishlist);

export default router;
