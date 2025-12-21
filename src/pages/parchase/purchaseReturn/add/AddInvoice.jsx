import { useMemo, useState } from "react";
import { Printer, Plus } from "lucide-react";

import InvoiceDetails from "./InvoiceDetails";
import InvoiceTable from "./InvoiceTable";
import AddProductModal from "./AddProductModal";
import InvoiceSummary from "./InvoiceSummary";

/* ---------------- PRODUCT MASTER ---------------- */
const productsDB = [
  { item: "Laptop", rate: 50000 },
  { item: "Mouse", rate: 500 },
  { item: "Laptop1", rate: 52000 },
  { item: "Mouse1", rate: 550 },
  { item: "Laptop2", rate: 51000 },
  { item: "Mouse2", rate: 600 },
];

export default function AddInvoice({
  invoiceData,
  setInvoiceData,
  products,
  setProducts,
}) {
  const [openModal, setOpenModal] = useState(false);

  /* ---------------- TOTALS ---------------- */
  const totals = useMemo(() => {
    const grand = products.reduce(
      (sum, p) => sum + p.returnQty * p.rate,
      0
    );
    return { grand };
  }, [products]);

  /* ---------------- ADD PRODUCT ---------------- */
  const addProduct = (product) => {
    setProducts((prev) => {
      const exist = prev.find((p) => p.item === product.item);

      if (exist) {
        return prev.map((p) =>
          p.item === product.item
            ? { ...p, returnQty: p.returnQty + 1 }
            : p
        );
      }

      return [
        ...prev,
        {
          item: product.item,
          returnQty: 1,
          rate: product.rate,
        },
      ];
    });

    setOpenModal(false);
  };

  return (
    <div className="h-full flex flex-col gap-3 p-1">

      {/* ===== RETURN INVOICE DETAILS ===== */}
      <InvoiceDetails onChange={setInvoiceData} />

      {/* ===== ACTION BAR ===== */}
      <div className="flex items-end justify-between gap-4 flex-wrap">
        <div className="text-sm font-semibold text-gray-700">
          Purchase Return Items
        </div>

        <div className="flex items-end gap-2">
          <button
            className="flex items-center gap-1 rounded-md bg-blue-600
              px-2 text-xs font-medium text-white hover:bg-blue-700"
            onClick={() => setOpenModal(true)}
          >
            <Plus size={12} />
            Add Item
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

      {/* ===== RETURN ITEMS TABLE ===== */}
      <InvoiceTable products={products} setProducts={setProducts} />

      {/* ===== SUMMARY ===== */}
      <InvoiceSummary
        totalQty={products.reduce((a, b) => a + b.returnQty, 0)}
        grand={totals.grand}
      />

      {/* ===== ADD ITEM MODAL ===== */}
      <AddProductModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        productsDB={productsDB}
        onAdd={addProduct}
      />
    </div>
  );
}
