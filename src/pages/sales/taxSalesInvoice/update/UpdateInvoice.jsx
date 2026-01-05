import { useEffect, useMemo, useState } from "react";
import { Plus, Printer, Package } from "lucide-react";

import InvoiceDetails from "./UpdateInvoiceDetails";
import InvoiceTable from "./UpdateInvoiceTable";
import AddProductModal from "../../salesModal/AddProductModal";
import InvoiceSummary from "../../salesModal/InvoiceSummary";

/* -------- PRODUCT MASTER -------- */
const productsDB = [
  { code: "P001", name: "Laptop" },
  { code: "P002", name: "Mouse" },
  { code: "P003", name: "Keyboard" },
  { code: "P004", name: "Monitor" },
  { code: "P005", name: "Printer" },
];

export default function UpdateInvoice({
  upinvoiceData = {}, // ensure default empty object
  setUpInvoiceData,
  products = [], // default empty array
  setProducts,
}) {
  /* ---------------- LOCAL STATE ---------------- */
  const [openModal, setOpenModal] = useState(false);
  const [scanCode, setScanCode] = useState("");
  const [amountPaid, setAmountPaid] = useState(0);

  /* ---------------- PREFILL PAYMENT ---------------- */
  useEffect(() => {
    if (upinvoiceData?.amountPaid) {
      setAmountPaid(upinvoiceData.amountPaid);
    } else {
      setAmountPaid(0);
    }
  }, [upinvoiceData]);

  /* ---------------- PREFILL PRODUCTS ---------------- */
 useEffect(() => {
  if (upinvoiceData.products?.length) {
    setProducts((prev) => {
      // Only set if products array is empty
      if (prev.length > 0) return prev;

      return upinvoiceData.products.map((p) => ({
        id: p.id || Date.now(), // fallback id
        itemCode: p.itemCode,
        product: p.product,
        qty: p.qty || 1,
        rate: p.rate || 0,
        sgst: p.sgst || 0,
        cgst: p.cgst || 0,
        igst: p.igst || 0,
        discountPercent: p.discountPercent || 0,
        discountAmount: p.discountAmount || 0,
        total: p.total || 0,
      }));
    });
  }
  // Run only when invoice products change
}, [upinvoiceData.products, setProducts]);

  /* ---------------- ADD PRODUCT ---------------- */
  const addProduct = (product) => {
    setProducts((prev) => {
      if (prev.find((p) => p.itemCode === product.code)) return prev;
      return [
        ...prev,
        {
          id: Date.now(),
          itemCode: product.code,
          product: product.name,
          qty: 1,
          rate: 0,
          sgst: 0,
          cgst: 0,
          igst: 0,
          discountPercent: 0,
          discountAmount: 0,
          total: 0,
        },
      ];
    });

    setOpenModal(false);
  };

  /* ---------------- SCAN PRODUCT ---------------- */
  const handleScanChange = (e) => {
    const value = e.target.value;
    setScanCode(value);

    const found = productsDB.find(
      (p) => p.code.toLowerCase() === value.toLowerCase()
    );

    if (found) {
      addProduct(found);
      setScanCode("");
    }
  };

  /* ---------------- CALCULATIONS ---------------- */
  const totals = useMemo(() => {
    let totalQty = 0;
    let sub = 0;
    let tax = 0;

    products.forEach((p) => {
      const qty = Number(p.qty) || 0;
      const rate = Number(p.rate) || 0;
      const discount = Number(p.discountAmount) || 0;
      const taxable = qty * rate - discount;

      const sgst = (taxable * (p.sgst || 0)) / 100;
      const cgst = (taxable * (p.cgst || 0)) / 100;
      const igst = (taxable * (p.igst || 0)) / 100;

      totalQty += qty;
      sub += taxable;
      tax += sgst + cgst + igst;
    });

    return {
      totalQty,
      sub,
      tax,
      grand: sub + tax,
    };
  }, [products]);

  console.log(upinvoiceData)

  /* ---------------- UI ---------------- */
  return (
    <div className="h-full flex flex-col gap-3 p-2">
      {/* ===== INVOICE DETAILS (PREFILLED) ===== */}
      {upinvoiceData && (
        <InvoiceDetails
        initialValues = {upinvoiceData}
         onChange={(data) =>
          setUpInvoiceData((prev) => ({ ...prev, ...data }))
        }
        />
      )}

      {/* ===== ACTION BAR ===== */}
      <div className="flex justify-between gap-2 items-end">
        <div className="flex flex-col">
          <label className="text-[11px] font-semibold text-gray-600 mb-1">
            Scan / Enter Item Code
          </label>
          <input
            className="h-8 w-60 rounded-md border px-2 text-sm focus:ring-2 focus:ring-blue-500"
            placeholder="Scan / Enter Code"
            value={scanCode}
            onChange={handleScanChange}
          />
        </div>
          <div className="flex gap-2">

        <button
          onClick={() => setOpenModal(true)}
          className="flex items-center gap-1 rounded-md bg-blue-600 px-3 py-1 text-xs font-medium text-white"
        >
          <Plus size={12} />
          Add Product
        </button>

        <button
          onClick={() => window.print()}
          className="flex items-center gap-1 rounded-md bg-green-600 px-3 py-1 text-xs font-medium text-white"
        >
          <Printer size={12} />
          Print
        </button>
          </div>
      </div>

      {/* ===== PRODUCT TABLE (PREFILLED) ===== */}
      <InvoiceTable products={products} setProducts={setProducts} />

      {/* ===== SUMMARY ===== */}
      <InvoiceSummary
        metrics={[
          {
            label: "Total Qty",
            value: totals.totalQty,
            icon: <Package size={18} />,
            bg: "bg-blue-50 text-blue-700",
          },
        ]}
        payment={{
          label: "Payment",
          value: amountPaid,
          onChange: setAmountPaid,
          balance: Math.max(amountPaid - totals.grand, 0),
          balanceLabel: "Return",
        }}
        summary={[
          { label: "Subtotal", value: totals.sub },
          { label: "Tax", value: totals.tax },
          { label: "Grand Total", value: totals.grand, bold: true },
        ]}
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
