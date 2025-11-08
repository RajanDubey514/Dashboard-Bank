import React, { useState } from "react";
import { UserCircle, Building2, PackageSearch, Activity } from "lucide-react";
import CustomerBasic from "./show-Customer/customerBasic/CustomerBasic";
import BranchsDetail from "./show-Customer/branchsDetail/BranchsDetail";
import IntrestedProduct from "./show-Customer/intrestedProduct/IntrestedProduct";
import FollowUpActivity from "./show-Customer/followUpActivity/FollowUpActivity";
import Tooltip from "../../components/tooltip/Tooltip";

// ✅ Map tabs to components
const componentsMap = {
  Customer_Basic_info: CustomerBasic,
  "Branch(S)_Detail": BranchsDetail,
  "Intrested_Product(S)": IntrestedProduct,
  Follow_Up_Activity: FollowUpActivity,
};

// ✅ Optional icons for visual enhancement
const tabIcons = {
  Customer_Basic_info: <UserCircle size={16} />,
  "Branch(S)_Detail": <Building2 size={16} />,
  "Intrested_Product(S)": <PackageSearch size={16} />,
  Follow_Up_Activity: <Activity size={16} />,
};

const CustomerUrl = () => {
  const [activeTab, setActiveTab] = useState("Customer_Basic_info");

  // ✅ Format key names to readable text
  const formatKey = (key) => {
    const formatted = key.replace(/_/g, " ").trim();
    return formatted.replace(/\b([a-z])/g, (char) => char.toUpperCase());
  };

  const ActiveComponent = componentsMap[activeTab];

  return (
    <div className=" space-y-4 h-full w-full overflow-hidden">
      {/* ✅ Tabs Navigation */}
      <div className="flex flex-wrap justify-start gap-2 bg-gray-100 p-1 rounded-lg shadow-sm ">
        {Object.keys(componentsMap).map((key) => (
         
          <button
            onClick={() => setActiveTab(key)}
            className={`flex items-center gap-2 px-4 py-1 rounded-lg text-[13px] font-semibold transition-all duration-300 ease-in-out
              ${
                activeTab === key
                  ? "bg-blue-600 text-white shadow-md scale-105"
                  : "bg-gray-200 text-gray-800 hover:bg-blue-500 hover:text-white hover:shadow-md hover:scale-105"
              }`}
          >
            {tabIcons[key]}
             <Tooltip key={key} text={formatKey(key)}>
               <span className="hidden sm:inline">{formatKey(key)}</span>
             </Tooltip>
          </button>
        ))}
      </div>

      {/* ✅ Active Tab Content */}
      <div className="rounded-lg bg-white shadow-sm  overflow-y-auto overflow-x-hidden scrollbar-hide transition-all duration-300 ease-in-out">
        {ActiveComponent ? <ActiveComponent /> : null}
      </div>
    </div>
  );
};

export default CustomerUrl;
