import KpiCard from "./KpiCard";
import SectionCard from "./SectionCard";

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";

import {
  FileText,
  IndianRupee,
  Plus,
  Package,
  ArrowLeftRight,
  Sliders,
  Factory,
  Settings,
  Trash2,
} from "lucide-react";

import { useNavigate } from "react-router-dom";

/* ---------------- DATA ---------------- */

const kpis = [
  { title: "Total Sales", value: "₹ 1,25,000" },
  { title: "Total Purchase", value: "₹ 78,000" },
  { title: "Net Profit", value: "₹ 47,000" },
  { title: "Inventory Value", value: "₹ 3,40,000" },
  { title: "Work Orders", value: "12" },
];

const accountingChart = [
  { month: "Jan", income: 50, expense: 30 },
  { month: "Feb", income: 65, expense: 40 },
  { month: "Mar", income: 80, expense: 55 },
];

const stockChart = [
  { month: "Mar", stockIn: 20, stockOut: 15 },
  { month: "Apr", stockIn: 25, stockOut: 18 },
  { month: "May", stockIn: 30, stockOut: 22 },
];

const productionData = [
  { name: "Completed", value: 14 },
  { name: "In Progress", value: 8 },
  { name: "Delayed", value: 3 },
];

const PROD_COLORS = [
  "var(--color-success)",
  "var(--color-primary)",
  "var(--color-error)",
];

/* ---------------- COMPONENT ---------------- */

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="bg-[var(--color-bg)] p-2 space-y-4 transition-colors">
      {/* KPI SECTION */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {kpis.map((kpi, i) => (
          <KpiCard key={i} {...kpi} />
        ))}
      </div>

      {/* DASHBOARD GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* ACCOUNTING */}
        <SectionCard
          title="Accounting Overview"
          actions={
            <>
              <ActionBtn
                icon={<FileText size={14} />}
                label="Invoice"
                onClick={() => navigate("/sales?page=sales_order")}
              />
              <ActionBtn
                icon={<IndianRupee size={14} />}
                label="Payment"
                onClick={() => navigate("/finance?page=payment_voucher")}
              />
              <ActionBtn
                icon={<Plus size={14} />}
                label="Expense"
                onClick={() => navigate("/finance?page=petty_cash")}
              />
            </>
          }
        >
          <StatGrid
            data={[
              ["Income", "₹ 5,20,000"],
              ["Expenses", "₹ 3,10,000"],
              ["Receivables", "₹ 65,000"],
              ["Payables", "₹ 42,000"],
            ]}
          />

          <ChartBox>
            <BarChart data={accountingChart} barSize={22}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" fontSize={10} />
              <YAxis fontSize={10} />
              <Tooltip />
              <Bar
                dataKey="income"
                fill="var(--color-primary)"
                radius={[6, 6, 0, 0]}
              />
              <Bar
                dataKey="expense"
                fill="var(--color-error)"
                radius={[6, 6, 0, 0]}
              />
            </BarChart>
          </ChartBox>
        </SectionCard>

        {/* INVENTORY */}
        <SectionCard
          title="Inventory Management"
          actions={
            <>
              <ActionBtn icon={<Package size={14} />} label="Stock" />
              <ActionBtn icon={<ArrowLeftRight size={14} />} label="Transfer" />
              <ActionBtn icon={<Sliders size={14} />} label="Adjust" />
            </>
          }
        >
          <StatGrid
            data={[
              ["Raw", "3,200"],
              ["WIP", "1,450"],
              ["Finished", "5,100"],
              ["Low Stock", "6"],
            ]}
          />

          <ChartBox>
            <LineChart data={stockChart}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" fontSize={10} />
              <YAxis fontSize={10} />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="stockIn"
                stroke="var(--color-success)"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="stockOut"
                stroke="var(--color-error)"
                strokeWidth={2}
              />
            </LineChart>
          </ChartBox>
        </SectionCard>

        {/* PRODUCTION */}
        <SectionCard
          title="Production Status"
          actions={
            <>
              <ActionBtn
                icon={<Factory size={14} />}
                label="New Order"
                onClick={() => navigate("/admin?page=product")}
              />
              <ActionBtn
                icon={<Settings size={14} />}
                label="Assign"
              />
              <ActionBtn icon={<Trash2 size={14} />} label="Scrap" />
            </>
          }
        >
          <StatGrid
            data={[
              ["Orders", "25"],
              ["Progress", "8"],
              ["Completed", "14"],
              ["Delayed", "3"],
            ]}
          />

          <ChartBox>
            <PieChart>
              <Pie
                data={productionData}
                dataKey="value"
                innerRadius={45}
                outerRadius={70}
                paddingAngle={4}
              >
                {productionData.map((_, i) => (
                  <Cell key={i} fill={PROD_COLORS[i]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ChartBox>
        </SectionCard>
      </div>
    </div>
  );
}

/* ---------------- HELPERS ---------------- */

function StatGrid({ data }) {
  return (
    <div className="grid grid-cols-2 gap-3 mt-2">
      {data.map(([label, value], i) => (
        <div
          key={i}
          className="
            bg-white rounded-lg border border-gray-200
            px-3 py-2 shadow-sm
            transition-all duration-300
            hover:shadow-md hover:-translate-y-[1px]
          "
        >
          <span className="text-[11px] text-gray-500">
            {label}
          </span>
          <span className="text-sm font-semibold text-gray-800">
            {value}
          </span>
        </div>
      ))}
    </div>
  );
}

function ChartBox({ children }) {
  return (
    <div className="
      h-44 mt-3 rounded-lg
      transition-all duration-300
      hover:shadow-md
    ">
      <ResponsiveContainer width="100%" height="100%">
        {children}
      </ResponsiveContainer>
    </div>
  );
}

function ActionBtn({ icon, label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="
        theme-primary text-xs
        flex items-center gap-1
        px-2 py-1 rounded
        transition-all duration-200
        hover:opacity-90 hover:shadow-md
        active:scale-95
      "
    >
      {icon}
      {label}
    </button>
  );
}
