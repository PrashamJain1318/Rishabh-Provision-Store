import React from "react";
import { Printer, Download, CheckCircle } from "lucide-react";
import { Button } from "@rishabh-store/ui";

export interface InvoiceItem {
  name: string;
  sku: string;
  qty: number;
  price: number;
  gst: number;
}

export interface InvoiceProps {
  invoiceNumber: string;
  date: string;
  cashierName: string;
  customerName: string;
  customerPhone?: string;
  customerGst?: string;
  items: InvoiceItem[];
  paymentMode: string;
  saleType?: "INTRA_STATE" | "INTER_STATE";
  onClose?: () => void;
}

export const InvoicePrinter: React.FC<InvoiceProps> = ({
  invoiceNumber,
  date,
  cashierName,
  customerName,
  customerPhone = "N/A",
  customerGst,
  items,
  paymentMode,
  saleType = "INTRA_STATE",
  onClose,
}) => {
  const taxableValue = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  const totalGst = items.reduce((sum, i) => sum + (i.price * i.qty * i.gst) / 100, 0);
  const cgst = saleType === "INTRA_STATE" ? totalGst / 2 : 0;
  const sgst = saleType === "INTRA_STATE" ? totalGst / 2 : 0;
  const igst = saleType === "INTER_STATE" ? totalGst : 0;
  const grandTotal = Math.round(taxableValue + totalGst);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Action Buttons Header */}
      <div className="flex items-center justify-between no-print border-b border-slate-200 dark:border-slate-800 pb-4">
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
          Tax Invoice Preview ({invoiceNumber})
        </span>
        <div className="flex items-center gap-2">
          <Button onClick={handlePrint} className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-md">
            <Printer className="w-4 h-4" /> Print ESC/POS Thermal Invoice
          </Button>
          {onClose && (
            <Button variant="outline" onClick={onClose} className="text-xs font-bold rounded-xl">
              Close
            </Button>
          )}
        </div>
      </div>

      {/* Official Tax Invoice Document Printable Layout */}
      <div id="tax-invoice-printable" className="bg-white text-slate-900 p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4 font-sans text-xs">
        {/* Header: Store Logo, Store Name & GSTIN */}
        <div className="flex items-start justify-between border-b border-slate-200 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white font-black text-2xl flex items-center justify-center shadow-md">
              R
            </div>
            <div>
              <h2 className="text-lg font-black tracking-tight text-slate-900 uppercase">
                Rishabh Provision Store
              </h2>
              <p className="text-[11px] text-slate-500 font-mono">
                Main Market Road, Andheri East, Mumbai, Maharashtra 400093
              </p>
              <p className="text-[11px] font-bold text-emerald-700 font-mono mt-0.5">
                GSTIN: 27AAACI1681G1ZM | FSSAI: 11521001000452
              </p>
            </div>
          </div>

          <div className="text-right font-mono">
            <span className="inline-block px-2.5 py-1 bg-emerald-100 text-emerald-800 font-bold text-[10px] rounded-md uppercase">
              Official Tax Invoice
            </span>
            <p className="font-extrabold text-sm text-slate-900 mt-1">{invoiceNumber}</p>
            <p className="text-[10px] text-slate-500">{date}</p>
          </div>
        </div>

        {/* Invoice Metadata Grid: Cashier, Customer, Payment Mode */}
        <div className="grid grid-cols-2 gap-4 bg-slate-50 p-3 rounded-xl border border-slate-100 text-[11px]">
          <div>
            <p className="text-slate-400 font-bold uppercase text-[9px]">Bill To (Customer)</p>
            <p className="font-extrabold text-slate-900 text-xs">{customerName}</p>
            <p className="text-slate-500 font-mono">Phone: {customerPhone}</p>
            {customerGst && <p className="text-emerald-700 font-bold font-mono">GSTIN: {customerGst}</p>}
          </div>

          <div className="text-right">
            <p className="text-slate-400 font-bold uppercase text-[9px]">Billing Info</p>
            <p className="font-bold text-slate-800">Cashier: {cashierName}</p>
            <p className="text-slate-600 font-mono">Payment Mode: <strong className="text-emerald-700">{paymentMode}</strong></p>
          </div>
        </div>

        {/* Products Table */}
        <table className="w-full text-left border-collapse border border-slate-200">
          <thead>
            <tr className="bg-slate-100 text-slate-600 uppercase font-bold text-[10px] border-b border-slate-200">
              <th className="p-2 border-r border-slate-200">#</th>
              <th className="p-2 border-r border-slate-200">Item Description</th>
              <th className="p-2 border-r border-slate-200 text-center">Qty</th>
              <th className="p-2 border-r border-slate-200 text-right">Unit Price (₹)</th>
              <th className="p-2 border-r border-slate-200 text-center">GST %</th>
              <th className="p-2 text-right">Line Total (₹)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 font-mono text-[11px]">
            {items.map((item, idx) => (
              <tr key={idx} className="hover:bg-slate-50">
                <td className="p-2 border-r border-slate-200 text-slate-400 font-bold">{idx + 1}</td>
                <td className="p-2 border-r border-slate-200 font-bold text-slate-800">
                  {item.name}
                  <span className="block text-[9px] font-normal text-slate-400">SKU: {item.sku}</span>
                </td>
                <td className="p-2 border-r border-slate-200 text-center font-bold">{item.qty}</td>
                <td className="p-2 border-r border-slate-200 text-right">₹{item.price.toFixed(2)}</td>
                <td className="p-2 border-r border-slate-200 text-center font-bold text-emerald-700">{item.gst}%</td>
                <td className="p-2 text-right font-extrabold text-slate-900">₹{(item.price * item.qty).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Financial Taxes & Grand Total Breakdown */}
        <div className="flex items-start justify-between pt-2">
          {/* Left: Dynamic QR Code Verification */}
          <div className="flex items-center gap-3 bg-slate-50 p-3 rounded-xl border border-slate-100">
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=80x80&data=INV:${invoiceNumber}|TOTAL:${grandTotal}`}
              alt="Invoice Verification QR"
              className="w-16 h-16 object-contain rounded-lg border border-slate-200"
            />
            <div>
              <p className="font-extrabold text-[10px] text-slate-800">Digital Bill Verification</p>
              <p className="text-[9px] text-slate-400">Scan QR to verify tax invoice authenticity</p>
            </div>
          </div>

          {/* Right: Taxes Calculation */}
          <div className="w-56 space-y-1.5 font-mono text-right text-xs">
            <div className="flex justify-between text-slate-600">
              <span>Taxable Value:</span>
              <span>₹{taxableValue.toFixed(2)}</span>
            </div>
            {saleType === "INTRA_STATE" ? (
              <>
                <div className="flex justify-between text-emerald-700">
                  <span>CGST:</span>
                  <span>₹{cgst.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-emerald-700">
                  <span>SGST:</span>
                  <span>₹{sgst.toFixed(2)}</span>
                </div>
              </>
            ) : (
              <div className="flex justify-between text-blue-700">
                <span>IGST:</span>
                <span>₹{igst.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between border-t-2 border-slate-900 pt-1.5 text-sm font-black text-slate-900">
              <span>Grand Total:</span>
              <span>₹{grandTotal}.00</span>
            </div>
          </div>
        </div>

        {/* Footer Thank You Message */}
        <div className="border-t border-dashed border-slate-300 pt-3 text-center space-y-1">
          <p className="font-extrabold text-xs text-slate-800 tracking-wide uppercase">
            🙏 Thank you for shopping at Rishabh Provision Store!
          </p>
          <p className="text-[10px] text-slate-500 italic">
            For returns, please produce this original tax invoice within 7 days. Have a wonderful day!
          </p>
        </div>
      </div>
    </div>
  );
};

export default InvoicePrinter;
