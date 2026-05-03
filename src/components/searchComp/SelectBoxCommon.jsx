import React from "react";
import FilterCardsCommon from "./FilterCardsCommon";
import { Layers, PlusCircle, Clock, CheckCircle } from "lucide-react";

export default function SelectBoxCommon({
  value,
  onChange,
  dataList = [],
  filterConfig = [],
}) {

  const filterOptions = filterConfig.map((f) => ({
    label: f.label,
    value: f.value,
    count: dataList.filter(f.filterFn).length,
  }));

  return (
    <div className="p-1">
      <FilterCardsCommon
        value={value}
        onChange={onChange}
        options={filterOptions}
      />
    </div>
  );
}
