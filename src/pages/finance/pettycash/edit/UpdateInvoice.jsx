import { useState, useEffect, useMemo } from "react";
import { Plus, Minus, Trash2 } from "lucide-react";
import UpdateProductModal from "./UpdateProductTable";

/* -------- PRODUCT MASTER -------- */
const productsDB = [
  { itemCode: "P001", name: "Laptop", rate: 50000 },
  { itemCode: "P002", name: "Mouse", rate: 500 },
  { itemCode: "P003", name: "Keyboard", rate: 1500 },
];

export default function UpdateInvoice({ initialInvoice, onUpdate }) {
  console.log(initialInvoice)
  const [invoiceData, setInvoiceData] = useState({
    entryNo: "",
    date: "",
  });
  const [products, setProducts] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  /* ==============================
     PREFILL DATA
  ============================== */
  useEffect(() => {
    if (initialInvoice) {
      setInvoiceData({
        entryNo: initialInvoice.entryNo || "",
        date: initialInvoice.date || "",
      });
      setProducts(initialInvoice.products || []);
    }
  }, [initialInvoice]);

  /* ==============================
     TOTAL AMOUNT
  ============================== */
  const totalAmount = useMemo(() => {
    return products.reduce((sum, p) => sum + p.qty * p.rate, 0);
  }, [products]);

  /* ==============================
     ADD PRODUCT
  ============================== */
  const addProduct = ({ product, qty }) => {
    setProducts((prev) => {
      const exist = prev.find((p) => p.itemCode === product.itemCode);
      if (exist) {
        return prev.map((p) =>
          p.itemCode === product.itemCode ? { ...p, qty: p.qty + qty } : p
        );
      }
      return [...prev, { ...product, qty }];
    });
  };

  /* ==============================
     CHANGE QTY
  ============================== */
  const changeQty = (index, diff) => {
    setProducts((prev) =>
      prev
        .map((p, i) => (i === index ? { ...p, qty: p.qty + diff } : p))
        .filter((p) => p.qty > 0)
    );
  };

  /* ==============================
     REMOVE PRODUCT
  ============================== */
  const removeProduct = (index) => {
    setProducts((prev) => prev.filter((_, i) => i !== index));
  };

  /* ==============================
     UPDATE ACTION
  ============================== */
  const handleUpdate = () => {
    onUpdate({
      ...initialInvoice,
      ...invoiceData,
      products,
      totalAmount,
    });
  };

  return (
    <div className="p-4 bg-white rounded-md space-y-4">

      {/* ===== HEADER FORM ===== */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Entry No"
          value={invoiceData.entryNo}
          onChange={(v) => setInvoiceData({ ...invoiceData, entryNo: v })}
        />
        <Input
          type="date"
          label="Date"
          value={invoiceData.date}
          onChange={(v) => setInvoiceData({ ...invoiceData, date: v })}
        />
      </div>

      {/* ===== ADD PRODUCT BUTTON ===== */}
      <div className="flex justify-end">
        <button
          onClick={() => setOpenModal(true)}
          className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700"
        >
          <Plus size={14} />
          Add Product
        </button>
      </div>

      {/* ===== PRODUCTS TABLE ===== */}
      <table className="w-full border border-gray-300 text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="border px-2 py-1">Item</th>
            <th className="border px-2 py-1">Rate</th>
            <th className="border px-2 py-1">Qty</th>
            <th className="border px-2 py-1">Amount</th>
            <th className="border px-2 py-1">Action</th>
          </tr>
        </thead>
        <tbody>
          {products.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center py-3 text-gray-400">
                No products added
              </td>
            </tr>
          ) : (
            products.map((p, i) => (
              <tr key={p.itemCode}>
                <td className="border px-2 py-1">{p.name}</td>
                <td className="border px-2 py-1">₹ {p.rate}</td>
                <td className="border px-2 py-1">
                  <div className="flex items-center justify-center gap-2">
                    <button onClick={() => changeQty(i, -1)}>
                      <Minus size={14} />
                    </button>
                    <span>{p.qty}</span>
                    <button onClick={() => changeQty(i, 1)}>
                      <Plus size={14} />
                    </button>
                  </div>
                </td>
                <td className="border px-2 py-1">₹ {p.qty * p.rate}</td>
                <td className="border px-2 py-1 text-center">
                  <button
                    onClick={() => removeProduct(i)}
                    className="text-red-600"
                  >
                    <Trash2 size={14} />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>

      {/* ===== TOTAL ===== */}
      <div className="flex justify-end text-lg font-semibold">
        Total: ₹ {totalAmount}
      </div>


      {/* ===== MODAL ===== */}
      <UpdateProductModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        productsDB={productsDB}
        onAdd={addProduct}
      />
    </div>
  );
}

/* -------- INPUT -------- */
const Input = ({ label, value, onChange, type = "text" }) => (
  <div>
    <label className="block text-sm font-semibold mb-1">{label}</label>
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full border rounded-md px-2 py-1 focus:ring-2 focus:ring-blue-500 outline-none"
    />
  </div>
);
