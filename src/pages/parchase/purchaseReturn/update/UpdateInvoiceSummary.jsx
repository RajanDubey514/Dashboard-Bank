// import { Package, Wallet, Receipt } from "lucide-react";
// import { useEffect } from "react";

// export default function UpdateInvoiceSummary({
//   products = [],         // Array of return items
//   amountPaid,
//   setAmountPaid,
//   initialAmountPaid = "", // Prefill for update
// }) {
//   // Prefill amountPaid on UPDATE
//   useEffect(() => {
//     if (initialAmountPaid !== "" && amountPaid === "") {
//       setAmountPaid(initialAmountPaid);
//     }
//   }, [initialAmountPaid, amountPaid, setAmountPaid]);

//   const totalQty = products.reduce((sum, p) => sum + (p.returnQty || 0), 0);
//   const totalAmount = products.reduce(
//     (sum, p) => sum + (p.returnQty || 0) * (p.rate || 0),
//     0
//   );

//   const safeToFixed = (num) => (Number(num) || 0).toFixed(2);

//   return (
//     <div className="flex flex-wrap justify-between gap-3">

//       {/* TOTAL QTY */}
//       <div className="bg-blue-50 text-blue-700 rounded-md shadow px-4 py-2 flex items-center gap-3">
//         <Package size={18} />
//         <div>
//           <p className="text-xs">Total Qty</p>
//           <p className="text-lg font-bold">{totalQty}</p>
//         </div>
//       </div>

//       {/* PAYMENT */}
//       <div className="bg-orange-50 text-orange-700 rounded-xl shadow px-4 py-2 flex items-center gap-3">
//         <Wallet size={18} />
//         <div>
//           <p className="text-xs">Payment</p>
//           <input
//             type="number"
//             className="border rounded px-2 py-0.5 w-24 text-xs mt-1"
//             placeholder="Paid"
//             value={amountPaid}
//             onChange={(e) => setAmountPaid(e.target.value)}
//           />
//           <p className="text-xs mt-1">
//             Return:{" "}
//             <b>{safeToFixed(Number(amountPaid || 0) - totalAmount)}</b>
//           </p>
//         </div>
//       </div>

//       {/* BILL SUMMARY */}
//       <div className="bg-purple-50 text-purple-700 rounded-xl shadow px-2 py-1 min-w-[220px]">
//         <div className="flex items-center gap-2 mb-1">
//           <Receipt size={18} />
//           <p className="font-semibold text-sm">Bill Summary</p>
//         </div>

//         <div className="text-xs space-y-1">
//           <div className="flex justify-between">
//             <span>Subtotal</span>
//             <span>{safeToFixed(totalAmount)}</span>
//           </div>
//           <div className="flex justify-between font-bold text-sm">
//             <span>Grand Total</span>
//             <span>{safeToFixed(totalAmount)}</span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }


import { Package, Wallet, Receipt } from "lucide-react";
import { useEffect } from "react";

export default function UpdateInvoiceSummary({
  products = [],
  amountPaid,
  setAmountPaid,
  initialAmountPaid = "",
}) {
  // Prefill amountPaid on UPDATE
  useEffect(() => {
    if (initialAmountPaid !== "" && amountPaid === "") {
      setAmountPaid(initialAmountPaid);
    }
  }, [initialAmountPaid, amountPaid, setAmountPaid]);

  const totalQty = products.reduce(
    (sum, p) => sum + (Number(p.returnQty) || 0),
    0
  );

  const subtotal = products.reduce(
    (sum, p) =>
      sum + (Number(p.returnQty) || 0) * (Number(p.rate) || 0),
    0
  );

  const paid = Number(amountPaid) || 0;
  const balance = paid - subtotal;

  return (
    <div className="w-full flex items-center justify-between gap-3 bg-white rounded-md px-2 py-1 text-sm">

      {/* TOTAL QTY */}
      <div className="flex items-center gap-2">
        <Package size={16} className="text-blue-600" />
        <div className="leading-tight">
          <p className="text-[11px] text-gray-500">Total Qty</p>
          <p className="font-semibold">{totalQty}</p>
        </div>
      </div>

      {/* PAYMENT */}
      <div className="flex items-center gap-2 border-l pl-3">
        <Wallet size={16} className="text-orange-600" />
        <div className="leading-tight">
          <p className="text-[11px] text-gray-500">Payment</p>
          <input
            type="number"
            className="border rounded px-2 py-0.5 w-24 text-xs"
            value={paid}
            onChange={(e) => setAmountPaid(e.target.value)}
          />
          <p className="text-[11px] text-gray-500">
            Return:{" "}
            <b className={balance < 0 ? "text-red-600" : ""}>
              {balance.toFixed(2)}
            </b>
          </p>
        </div>
      </div>

      {/* SUMMARY */}
      <div className="flex items-center gap-3 border-l pl-3">
        <Receipt size={16} className="text-purple-600" />
        <div className="space-y-0.5">
          <div className="flex justify-between gap-6 text-xs text-gray-600">
            <span>Subtotal</span>
            <span>{subtotal.toFixed(2)}</span>
          </div>

          <div className="flex justify-between gap-6 font-bold text-sm text-purple-700">
            <span>Grand Total</span>
            <span>{subtotal.toFixed(2)}</span>
          </div>
        </div>
      </div>

    </div>
  );
}
