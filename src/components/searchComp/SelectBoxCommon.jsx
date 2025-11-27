import React from "react";
import FilterCardsCommon from "./FilterCardsCommon";
import { Layers, PlusCircle, Clock, CheckCircle } from "lucide-react";

export default function SelectBoxCommon({ value, onChange, dataList = [] }) {
  console.log(value)
  console.log(dataList)
  // Dynamic counts
  const filterOptions = [
    {
      label: "All",
      value: "all",
      count: dataList.length,
      icon: <Layers size={20} className="text-blue-600" />,
    },
    {
      label: "New Today",
      value: "today",
      count: dataList.filter((d) => d.isNew).length,
      icon: <PlusCircle size={20} className="text-purple-600" />,
    },
    {
      label: "Active",
      value: "active",
      count: dataList.filter((d) => d.active === "active").length,
      icon: <CheckCircle size={20} className="text-green-600" />,
    },
    {
      label: "Inactive",
      value: "inactive",
      count: dataList.filter((d) => d.status === "Inactive").length,
      icon: <Clock size={20} className="text-orange-500" />,
    },
  ];

  return (
    <div className="p-2">
      <FilterCardsCommon value={value} onChange={onChange} options={filterOptions} />

      {/* <div className="mt-5 p-1 bg-gray-100 rounded-lg">
        <strong>Selected Filter: </strong> {filter}
      </div> */}
    </div>
  );
}
