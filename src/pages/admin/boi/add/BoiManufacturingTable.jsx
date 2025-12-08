// import React from "react";

// export default function BoiManufacturingTable({ rows, setRows }) {
//   const addRow = () => {
//     setRows((prev) => [
//       ...prev,
//       {
//         id: Date.now(),
//         itemName: "",
//         itemCode: "",
//         unit: "",
//         qty: "",
//         rate: "",
//         amount: "",
//       },
//     ]);
//   };

//   const updateRow = (id, field, value) => {
//     setRows((prev) =>
//       prev.map((row) =>
//         row.id === id
//           ? {
//               ...row,
//               [field]: value,
//               amount:
//                 (field === "qty" ? value : row.qty) *
//                 (field === "rate" ? value : row.rate) || "",
//             }
//           : row
//       )
//     );
//   };

//   return (
//     <fieldset className="border p-4 rounded-lg">
//       <legend className=" font-semibold px-2 text-xs">
//         Manufacturing Item
//       </legend>

//       <table className="w-full border mt-3 text-xs">
//         <thead className="bg-gray-100 text-xs">
//           <tr>
//             <th className="p-2 border">Item Name</th>
//             <th className="p-2 border">Code</th>
//             <th className="p-2 border">Unit</th>
//             <th className="p-2 border">Qty</th>
//             <th className="p-2 border">Rate</th>
//             <th className="p-2 border">Amount</th>
//           </tr>
//         </thead>

//         <tbody>
//           {rows.map((row) => (
//             <tr key={row.id} className="text-xs">
//               <td className="p-2 border">
//                 <input
//                   className="w-full border rounded px-2 py-1"
//                   value={row.itemName}
//                   onChange={(e) =>
//                     updateRow(row.id, "itemName", e.target.value)
//                   }
//                 />
//               </td>

//               <td className="p-2 border">
//                 <input
//                   className="w-full border rounded px-2 py-1"
//                   value={row.itemCode}
//                   onChange={(e) =>
//                     updateRow(row.id, "itemCode", e.target.value)
//                   }
//                 />
//               </td>

//               <td className="p-2 border">
//                 <input
//                   className="w-full border rounded px-2 py-1"
//                   value={row.unit}
//                   onChange={(e) =>
//                     updateRow(row.id, "unit", e.target.value)
//                   }
//                 />
//               </td>

//               <td className="p-2 border">
//                 <input
//                   type="number"
//                   className="w-full border rounded px-2 py-1"
//                   value={row.qty}
//                   onChange={(e) => updateRow(row.id, "qty", e.target.value)}
//                 />
//               </td>

//               <td className="p-2 border">
//                 <input
//                   type="number"
//                   className="w-full border rounded px-2 py-1"
//                   value={row.rate}
//                   onChange={(e) => updateRow(row.id, "rate", e.target.value)}
//                 />
//               </td>

//               <td className="p-2 border">{row.amount}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       <button
//         className="mt-3 text-xs bg-blue-600 text-white px-4 py-2 rounded"
//         onClick={addRow}
//       >
//         Add Row
//       </button>
//     </fieldset>
//   );
// }


import React from "react";

export default function BoiManufacturingTable({ rows, setRows }) {
  const addRow = () => {
    setRows((prev) => [
      ...prev,
      {
        id: Date.now(),
        itemName: "",
        itemCode: "",
        unit: "",
        qty: "",
        rate: "",
        amount: "",
      },
    ]);
  };

  const updateRow = (id, field, value) => {
    setRows((prev) =>
      prev.map((row) => {
        if (row.id !== id) return row;

        const newQty = field === "qty" ? Number(value) : Number(row.qty);
        const newRate = field === "rate" ? Number(value) : Number(row.rate);

        return {
          ...row,
          [field]: value,
          amount: newQty && newRate ? newQty * newRate : "",
        };
      })
    );
  };

  return (
    <fieldset className="border p-4 rounded-lg">
      <legend className="font-semibold px-2 text-xs">Manufacturing Item</legend>

      <table className="w-full border mt-3 text-xs">
        <thead className="bg-gray-100 text-xs">
          <tr>
            <th className="p-2 border">Item Name</th>
            <th className="p-2 border">Code</th>
            <th className="p-2 border">Unit</th>
            <th className="p-2 border">Qty</th>
            <th className="p-2 border">Rate</th>
            <th className="p-2 border">Amount</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((row) => (
            <tr key={row.id} className="text-xs">
              <td className="p-2 border">
                <input
                  className="w-full border rounded px-2 py-1"
                  value={row.itemName}
                  onChange={(e) =>
                    updateRow(row.id, "itemName", e.target.value)
                  }
                />
              </td>

              <td className="p-2 border">
                <input
                  className="w-full border rounded px-2 py-1"
                  value={row.itemCode}
                  onChange={(e) =>
                    updateRow(row.id, "itemCode", e.target.value)
                  }
                />
              </td>

              <td className="p-2 border">
                <input
                  className="w-full border rounded px-2 py-1"
                  value={row.unit}
                  onChange={(e) =>
                    updateRow(row.id, "unit", e.target.value)
                  }
                />
              </td>

              <td className="p-2 border">
                <input
                  type="number"
                  className="w-full border rounded px-2 py-1"
                  value={row.qty}
                  onChange={(e) => updateRow(row.id, "qty", e.target.value)}
                />
              </td>

              <td className="p-2 border">
                <input
                  type="number"
                  className="w-full border rounded px-2 py-1"
                  value={row.rate}
                  onChange={(e) => updateRow(row.id, "rate", e.target.value)}
                />
              </td>

              <td className="p-2 border">{row.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button
        className="mt-3 text-xs bg-blue-600 text-white px-4 py-2 rounded"
        onClick={addRow}
      >
        Add Row
      </button>
    </fieldset>
  );
}
