import { Router } from "express";
import {
  getCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
  getCustomerAddresses,
  addCustomerAddress,
} from "./customer.controller";

const router = Router();

router.get("/", getCustomers);
router.get("/:id", getCustomerById);
router.post("/", createCustomer);
router.patch("/:id", updateCustomer);
router.delete("/:id", deleteCustomer);

// Address sub-routes
router.get("/:id/addresses", getCustomerAddresses);
router.post("/:id/addresses", addCustomerAddress);

export default router;
