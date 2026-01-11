import { useMemo, useState } from "react";
import { Plus, Minus, Trash2 } from "lucide-react";
import AddProductModal from "./AddProductModal";

/* -------- PRODUCT MASTER -------- */
const productsDB = [
  { itemCode: "P001", name: "Laptop", rate: 50000 },
  { itemCode: "P002", name: "Mouse", rate: 500 },
  { itemCode: "P003", name: "Keyboard", rate: 1500 },
];

export default function AddInvoice({ invoiceData, setInvoiceData }) {
  const [products, setProducts] = useState(invoiceData.products || []);
  const [openModal, setOpenModal] = useState(false);

  /* -------- TOTAL -------- */
  const totalAmount = useMemo(() => {
    return products.reduce((sum, p) => sum + p.qty * p.rate, 0);
  }, [products]);

  /* -------- ADD PRODUCT -------- */
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

  /* -------- QTY CHANGE -------- */
  const changeQty = (index, diff) => {
    setProducts((prev) =>
      prev
        .map((p, i) => (i === index ? { ...p, qty: p.qty + diff } : p))
        .filter((p) => p.qty > 0)
    );
  };

  /* -------- REMOVE -------- */
  const removeProduct = (index) => {
    setProducts((prev) => prev.filter((_, i) => i !== index));
  };

  /* -------- SYNC TO PARENT -------- */
  useMemo(() => {
    setInvoiceData((prev) => ({ ...prev, products }));
  }, [products]);

  return (
    <div className="p-2 bg-white rounded-md space-y-4">
      {/* HEADER FORM */}
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

      {/* ADD PRODUCT BUTTON */}
      <div className="flex justify-end">
        <button
          onClick={() => setOpenModal(true)}
          className="flex items-center gap-1 px-2 py-1 bg-blue-600 text-white text-xs rounded-md hover:bg-blue-700"
        >
          <Plus size={12} />
          Add Product
        </button>
      </div>

      {/* PRODUCTS TABLE */}

      <div className="max-h-[120px] overflow-y-auto border border-blue-300 rounded">
  <table className="w-full border-collapse text-sm">
    <thead className="bg-[var(--color-primary)]">
      <tr>
        <th className="sticky top-0  border px-2 py-1">
          Item
        </th>
        <th className="sticky top-0  border px-2 py-1">
          Rate
        </th>
        <th className="sticky top-0  border px-2 py-1">
          Qty
        </th>
        <th className="sticky top-0  border px-2 py-1">
          Amount
        </th>
        <th className="sticky top-0  border px-2 py-1">
          Action
        </th>
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

            <td className="border px-2 py-1">
              ₹ {p.qty * p.rate}
            </td>

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
</div>

      {/* TOTAL */}
      <div className="flex justify-end text-lg font-semibold">
        Total: ₹ {totalAmount}
      </div>

      {/* MODAL */}
      <AddProductModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        productsDB={productsDB}
        onAdd={addProduct}
      />
    </div>
  );
}

/* INPUT COMPONENT */
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
