import React, { useState } from "react";
import { UserCircle, Building2, PackageSearch, Activity } from "lucide-react";
import Tooltip from "../../../components/tooltip/Tooltip";
import ShowProduct from "./show/showProduct/ShowProduct";
import MainGroup from "./show/showMainGroup/MainGroup";
import SubGroup from "./show/showSubGroup/SubGroup";
import ShowTypeProduct from "./show/showProductType/ShowTypeProduct";
import ShowAssemblyType from "./show/showAssemblyType/ShowAssemblyType";
import ShowUnitMaster from "./show/showUnitMaster/ShowUnitMaster";

// ✅ Map tabs to components
const componentsMap = {
  Product: ShowProduct,
  Main_Group : MainGroup,
  Sub_Group : SubGroup,
  Product_Type : ShowTypeProduct,
  Assembly_Type : ShowAssemblyType,
  Unit_Master : ShowUnitMaster
};

// ✅ Icons for each tab
const tabIcons = {
  Product: <UserCircle size={13} />,
  "Main_Group": <Building2 size={13} />,
  "Sub_Group": <PackageSearch size={13} />,
  Product_Type: <Activity size={13} />,
  "Assembly_Type": <Building2 size={13} />,
  "Unit_Master": <PackageSearch size={13} />,
};

const ProductUrl = () => {
  const [activeTab, setActiveTab] = useState("Product");

  // ✅ Format readable tab labels
  const formatKey = (key) =>
    key.replace(/_/g, " ").replace(/\b([a-z])/g, (c) => c.toUpperCase());

  const ActiveComponent = componentsMap[activeTab];

  return (
    <div className="space-y-4 h-full w-full overflow-hidden transition-colors duration-300">
      {/* ✅ Tabs Navigation */}
      <div
        className="flex flex-wrap justify-start gap-2 rounded-lg "
        style={{
          backgroundColor: "var(--color-surface)",
          // borderColor: "var(--color-primary)",
        }}
      >
        {Object.keys(componentsMap).map((key) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className="flex items-center gap-2 px-2 py-1 rounded-lg text-[12px] font-semibold transition-all duration-300 ease-in-out"
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

export default ProductUrl;
