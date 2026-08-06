# Enterprise GST & Tax Compliance Engine Guide

This document defines the Indian Goods and Services Tax (GST) compliance architecture, HSN/SAC code rules, Intra-state vs Inter-state tax splitting logic, and GSTR reporting specifications for the Rishabh Provision Store platform.

---

## ⚖️ Indian GST Tax Engine Logic

1. **Intra-State Supply (Same State Code)**:
   - **Condition**: Store State Code === Destination Customer State Code (e.g., State `27` Maharashtra to State `27` Maharashtra).
   - **Tax Split**: **CGST = 50% of GST Rate**, **SGST = 50% of GST Rate**, **IGST = 0%**.
2. **Inter-State Supply (Different State Code)**:
   - **Condition**: Store State Code !== Destination Customer State Code (e.g., State `27` Maharashtra to State `07` Delhi).
   - **Tax Split**: **IGST = 100% of GST Rate**, **CGST = 0%**, **SGST = 0%**.
3. **Tax-Inclusive Pricing Calculation**:
   - `Taxable Value = Net Amount / (1 + GST Rate / 100)`
4. **Tax-Exclusive Pricing Calculation**:
   - `Taxable Value = Net Amount`
   - `Tax Amount = Taxable Value * (GST Rate / 100)`

---

## 📊 GSTR Filing Manifest Specifications

| Report Type | Purpose & Description | Filing Frequency |
| :--- | :--- | :---: |
| **`GSTR-1`** | Outward Supplies / Sales Register detailing all B2B & B2C taxable invoices | Monthly / Quarterly |
| **`GSTR-2`** | Inward Supplies / Purchase Register for claiming Input Tax Credit (ITC) | Monthly |
| **`GSTR-3B`** | Summary Tax Return calculating Net Cash Tax Payable (`Output Liability - Input Tax Credit`) | Monthly |

---

## 🛠️ API Contracts

- `GET /api/v1/gst/settings` - Retrieve store GSTIN, PAN, and State Code
- `PUT /api/v1/gst/settings` - Update merchant GST configuration
- `POST /api/v1/gst/calculate` - Calculate CGST/SGST/IGST breakdown for cart items
- `GET /api/v1/gst/summary` - Get monthly GST collected, ITC, and net liability
- `GET /api/v1/gst/report` - Generate GSTR-1, GSTR-2, or GSTR-3B manifests
- `POST /api/v1/gst/validate` - Validate GSTIN, PAN, and HSN code formats
- `GET /api/v1/gst/invoice/:id` - Fetch tax invoice with HSN breakdown
