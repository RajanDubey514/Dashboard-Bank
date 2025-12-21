import { Package, Wallet, Receipt } from "lucide-react";
import { useEffect } from "react";

export default function UpdateInvoiceSummary({
  totalQty = 0,
  amountPaid,
  setAmountPaid,
  sub = 0,
  tax = 0,
  grand = 0,
  initialAmountPaid = "", // Prefill for update
}) {
  // Prefill amountPaid on UPDATE
  useEffect(() => {
    if (initialAmountPaid !== "" && amountPaid === "") {
      setAmountPaid(initialAmountPaid);
    }
  }, [initialAmountPaid, amountPaid, setAmountPaid]);

  const safeToFixed = (num) => (Number(num) || 0).toFixed(2);

  return (
    <div className="flex flex-wrap justify-between gap-3">

      {/* TOTAL QTY */}
      <div className="bg-blue-50 text-blue-700 rounded-md shadow px-4 py-2 flex items-center gap-3">
        <Package size={18} />
        <div>
          <p className="text-xs">Total Qty</p>
          <p className="text-lg font-bold">{totalQty}</p>
        </div>
      </div>

      {/* PAYMENT */}
      <div className="bg-orange-50 text-orange-700 rounded-xl shadow px-4 py-2 flex items-center gap-3">
        <Wallet size={18} />
        <div>
          <p className="text-xs">Payment</p>
          <input
            className="border rounded px-2 py-0.5 w-24 text-xs mt-1"
            placeholder="Paid"
            value={amountPaid}
            onChange={(e) => setAmountPaid(e.target.value)}
          />
          <p className="text-xs mt-1">
            Return:{" "}
            <b>{safeToFixed(Number(amountPaid || 0) - Number(grand || 0))}</b>
          </p>
        </div>
      </div>

      {/* BILL SUMMARY */}
      <div className="bg-purple-50 text-purple-700 rounded-xl shadow px-2 py-1 min-w-[220px]">
        <div className="flex items-center gap-2 mb-1">
          <Receipt size={18} />
          <p className="font-semibold text-sm">Bill Summary</p>
        </div>

        <div className="text-xs space-y-1">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>{safeToFixed(sub)}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax</span>
            <span>{safeToFixed(tax)}</span>
          </div>
          <div className="flex justify-between font-bold text-sm">
            <span>Grand Total</span>
            <span>{safeToFixed(grand)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
