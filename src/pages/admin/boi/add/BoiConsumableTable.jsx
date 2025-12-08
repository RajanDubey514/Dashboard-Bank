// import React from "react";
// import Select from "react-select";
// export default function BoiConsumableTable({ rows, setRows, materialList , fakeConsumableMaterialList}) {
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

//   const selectMaterial = (id, mat) => {
//     setRows((prev) =>
//       prev.map((r) =>
//         r.id === id
//           ? { ...r, itemName: mat.name, itemCode: mat.code, unit: mat.unit }
//           : r
//       )
//     );
//   };

//   return (
//     <fieldset className="border p-4 rounded-lg">
//       <legend className=" font-semibold px-2 text-xs">
//         Consumable Material
//       </legend>

//       <table className="w-full border mt-3">
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
//               <td className="p-2 border w-60">
//                 <Select
//                   options={fakeConsumableMaterialList}
//                   getOptionLabel={(m) => m.name}
//                   getOptionValue={(m) => m.id}
//                   onChange={(m) => selectMaterial(row.id, m)}
//                 />
//               </td>

//               <td className="p-2 border">{row.itemCode}</td>
//               <td className="p-2 border">{row.unit}</td>

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
import Select from "react-select";

export default function BoiConsumableTable({
  rows,
  setRows,
  fakeConsumableMaterialList,
}) {
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

  const selectMaterial = (id, mat) => {
    setRows((prev) =>
      prev.map((r) =>
        r.id === id
          ? {
              ...r,
              itemName: mat.name,
              itemCode: mat.code,
              unit: mat.unit,
              rate: mat.rate, // Auto fill rate
              amount: r.qty ? r.qty * mat.rate : "",
            }
          : r
      )
    );
  };

  return (
    <fieldset className="border p-4 rounded-lg">
      <legend className="font-semibold px-2 text-xs">
        Consumable Material
      </legend>

      <table className="w-full border mt-3">
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
              <td className="p-2 border w-60">
                <Select
                  value={
                    row.itemName
                      ? fakeConsumableMaterialList.find(
                          (m) => m.name === row.itemName
                        )
                      : null
                  }
                  options={fakeConsumableMaterialList}
                  getOptionLabel={(m) => m.name}
                  getOptionValue={(m) => m.id}
                  onChange={(m) => selectMaterial(row.id, m)}
                />
              </td>

              <td className="p-2 border">{row.itemCode}</td>
              <td className="p-2 border">{row.unit}</td>

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
