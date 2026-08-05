import { Router } from "express";
import {
  getCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
} from "./customer.controller";

const router = Router();

router.get("/", getCustomers);
router.get("/:id", getCustomerById);
router.post("/", createCustomer);
router.patch("/:id", updateCustomer);
router.delete("/:id", deleteCustomer);

export default router;
