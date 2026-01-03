import { useState } from "react";
import { Plus, Printer } from "lucide-react";

import UpdateInvoiceDetails from "./UpdateInvoiceDetails";
import UpdateInvoiceTable from "./UpdateInvoiceTable";
import UpdateProductModal from "../add/AddProductModal";

// 🔹 Product Master (ONLY required fields)
const productsDB = [
  { itemCode: "P001", productName: "Laptop", uom: "Nos" },
  { itemCode: "P002", productName: "Mouse", uom: "Nos" },
  { itemCode: "P003", productName: "Keyboard", uom: "Nos" },
  { itemCode: "P004", productName: "Monitor", uom: "Nos" },
  { itemCode: "P005", productName: "Printer", uom: "Nos" },
];

export default function UpdateInvoice({
  upinvoiceData,
  setUpInvoiceData,
  upproducts,
  setUpProducts,
}) {
  const [openModal, setOpenModal] = useState(false);

  // ================= ADD PRODUCT =================
  const addProduct = (product) => {
    setUpProducts((prev) => {
      const exists = prev.find(
        (p) => p.itemCode === product.itemCode
      );
      if (exists) return prev;

      return [
        ...prev,
        {
          itemCode: product.itemCode,
          productName: product.productName,
          uom: product.uom,
          orderQty: 1,
          productionLine: "",
          requiredDate: "",
        },
      ];
    });
  };

  return (
    <div className="h-full flex flex-col gap-3 p-1">
      {/* ===== SO / CUSTOMER DETAILS ===== */}
      <UpdateInvoiceDetails
        value={upinvoiceData}
        onChange={setUpInvoiceData}
      />

      {/* ===== ACTION BAR ===== */}
      <div className="flex justify-end gap-2">
        <button
          className="flex items-center gap-1 rounded-md bg-blue-600
                     px-3 py-1 text-xs font-medium text-white hover:bg-blue-700"
          onClick={() => setOpenModal(true)}
        >
          <Plus size={12} />
          Add Item
        </button>

        <button
          className="flex items-center gap-1 rounded-md bg-green-600
                     px-3 py-1 text-xs font-medium text-white hover:bg-green-700"
          onClick={() => window.print()}
        >
          <Printer size={12} />
          Print
        </button>
      </div>

      {/* ===== PRODUCT TABLE ===== */}
      <UpdateInvoiceTable
        products={upproducts}
        setProducts={setUpProducts}
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
