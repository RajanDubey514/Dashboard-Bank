
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

  {
    name: "Sales",
    icon: Receipt,
    subItems: [
      { name: "Sales Order", path: "/sales?page=sales_order" },
      { name: "Delivery Challan", path: "/sales?page=delivery_challan" },
      { name: "Tax/Sales Invoice", path: "/sales?page=tax_sales_invoice" },
      { name: "Sales Return", path: "/sales?page=sales_return" },
    ],
  },

  {
    name: "Purchase",
    icon: ShoppingCart,
    subItems: [
      { name: "Purchase Order", path: "/purchase?page=purchase_order" },
      { name: "GRN / Purchase D.C.", path: "/purchase?page=purchase_DC_GRN" },
      { name: "Purchase Invoice", path: "/purchase?page=purchase_invoice" },
      { name: "Purchase Return", path: "/purchase?page=purchase_return" },
    ],
  },

  {
    name: "Production",
    icon: Building2,
    subItems: [
      { name: "Bill of Material (BOM)", path: "/bom" },
      { name: "Work Order", path: "/work-order" },
      { name: "Production Status", path: "/production-status" },
    ],
  },

  {
    name: "Inventory",
    icon: Boxes,
    subItems: [
      { name: "Stock Transfer", path: "/stock-transfer" },
      { name: "Unit Conversion", path: "/unit-conversion" },
      { name: "Item Adjustment", path: "/item-adjustment" },
    ],
  },

  {
    name: "Finance",
    icon: Wallet,
    subItems: [
      { name: "Payment Voucher", path: "/finance?page=payment_voucher" },
      { name: "Receipt Voucher", path: "/finance?page=reciept_voucher" },
      { name: "Debit Note", path: "/finance?page=debit_note" },
      { name: "Credit Note", path: "/finance?page=credit_note" },
      { name: "Bank Entry", path: "/finance?page=bank_entry" },
      { name: "Petty Cash / Cash Expense", path: "/finance?page=petty_cash" },
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
    icon: ClipboardList,
    subItems: [
      { name: "Day Book", path: "/day-book" },
      { name: "Cash Book", path: "/cash-book" },
      { name: "Bank Book", path: "/bank-book" },
    ],
  },

  {
    name: "Admin/Master Setup",
    icon: Users,
    subItems: [
      { name: "Product", path: "/admin?page=product" },
      { name: "Customer", path: "/admin?page=account" },
      { name: "Supplier", path: "/admin?page=supplier" },
      { name: "User Management", path: "/admin?page=usermanagement" },
      // { name: "BOM Master", path: "/admin?page=bom" },
    ],
  },
];

export default MenuItems;
