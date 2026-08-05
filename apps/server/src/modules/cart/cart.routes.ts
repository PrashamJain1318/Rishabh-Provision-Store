import { Router } from "express";
import {
  getCart,
  addToCart,
  updateCartItem,
  removeCartItem,
  mergeGuestCart,
  clearCart,
} from "./cart.controller";

const router = Router();

router.get("/", getCart);
router.post("/items", addToCart);
router.patch("/items/:productId", updateCartItem);
router.delete("/items/:productId", removeCartItem);
router.post("/merge", mergeGuestCart);
router.delete("/", clearCart);

export default router;
