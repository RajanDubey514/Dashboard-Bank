import { Package, Wallet, Receipt } from "lucide-react";

export default function InvoiceSummary({
  totalQty = 0,
  amountPaid = 0,
  setAmountPaid,
  sub = 0,
  tax = 0,
  grand = 0,
}) {
  const paid = Number(amountPaid) || 0;
  const subtotal = Number(sub) || 0;
  const taxAmount = Number(tax) || 0;
  const grandTotal = Number(grand) || 0;

  const balance = paid - grandTotal;

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
            type="number"
            className="border rounded px-2 py-0.5 w-24 text-xs mt-1"
            placeholder="Paid"
            value={paid}
            onChange={(e) => setAmountPaid(e.target.value)}
          />
          <p className="text-xs mt-1">
            Return: <b>{balance.toFixed(2)}</b>
          </p>
        </div>
      </div>

      {/* BILL SUMMARY */}
      <div className="bg-purple-50 text-purple-700 rounded-xl shadow px-3 py-2 min-w-[220px]">
        <div className="flex items-center gap-2 mb-1">
          <Receipt size={18} />
          <p className="font-semibold text-sm">Bill Summary</p>
        </div>

        <div className="text-xs space-y-1">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>{subtotal.toFixed(2)}</span>
          </div>

          <div className="flex justify-between">
            <span>Tax</span>
            <span>{taxAmount.toFixed(2)}</span>
          </div>

          <div className="flex justify-between font-bold text-sm">
            <span>Grand Total</span>
            <span>{grandTotal.toFixed(2)}</span>
          </div>
        </div>
      </div>

    </div>
  );
}
