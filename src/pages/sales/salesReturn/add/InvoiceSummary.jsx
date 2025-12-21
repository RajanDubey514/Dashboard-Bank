import { Package, Wallet, Receipt } from "lucide-react";

export default function InvoiceSummary({
  totalQty,
  amountPaid,
  setAmountPaid,
  sub,
  tax,
  grand,
}) {
  return (
    <div className="flex flex-wrap justify-between gap-3 ">

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
            <b>
              {(Number(amountPaid || 0) - grand).toFixed(2)}
            </b>
          </p>
        </div>
      </div>

      {/* BILL SUMMARY */}
      <div className="bg-purple-50 text-purple-700 rounded-xl shadow px-2 py-1 min-w-[220px]">
        <div className="flex items-center gap-2 mb-1">
          <Receipt size={18} />
          <p className="font-semibold text-sm">
            Bill Summary
          </p>
        </div>

        <div className="text-xs space-y-1">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>{sub.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax</span>
            <span>{tax.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold text-sm">
            <span>Grand Total</span>
            <span>{grand.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
