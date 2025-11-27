import React, { useState } from "react";
import { UserCircle, Building2, PackageSearch, Activity } from "lucide-react";
import CustomerBasic from "./show-Customer/customerBasic/CustomerBasic";
import BranchsDetail from "./show-Customer/branchsDetail/BranchsDetail";
import IntrestedProduct from "./show-Customer/intrestedProduct/IntrestedProduct";
import FollowUpActivity from "./show-Customer/followUpActivity/FollowUpActivity";
import Tooltip from "../../../components/tooltip/Tooltip";

// ✅ Map tabs to components
const componentsMap = {
  Customer_Basic_info: CustomerBasic,
  "Branch(S)_Detail": BranchsDetail,
  "Intrested_Product(S)": IntrestedProduct,
  Follow_Up_Activity: FollowUpActivity,
};

// ✅ Icons for each tab
const tabIcons = {
  Customer_Basic_info: <UserCircle size={13} />,
  "Branch(S)_Detail": <Building2 size={13} />,
  "Intrested_Product(S)": <PackageSearch size={13} />,
  Follow_Up_Activity: <Activity size={13} />,
};

const CustomerUrl = () => {
  const [activeTab, setActiveTab] = useState("Customer_Basic_info");

  // ✅ Format readable tab labels
  const formatKey = (key) =>
    key.replace(/_/g, " ").replace(/\b([a-z])/g, (c) => c.toUpperCase());

  const ActiveComponent = componentsMap[activeTab];

  return (
    <div className="space-y-4 h-full w-full overflow-hidden transition-colors duration-300">
      {/* ✅ Tabs Navigation */}
      <div
        className="flex flex-wrap justify-start gap-2 p-1 rounded-lg "
        style={{
          backgroundColor: "var(--color-surface)",
          // borderColor: "var(--color-primary)",
        }}
      >
        {Object.keys(componentsMap).map((key) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className="flex items-center gap-2 px-4 py-1 rounded-lg text-[13px] font-semibold transition-all duration-300 ease-in-out"
            style={{
              backgroundColor:
                activeTab === key
                  ? "var(--color-primary)"
                  : "var(--color-surface)",
              color:
                activeTab === key
                  ? "#fff"
                  : "var(--color-text)",
              boxShadow:
                activeTab === key
                  ? "0 2px 6px rgba(0,0,0,0.2)"
                  : "0 1px 3px rgba(0,0,0,0.05)",
              transform: activeTab === key ? "scale(1.05)" : "scale(1)",
            }}
            onMouseEnter={(e) => {
              if (activeTab !== key) {
                e.currentTarget.style.backgroundColor =
                  "var(--color-primary-hover)";
                e.currentTarget.style.color = "#fff";
              }
            }}
            onMouseLeave={(e) => {
              if (activeTab !== key) {
                e.currentTarget.style.backgroundColor =
                  "var(--color-surface)";
                e.currentTarget.style.color = "var(--color-text)";
              }
            }}
          >
            {tabIcons[key]}
            <Tooltip text={formatKey(key)}>
              <span className="hidden sm:inline">{formatKey(key)}</span>
            </Tooltip>
          </button>
        ))}
      </div>

      {/* ✅ Active Tab Content */}
      <div
        className="rounded-lg shadow-sm overflow-y-auto overflow-x-hidden scrollbar-hide transition-all duration-300 ease-in-out"
        style={{
          backgroundColor: "var(--color-bg)",
          color: "var(--color-text)",
        }}
      >
        {ActiveComponent ? <ActiveComponent /> : null}
      </div>
    </div>
  );
};

export default CustomerUrl;
