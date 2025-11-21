// MenuItems.jsx
import {
  LayoutGrid,
  Package,
  ClipboardList,
  ShoppingCart,
  FileText,
  Layers,
  BarChart3,
  Wallet,
  Boxes,
  Users,
  Settings,
  Receipt,
  Building2,
} from "lucide-react";

const MenuItems = [
  { name: "Dashboard", icon: LayoutGrid, path: "/" },
  { name: "Product", icon: Package, path: "/product" },
  { name: "Account", icon: Wallet, path: "/sale-add" },
//   { name: "Setting", icon: Settings, path: "/setting" },

  {
    // name: "Sales & Distribution",
    name: "Sales",
    icon: Receipt,
    subItems: [
      { name: "Sales Order", path: "/sales-order" },
      { name: "Delivery Challan (D.C.)", path: "/delivery-challan" },
      { name: "Tax Invoice / Sales Invoice", path: "/sales-invoice" },
      { name: "Sales Return", path: "/sales-return" },
    ],
  },

  {
    // name: "Procurement / Purchase",
    name: "Purchase",
    icon: ShoppingCart,
    subItems: [
      { name: "Purchase Order", path: "/purchase-order" },
      { name: "GRN / Purchase D.C.", path: "/purchase-grn" },
      { name: "Purchase Invoice", path: "/purchase-invoice" },
      { name: "Purchase Return", path: "/purchase-return" },
    ],
  },

  {
    name: "Production",
    // name: "Production / Manufacturing",
    icon: Building2,
    subItems: [
      { name: "Bill of Material (BOM)", path: "/bom" },
      { name: "Work Order", path: "/work-order" },
      { name: "Production Status", path: "/production-status" },
    ],
  },

  {
    name: "Inventory",
    // name: "Inventory & Warehouse",
    icon: Boxes,
    subItems: [
      { name: "Stock Transfer", path: "/stock-transfer" },
      { name: "Unit Conversion", path: "/unit-conversion" },
      { name: "Item Adjustment", path: "/item-adjustment" },
    ],
  },

  {
    // name: "Finance & Accounts",
    name: "Finance",
    icon: Wallet,
    subItems: [
      { name: "Payment Voucher", path: "/payment-voucher" },
      { name: "Receipt Voucher", path: "/receipt-voucher" },
      { name: "Debit Note", path: "/debit-note" },
      { name: "Credit Note", path: "/credit-note" },
      { name: "Bank Entry", path: "/bank-entry" },
      { name: "Petty Cash / Cash Expense", path: "/cash-expense" },
    ],
  },

  {
    name: "MIS Reports",
    icon: BarChart3,
    subItems: [
      { name: "Ledger Report", path: "/ledger-report" },
      { name: "Chart of Accounts", path: "/chart-of-accounts" },
      { name: "Reorder Level Report", path: "/reorder-report" },
      { name: "Profit Analysis", path: "/profit-analysis" },
      { name: "Purchase Analysis", path: "/purchase-analysis" },
      { name: "Sales Analysis", path: "/sales-analysis" },
      { name: "Production Report", path: "/production-report" },
      { name: "Day End Posting", path: "/day-end-posting" },
      { name: "Petty Cash Report", path: "/petty-cash-report" },
    ],
  },

  {
    name: "Receivables/Payables",
    icon: FileText,
    subItems: [
      { name: "Outstanding Report", path: "/outstanding-report" },
      { name: "Due Report (Day-wise)", path: "/due-day-wise" },
      { name: "Due Report (Amount-wise)", path: "/due-amount-wise" },
    ],
  },

  {
    name: "Inventory Reports",
    icon: Boxes,
    subItems: [
      { name: "Opening Stock", path: "/opening-stock-report" },
      { name: "Closing Stock", path: "/closing-stock-report" },
      { name: "Stock Detailed Summary", path: "/stock-detailed-summary" },
    ],
  },

  {
    name: "Financial Statements",
    icon: Layers,
    subItems: [
      { name: "Trial Balance", path: "/trial-balance" },
      { name: "Trading Account", path: "/trading-account" },
      { name: "Profit & Loss A/c", path: "/pnl-account" },
      { name: "P&L with Trading", path: "/pnl-with-trading" },
      { name: "Balance Sheet", path: "/balance-sheet" },
      { name: "Income vs Expense Chart", path: "/income-expense-chart" },
    ],
  },

  {
    name: "Day Books",
    // name: "Day Books & Registers",
    icon: ClipboardList,
    subItems: [
      { name: "Day Book", path: "/day-book" },
      { name: "Cash Book", path: "/cash-book" },
      { name: "Bank Book", path: "/bank-book" },
    ],
  },

  {
    name: "Admin/Master Setup",
    // name: "Administration / Master Setup",
    icon: Users,
    subItems: [
      { name: "Item Master", path: "/item-master" },
      { name: "Ledger Master", path: "/ledger-master" },
      { name: "User Management", path: "/user-management" },
      { name: "BOM Master", path: "/bom-master" },
    ],
  },
];

export default MenuItems;
