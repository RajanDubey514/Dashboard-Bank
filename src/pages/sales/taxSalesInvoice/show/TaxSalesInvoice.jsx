import React, { useEffect, useMemo, useState } from "react";
import { PlusCircle } from "lucide-react";
import Swal from "sweetalert2";

import InvoiceModal from "../../salesModal/InvoiceModal";
import EditableTable from "../../../../components/tablecomp/EditableTable";
import Pagination from "../../../../components/pagination/Pagination";
import DownloadDataButton from "../../../../components/DownloadData/DownloadDataButton";
import { fakeInvoices } from "../../../../components/FakeData";

import SelectBoxCommon from "../../../../components/searchComp/SelectBoxCommon";
import UpdateInvoice from "../update/UpdateInvoice";
import AddInvoice from "../add/AddInvoice";

const TaxSalesInvoice = () => {
  // ===========================
  // STATE
  // ===========================
  const [dataList, setDataList] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const [filterType, setFilterType] = useState("all");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  const [columnSearchKeys, setColumnSearchKeys] = useState({});

  // ===========================
  // LOAD DATA
  // ===========================
  useEffect(() => {
    setDataList(fakeInvoices);
    setFilteredData(fakeInvoices);
  }, []);

  // ===========================
  // FILTER
  // ===========================
  useEffect(() => {
    let updated = [...dataList];

    if (filterType === "active") {
      updated = updated.filter((i) => i.status === "Active");
    }

    setFilteredData(updated);
    setCurrentPage(1);
  }, [filterType, dataList]);

  // ===========================
  // TRANSFORM → TABLE DATA
  // ===========================
  const tableData = useMemo(() => {
    return filteredData.map((item) => {
      const sub = item.products.reduce(
        (sum, p) => sum + p.qty * p.rate,
        0
      );

      const tax = item.products.reduce(
        (sum, p) =>
          sum + (p.qty * p.rate * (p.sgst + p.cgst + p.igst)) / 100,
        0
      );

      return {
        id: item.id,
        invoiceNo: item.invoice.invNo,
        invoiceDate: item.invoice.invDate,
        customer: item.invoice.customerName,
        mobile: item.invoice.mobile,
        totalQty: item.products.reduce((a, b) => a + b.qty, 0),
        grandTotal: `₹ ${Number(sub + tax).toLocaleString("en-IN")}`,
        status: item.status || "Active",
      };
    });
  }, [filteredData]);

  // ===========================
  // SORT
  // ===========================
  const onSort = (key) => {
    const direction =
      sortConfig.key === key && sortConfig.direction === "asc"
        ? "desc"
        : "asc";

    setSortConfig({ key, direction });

    const sorted = [...filteredData].sort((a, b) =>
      a[key] < b[key] ? (direction === "asc" ? -1 : 1) :
      a[key] > b[key] ? (direction === "asc" ? 1 : -1) : 0
    );

    setFilteredData(sorted);
  };

  // ===========================
  // PAGINATION (ON TABLE DATA)
  // ===========================
  const totalPages = Math.ceil(tableData.length / rowsPerPage);

  const paginatedTableData = tableData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const headers =
    paginatedTableData.length > 0
      ? Object.keys(paginatedTableData[0])
      : [];

  // ===========================
  // ACTIONS
  // ===========================

  const [editInvoiceData, setEditInvoiceData] = useState({});
const [editProducts, setEditProducts] = useState([]);

 const handleEditClick = (id) => {
   const selected = dataList.find((item) => item.id === id);
  setSelectedData(selected);
  setEditInvoiceData(selected.invoice);
  console.log(selected.invoice)
  setEditProducts(selected.products);
  setIsEditModalOpen(true);
};

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      icon: "warning",
      showCancelButton: true,
    }).then((res) => {
      if (res.isConfirmed) {
        const updated = dataList.filter((i) => i.id !== id);
        setDataList(updated);
        setFilteredData(updated);
      }
    });
  };


  const [invoiceData, setInvoiceData] = useState({});
const [products, setProducts] = useState([]);
const [resetKey, setResetKey] = useState(0);

const handleSaveInvoice = () => {
  if (!invoiceData.invNo || products.length === 0) {
    Swal.fire("Error", "Invoice details or products missing", "error");
    return;
  }

  const newInvoice = {
    id: Date.now(), // ✅ unique id
    invoice: {
      invNo: invoiceData.invNo,
      invDate: invoiceData.invDate,
      dueDate: invoiceData.dueDate,
      customerName: invoiceData.customerName,
      mobile: invoiceData.mobile,
      address: invoiceData.address,
    },
    products: products,
    status: "Active",
  };

  const updatedList = [newInvoice, ...dataList];

  setDataList(updatedList);
  setFilteredData(updatedList);

  Swal.fire("Success", "Invoice added successfully", "success");

  setIsAddModalOpen(false);
  handleResetInvoice();
};

const handleResetInvoice = () => {
  setInvoiceData({});
  setProducts([]);
  setResetKey((k) => k + 1); // 🔥 force reset
};


 // Update invoice
  const handleUpdateInvoice = () => {
    if (!editInvoiceData.invNo || editProducts.length === 0) {
      Swal.fire("Error", "Invoice details or products missing", "error");
      return;
    }

    const updatedList = dataList.map((item) =>
      item.id === selectedData.id
        ? {
            ...item,
            invoice: editInvoiceData,
            products: editProducts,
          }
        : item
    );

    setDataList(updatedList);
    setFilteredData(updatedList);

    console.log("Updated DataList:", updatedList);

    Swal.fire("Success", "Invoice updated successfully", "success");
    setIsEditModalOpen(false);
  };

  // ===========================
  // UI
  // ===========================
  return (
    <div className="space-y-3 w-full">
      <SelectBoxCommon
        value={filterType}
        onChange={setFilterType}
        dataList={dataList}
      />

      <div className="flex justify-end gap-3">
        <DownloadDataButton data={tableData} fileName="SalesInvoices" />

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 px-4 py-1 rounded-lg text-white text-xs"
          style={{ backgroundColor: "var(--color-primary)" }}
        >
          <PlusCircle size={12} />
          Add Sales Invoice
        </button>
      </div>

      <EditableTable
        headers={headers}
        rows={paginatedTableData}
        handleEdit={handleEditClick}
        handleDelete={handleDelete}
        sortConfig={sortConfig}
        onSort={onSort}
      />

      <Pagination
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
        totalRecords={tableData.length}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
      />

      {/* ADD */}
      <InvoiceModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add Sales Invoice"
        width="95%"
        height="90vh"
         onSubmit={handleSaveInvoice}
          onReset={handleResetInvoice}
        content={
          <AddInvoice
             invoiceData={invoiceData}
             key={resetKey}
              setInvoiceData={setInvoiceData}
              products={products}
              setProducts={setProducts}
              onClose={() => setIsAddModalOpen(false)}
          />
        }
      />

      {/* EDIT */}
      <InvoiceModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Update Sales Invoice"
        width="95%"
        height="90vh"
          onSubmit={handleUpdateInvoice}       // ✅ SUBMIT WORKS
        content={
          <UpdateInvoice
            upinvoiceData={editInvoiceData}
            setUpInvoiceData={setEditInvoiceData}
            upproducts={editProducts}
           setUpProducts={setEditProducts}
           onClose={() => setIsEditModalOpen(false)}
          />
        }
      /> 
    </div>
  );
};

export default TaxSalesInvoice;
