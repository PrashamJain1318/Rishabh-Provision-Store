import React, { useEffect, useRef } from "react";
import JsBarcode from "jsbarcode";
import QRCode from "qrcode";

export type BarcodeFormat = "EAN13" | "CODE128" | "UPC" | "QR";

export interface BarcodeRendererProps {
  value: string;
  format?: BarcodeFormat;
  width?: number;
  height?: number;
  displayValue?: boolean;
  className?: string;
}

export const BarcodeRenderer: React.FC<BarcodeRendererProps> = ({
  value,
  format = "EAN13",
  width = 2,
  height = 50,
  displayValue = true,
  className = "",
}) => {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!value) return;

    if (format === "QR") {
      if (canvasRef.current) {
        QRCode.toCanvas(canvasRef.current, value, {
          width: height * 2,
          margin: 1,
          color: {
            dark: "#0f172a",
            light: "#ffffff",
          },
        }).catch((err) => console.error("QR Code Generation Error:", err));
      }
    } else {
      if (svgRef.current) {
        try {
          let jsFormat = "CODE128";
          if (format === "EAN13") jsFormat = "EAN13";
          if (format === "UPC") jsFormat = "UPC";
          if (format === "CODE128") jsFormat = "CODE128";

          // Validate EAN-13 digit length fallback
          let valToRender = value;
          if (jsFormat === "EAN13" && value.length !== 13) {
            jsFormat = "CODE128";
          }

          JsBarcode(svgRef.current, valToRender, {
            format: jsFormat,
            width,
            height,
            displayValue,
            fontOptions: "bold",
            font: "monospace",
            fontSize: 12,
            textMargin: 2,
            margin: 5,
            background: "#ffffff",
            lineColor: "#0f172a",
          });
        } catch (err) {
          // Fallback to Code128 on format mismatch
          try {
            JsBarcode(svgRef.current, value, {
              format: "CODE128",
              width,
              height,
              displayValue,
              font: "monospace",
              fontSize: 12,
            });
          } catch {}
        }
      }
    }
  }, [value, format, width, height, displayValue]);

  if (format === "QR") {
    return <canvas ref={canvasRef} className={`rounded-xl border border-slate-200 bg-white ${className}`} />;
  }

  return <svg ref={svgRef} className={`rounded-xl border border-slate-200 bg-white shadow-xs ${className}`} />;
};

export default BarcodeRenderer;
