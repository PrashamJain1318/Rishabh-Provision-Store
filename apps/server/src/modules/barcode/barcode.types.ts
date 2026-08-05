export type BarcodeType = "Code128" | "EAN13" | "QR" | "UPC";

export interface IBarcodeGenerateInput {
  value: string;
  type: BarcodeType;
  productName?: string;
  price?: number;
}

export interface IBulkPrintInput {
  barcodes: IBarcodeGenerateInput[];
  format: "PDF" | "PNG";
}
