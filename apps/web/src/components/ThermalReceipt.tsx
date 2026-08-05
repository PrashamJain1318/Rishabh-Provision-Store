import React from "react";
import { Printer } from "lucide-react";
import { Button } from "@rishabh-store/ui";

export interface ThermalReceiptItem {
  name: string;
  qty: number;
  price: number;
}

export interface ThermalReceiptProps {
  storeName?: string;
  storeGst?: string;
  invoiceNumber: string;
  date?: string;
  items: ThermalReceiptItem[];
  paymentMode: string;
  onClose?: () => void;
}

export const ThermalReceipt: React.FC<ThermalReceiptProps> = ({
  storeName = "RISHABH PROVISION STORE",
  storeGst = "27AAACI1681G1ZM",
  invoiceNumber,
  date = new Date().toLocaleString("en-IN"),
  items,
  paymentMode,
  onClose,
}) => {
  const taxableValue = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const estimatedTax = Math.round(taxableValue * 0.05); // 5% avg tax
  const grandTotal = taxableValue + estimatedTax;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-4">
      {/* Action Header */}
      <div className="flex items-center justify-between no-print border-b border-slate-200 dark:border-slate-800 pb-3">
        <span className="text-xs font-bold text-slate-500 uppercase">
          80mm ESC/POS Thermal Receipt
        </span>
        <div className="flex items-center gap-2">
          <Button onClick={handlePrint} className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-md">
            <Printer className="w-4 h-4" /> Print Thermal Bill
          </Button>
          {onClose && (
            <Button variant="outline" onClick={onClose} className="text-xs font-bold rounded-xl">
              Close
            </Button>
          )}
        </div>
      </div>

      {/* 80mm THERMAL RECEIPT CANVAS (384px / 80mm width) */}
      <div
        id="thermal-receipt-printable"
        className="w-[80mm] mx-auto bg-white text-black p-4 font-mono text-[11px] leading-tight space-y-3 border border-slate-300 shadow-lg"
        style={{ fontFamily: "'Courier New', Courier, monospace" }}
      >
        {/* 1. Store Name & Header */}
        <div className="text-center space-y-1">
          <h2 className="font-extrabold text-sm uppercase tracking-wider">{storeName}</h2>
          <p className="text-[10px]">MAIN MARKET, ANDHERI EAST, MUMBAI</p>
          <p className="text-[10px] font-bold">GSTIN: {storeGst}</p>
          <p className="text-[10px]">PH: +91 98201 12345</p>
        </div>

        <div className="border-t border-dashed border-black pt-1">
          <div className="flex justify-between font-bold">
            <span>INV: {invoiceNumber}</span>
            <span>{paymentMode}</span>
          </div>
          <p className="text-[9px]">{date}</p>
        </div>

        {/* 2. Items List */}
        <div className="border-t border-b border-dashed border-black py-2 space-y-1">
          <div className="flex justify-between font-bold text-[10px] uppercase border-b border-black pb-1">
            <span>Item</span>
            <span>Qty x Price</span>
            <span>Amt</span>
          </div>

          {items.map((item, idx) => (
            <div key={idx} className="space-y-0.5">
              <p className="font-bold truncate">{item.name}</p>
              <div className="flex justify-between text-[10px]">
                <span>{item.qty} x ₹{item.price}</span>
                <span className="font-bold">₹{item.qty * item.price}</span>
              </div>
            </div>
          ))}
        </div>

        {/* 3. Tax & Totals */}
        <div className="space-y-1 text-right">
          <div className="flex justify-between">
            <span>Subtotal:</span>
            <span>₹{taxableValue}.00</span>
          </div>
          <div className="flex justify-between text-[10px]">
            <span>Est. Tax (GST):</span>
            <span>₹{estimatedTax}.00</span>
          </div>
          <div className="flex justify-between font-extrabold text-sm border-t border-b border-black py-1">
            <span>TOTAL:</span>
            <span>₹{grandTotal}.00</span>
          </div>
        </div>

        {/* 4. Payment Mode & QR Code */}
        <div className="text-center space-y-2 pt-1">
          <div className="inline-block p-1 bg-white border border-black">
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=90x90&data=INV:${invoiceNumber}`}
              alt="Receipt QR"
              className="w-20 h-20 mx-auto"
            />
          </div>

          {/* 5. Thermal Footer */}
          <div className="text-center text-[10px] space-y-0.5 border-t border-dashed border-black pt-2 font-bold">
            <p>THANK YOU! VISIT AGAIN!</p>
            <p className="text-[8px] font-normal">SOFTWARE BY RISHABH POS</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThermalReceipt;
