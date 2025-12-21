import { useMemo, useState } from "react";
import { Printer, Plus } from "lucide-react";

import InvoiceDetails from "./InvoiceDetails";
import InvoiceTable from "./InvoiceTable";
import AddProductModal from "./AddProductModal";
import InvoiceSummary from "./InvoiceSummary";

/* ---------------- PRODUCT MASTER ---------------- */
const productsDB = [
  { itemCode: "P001", description: "Laptop", rate: 50000 },
  { itemCode: "P002", description: "Mouse", rate: 500 },
  { itemCode: "P003", description: "Laptop1", rate: 52000 },
  { itemCode: "P004", description: "Mouse1", rate: 550 },
  { itemCode: "P005", description: "Laptop2", rate: 51000 },
  { itemCode: "P006", description: "Mouse2", rate: 600 },
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

  /* ---------------- TOTALS ---------------- */
  const totals = useMemo(() => {
    const sub = products.reduce(
      (sum, p) => sum + p.qty * p.rate,
      0
    );

    return { sub, grand: sub };
  }, [products]);

  /* ---------------- ADD PRODUCT ---------------- */
  const addProduct = (product) => {
    setProducts((prev) => {
      const exist = prev.find(
        (p) => p.itemCode === product.itemCode
      );

      if (exist) {
        return prev.map((p) =>
          p.itemCode === product.itemCode
            ? { ...p, qty: p.qty + 1 }
            : p
        );
      }

      return [
        ...prev,
        {
          itemCode: product.itemCode,
          description: product.description,
          rate: product.rate,
          qty: 1,
        },
      ];
    });

    setScanCode("");
  };

  /* ---------------- SCAN HANDLER ---------------- */
  const handleScanChange = (e) => {
    const value = e.target.value;
    setScanCode(value);

    const found = productsDB.find(
      (p) => p.itemCode.toLowerCase() === value.toLowerCase()
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
            Scan / Enter Item Code
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
