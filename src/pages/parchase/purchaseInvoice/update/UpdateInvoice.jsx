import { useMemo, useState } from "react";
import { Printer, Plus } from "lucide-react";

import UpdateInvoiceDetails from "./UpdateInvoiceDetails";
import UpdateInvoiceTable from "./UpdateInvoiceTable";
import UpdateProductModal from "./UpdateProductModal";
import UpdateInvoiceSummary from "./UpdateInvoiceSummary";

// Updated products DB
const productsDB = [
  { itemCode: "P001", description: "Laptop", rate: 50000,  },
  { itemCode: "P002", description: "Mouse", rate: 500,  },
  { itemCode: "P003", description: "Laptop1", rate: 52000,  },
  { itemCode: "P004", description: "Mouse1", rate: 550,  },
  { itemCode: "P005", description: "Laptop2", rate: 51000,  },
  { itemCode: "P006", description: "Mouse2", rate: 600,  },
];

export default function UpdateInvoice({
  upinvoiceData,
  setUpInvoiceData,
  upproducts,
  setUpProducts,
}) {
  const [openModal, setOpenModal] = useState(false);
  const [scanCode, setScanCode] = useState("");
  const [amountPaid, setAmountPaid] = useState("");

  /* ================= TOTALS ================= */
  const totals = useMemo(() => {
    let sub = 0;
    let tax = 0;

    upproducts.forEach((p) => {
      const base = p.qty * p.rate;
      const gstAmt = (base * (p.gstPercent || 0)) / 100;

      sub += base;
      tax += gstAmt;
    });

    return {
      sub,
      tax,
      grand: sub + tax,
    };
  }, [upproducts]);

  /* ================= ADD PRODUCT ================= */
  const addProduct = (product, qty = 1) => {
    setUpProducts((prev) => {
      const exist = prev.find((p) => p.itemCode === product.itemCode);

      if (exist) {
        return prev.map((p) =>
          p.itemCode === product.itemCode
            ? { ...p, qty: p.qty + qty }
            : p
        );
      }

      return [
        ...prev,
        {
          itemCode: product.itemCode,
          description: product.description,
          qty,
          rate: product.rate,
          gstPercent: product.gstPercent || 18,
        },
      ];
    });

    setScanCode("");
  };

  /* ================= SCAN ================= */
  const handleScanChange = (e) => {
    const value = e.target.value;
    setScanCode(value);

    const found = productsDB.find(
      (p) => p.itemCode.toLowerCase() === value.toLowerCase()
    );

    if (found) addProduct(found, 1);
  };

  const printInvoice = () => window.print();

  return (
    <div className="h-full flex flex-col gap-3 p-1">
      {/* ===== INVOICE DETAILS ===== */}
      <UpdateInvoiceDetails
        value={upinvoiceData}
        onChange={setUpInvoiceData}
      />

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
            onClick={printInvoice}
          >
            <Printer size={12} />
            Print
          </button>
        </div>
      </div>

      {/* ===== PRODUCT TABLE ===== */}
      <UpdateInvoiceTable
        products={upproducts}
        setProducts={setUpProducts}
      />

      {/* ===== SUMMARY ===== */}
      <UpdateInvoiceSummary
        totalQty={upproducts.reduce((a, b) => a + b.qty, 0)}
        amountPaid={amountPaid}
        setAmountPaid={setAmountPaid}
        sub={totals.sub}
        tax={totals.tax}
        grand={totals.grand}
      />

      {/* ===== ADD PRODUCT MODAL ===== */}
      <UpdateProductModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        productsDB={productsDB}
        onAdd={addProduct}
      />
    </div>
  );
}
