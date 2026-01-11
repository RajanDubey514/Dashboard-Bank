// import { Package, Wallet, Receipt } from "lucide-react";

// export default function InvoiceSummary({
//   metrics = [],
//   payment,
//   summary = [],
// }) {
//   return (
//     <div className="flex flex-wrap justify-between gap-3">

//       {/* LEFT METRICS (Qty, Items, etc.) */}
//       {metrics.map((m, i) => (
//         <div
//           key={i}
//           className={`rounded-md shadow px-4 py-2 flex items-center gap-3 ${m.bg}`}
//         >
//           {m.icon}
//           <div>
//             <p className="text-xs">{m.label}</p>
//             <p className="text-lg font-bold">{m.value}</p>
//           </div>
//         </div>
//       ))}

//       {/* PAYMENT SECTION (Optional) */}
//       {payment && (
//         <div className="bg-orange-50 text-orange-700 rounded-xl shadow px-4 py-2 flex items-center gap-3">
//           <Wallet size={18} />
//           <div>
//             <p className="text-xs">{payment.label || "Payment"}</p>
//             <input
//               type="number"
//               className="border rounded px-2 py-0.5 w-24 text-xs mt-1"
//               value={payment.value}
//               onChange={(e) => payment.onChange(e.target.value)}
//             />
//             <p className="text-xs mt-1">
//               {payment.balanceLabel || "Balance"}:{" "}
//               <b>{payment.balance.toFixed(2)}</b>
//             </p>
//           </div>
//         </div>
//       )}

//       {/* SUMMARY BOX */}
//       <div className="bg-purple-50 text-purple-700 rounded-xl shadow px-3 py-2 min-w-[220px]">
//         <div className="flex items-center gap-2 mb-1">
//           <Receipt size={18} />
//           <p className="font-semibold text-sm">Summary</p>
//         </div>

//         <div className="text-xs space-y-1">
//           {summary.map((s, i) => (
//             <div
//               key={i}
//               className={`flex justify-between ${
//                 s.bold ? "font-bold text-sm" : ""
//               }`}
//             >
//               <span>{s.label}</span>
//               <span>{Number(s.value).toFixed(2)}</span>
//             </div>
//           ))}
//         </div>
//       </div>

//     </div>
//   );
// }


import { Wallet, Receipt } from "lucide-react";

export default function InvoiceSummary({
  metrics = [],
  payment,
  summary = [],
}) {
  return (
    <div className="w-full flex items-center justify-between gap-3 bg-white  rounded-md px-2 py-1 text-sm">

      {/* METRICS */}
      <div className="flex items-center gap-4">
        {metrics.map((m, i) => (
          <div key={i} className="flex items-center gap-2">
            {m.icon}
            <div className="leading-tight">
              <p className="text-[11px] text-gray-500">{m.label}</p>
              <p className="font-semibold">{m.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* PAYMENT */}
      {payment && (
        <div className="flex items-center gap-2 border-l pl-3">
          <Wallet size={16} className="text-orange-600" />
          <div className="leading-tight">
            <p className="text-[11px] text-gray-500">
              {payment.label || "Payment"}
            </p>
            <input
              type="number"
              className="border rounded px-2 py-0.5 w-24 text-xs"
              value={payment.value}
              onChange={(e) => payment.onChange(e.target.value)}
            />
            <p className="text-[11px] text-gray-500">
              {payment.balanceLabel || "Balance"}:{" "}
              <b>{payment.balance.toFixed(2)}</b>
            </p>
          </div>
        </div>
      )}

      {/* SUMMARY */}
      <div className="flex items-center gap-3 border-l pl-3">
        <Receipt size={16} className="text-purple-600" />
        <div className="space-y-0.5">
          {summary.map((s, i) => (
            <div
              key={i}
              className={`flex justify-between gap-6 ${
                s.bold
                  ? "font-bold text-base text-purple-700"
                  : "text-gray-600 text-xs"
              }`}
            >
              <span>{s.label}</span>
              <span>{Number(s.value).toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
