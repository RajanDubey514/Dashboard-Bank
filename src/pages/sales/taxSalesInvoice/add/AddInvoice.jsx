import { useMemo, useState } from "react";
import { Printer, Plus } from "lucide-react";

import InvoiceDetails from "./InvoiceDetails";
import InvoiceTable from "./InvoiceTable";
import AddProductModal from "./AddProductModal";
import InvoiceSummary from "./InvoiceSummary";

const productsDB = [
  { code: "P001", name: "Laptop", rate: 50000, sgst: 9, cgst: 9, igst: 0 },
  { code: "P002", name: "Mouse", rate: 500, sgst: 9, cgst: 9, igst: 0 },
  { code: "P003", name: "Laptop1", rate: 50000, sgst: 9, cgst: 9, igst: 0 },
  { code: "P004", name: "Mouse1", rate: 500, sgst: 9, cgst: 9, igst: 0 },
  { code: "P005", name: "Laptop2", rate: 50000, sgst: 9, cgst: 9, igst: 0 },
  { code: "P006", name: "Mouse2", rate: 500, sgst: 9, cgst: 9, igst: 0 },
];

export default function AddInvoice({
  invoiceData,
  setInvoiceData,
  products,
  setProducts,
}) {
  const [openModal, setOpenModal] = useState(false);
  const [scanCode, setScanCode] = useState("");
  const [amountPaid, setAmountPaid] = useState("");

  // ---------------- TOTALS ----------------
  const totals = useMemo(() => {
    let sub = 0;
    let tax = 0;

    products.forEach((p) => {
      const base = p.qty * p.rate;
      sub += base;
      tax += (base * (p.sgst + p.cgst + p.igst)) / 100;
    });

    return { sub, tax, grand: sub + tax };
  }, [products]);

  // ---------------- ADD PRODUCT ----------------
  const addProduct = (product) => {
    setProducts((prev) => {
      const exist = prev.find((p) => p.code === product.code);
      if (exist) {
        return prev.map((p) =>
          p.code === product.code ? { ...p, qty: p.qty + 1 } : p
        );
      }
      return [...prev, { ...product, qty: 1, discountPct: 0, discountAmt: 0 }];
    });

    setScanCode("");
  };

  // ---------------- SCAN HANDLER ----------------
  const handleScanChange = (e) => {
    const value = e.target.value;
    setScanCode(value);

    const found = productsDB.find(
      (p) => p.code.toLowerCase() === value.toLowerCase()
    );

    if (found) addProduct(found);
  };

  return (
    <div className="h-full flex flex-col gap-3 p-1">
      {/* ===== INVOICE DETAILS ===== */}
      <InvoiceDetails onChange={setInvoiceData} />

      {/* ===== SCAN + ACTION BAR ===== */}
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div className="flex flex-col">
          <label className="text-[11px] font-semibold text-gray-600 mb-1">
            Scan / Enter Product Code
          </label>
          <input
            className="h-8 w-60 rounded-md border border-gray-300 px-2 text-sm
              focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Scan / Enter Code"
            value={scanCode}
            onChange={handleScanChange}
          />
        </div>

        <div className="flex items-end gap-2">
          <button
            className="flex items-center gap-1 rounded-md bg-blue-600
              px-2 text-xs font-medium text-white hover:bg-blue-700"
            onClick={() => setOpenModal(true)}
          >
            <Plus size={12} />
            Add Product
          </button>

          <button
            className="flex items-center gap-1 rounded-md bg-green-600
              px-2 text-xs font-medium text-white hover:bg-green-700"
            onClick={() => window.print()}
          >
            <Printer size={12} />
            Print
          </button>
        </div>
      </div>

      {/* ===== PRODUCT TABLE ===== */}
      <InvoiceTable products={products} setProducts={setProducts} />

      {/* ===== SUMMARY ===== */}
      <InvoiceSummary
        totalQty={products.reduce((a, b) => a + b.qty, 0)}
        amountPaid={amountPaid}
        setAmountPaid={setAmountPaid}
        sub={totals.sub}
        tax={totals.tax}
        grand={totals.grand}
      />

      {/* ===== ADD PRODUCT MODAL ===== */}
      <AddProductModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        productsDB={productsDB}
        onAdd={addProduct}
      />
    </div>
  );
}
