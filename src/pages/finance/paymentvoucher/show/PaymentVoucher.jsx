import React, { useMemo, useState } from "react";
import { PlusCircle, CircleX } from "lucide-react";
import Swal from "sweetalert2";

import InvoiceModal from "../../../../components/modalComp/InvoiceModal";
import EditableTable from "../../../../components/tablecomp/EditableTable";
import Pagination from "../../../../components/pagination/Pagination";
import DownloadDataButton from "../../../../components/DownloadData/DownloadDataButton";
import SelectBoxCommon from "../../../../components/searchComp/SelectBoxCommon";

import AddInvoice from "../add/AddInvoice";
import UpdateInvoice from "../edit/UpdateInvoice";
import { fakePaymentVouchers } from "../../../../components/FakeData";

const PaymentVoucher = () => {
  /* =========================
     STATES (SINGLE SOURCE)
  ========================= */
  const [dataList, setDataList] = useState(fakePaymentVouchers);

  const [filterType, setFilterType] = useState("all");
  const [columnSearchKeys, setColumnSearchKeys] = useState({});
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [invoiceData, setInvoiceData] = useState({});
  const [editInvoiceData, setEditInvoiceData] = useState(null);
  const [resetKey, setResetKey] = useState(0);

  /* =========================
     DERIVED DATA (ALL FEATURES)
  ========================= */
  const processedData = useMemo(() => {
    let result = [...dataList];

    // 1️⃣ STATUS FILTER
    if (filterType === "today") {
      result = result.filter((i) => i.isNew);
    }

    // 2️⃣ COLUMN SEARCH
    Object.entries(columnSearchKeys).forEach(([col, keys]) => {
      if (keys?.length) {
        result = result.filter((row) =>
          keys.every((k) =>
            String(row[col] || "")
              .toLowerCase()
              .includes(k.toLowerCase())
          )
        );
      }
    });

    // 3️⃣ SORTING
    if (sortConfig.key) {
      result.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key])
          return sortConfig.direction === "asc" ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key])
          return sortConfig.direction === "asc" ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [dataList, filterType, columnSearchKeys, sortConfig]);

  /* =========================
     TABLE COLUMNS ONLY
  ========================= */
  const tableData = useMemo(() => {
    return processedData.map((i) => ({
      id: i.id,
      voucherNo: i.voucherNo,
      refNo: i.refNo,
      date: i.date,
      amount: i.amount,
    }));
  }, [processedData]);

  /* =========================
     PAGINATION
  ========================= */
  const totalPages = Math.ceil(tableData.length / rowsPerPage);

  const paginatedData = useMemo(() => {
    return tableData.slice(
      (currentPage - 1) * rowsPerPage,
      currentPage * rowsPerPage
    );
  }, [tableData, currentPage, rowsPerPage]);

  const headers = useMemo(
    () => (tableData.length ? Object.keys(tableData[0]) : []),
    [tableData]
  );

  /* =========================
     COLUMN SEARCH HANDLERS
  ========================= */
  const handleColumnSearch = (header, keys) => {
    setColumnSearchKeys((prev) => ({ ...prev, [header]: keys }));
    setCurrentPage(1);
  };

  const removeColumnFilter = (column) => {
    setColumnSearchKeys((prev) => {
      const copy = { ...prev };
      delete copy[column];
      return copy;
    });
  };

  /* =========================
     SORT HANDLER
  ========================= */
  const onSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction:
        prev.key === key && prev.direction === "asc" ? "desc" : "asc",
    }));
  };

  /* =========================
     CRUD
  ========================= */
  const handleSaveInvoice = () => {
    if (!invoiceData.voucherNo || !invoiceData.amount) {
      Swal.fire("Error", "Voucher No & Amount required", "error");
      return;
    }

    setDataList([{ id: Date.now(), ...invoiceData }, ...dataList]);
    setIsAddModalOpen(false);
    setInvoiceData({});
    setResetKey((k) => k + 1);

    Swal.fire("Success", "Reciept Voucher Added", "success");
  };

  const handleEditClick = (id) => {
    setEditInvoiceData(dataList.find((i) => i.id === id));
    setIsEditModalOpen(true);
  };

  const handleUpdateInvoice = () => {
    setDataList((prev) =>
      prev.map((i) =>
        i.id === editInvoiceData.id ? editInvoiceData : i
      )
    );
    setIsEditModalOpen(false);
    Swal.fire("Updated", "Voucher Updated", "success");
  }; 

  const handleResetInvoice = () => {
  setInvoiceData({});      // clear add form data
  setResetKey((k) => k + 1); // force remount AddInvoice (clears internal state)
};

const handleResetEditInvoice = () => {
  if (!editInvoiceData) return;
  setEditInvoiceData({})

};

  const handleDelete = (id) => {
    Swal.fire({
      title: "Delete?",
      icon: "warning",
      showCancelButton: true,
    }).then((res) => {
      if (res.isConfirmed) {
        setDataList((prev) => prev.filter((i) => i.id !== id));
      }
    });
  };

  /* =========================
     UI
  ========================= */
  return (
    <div className="space-y-3 w-full">
      <SelectBoxCommon
        value={filterType}
        onChange={setFilterType}
        dataList={dataList}
      />

      <div className="flex justify-end gap-3">
        <DownloadDataButton data={tableData} fileName="Payment Voucher" />

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 px-4 py-1 rounded-lg text-white text-xs"
          style={{ backgroundColor: "var(--color-primary)" }}
        >
          <PlusCircle size={12} />
          Add Payment Voucher
        </button>
      </div>

      {/* FILTER CHIPS */}
      {Object.keys(columnSearchKeys).length > 0 && (
        <div className="flex gap-1">
          {Object.entries(columnSearchKeys).map(([col, values]) =>
            values?.length ? (
              <div
                key={col}
                className="flex items-center gap-2 px-2 bg-gray-100 border rounded-full text-xs"
              >
                <b>{col}:</b> {values.join(", ")}
                <button onClick={() => removeColumnFilter(col)}>
                  <CircleX size={14} className="text-red-600" />
                </button>
              </div>
            ) : null
          )}
        </div>
      )}

      <EditableTable
        headers={headers}
        rows={paginatedData}
        handleEdit={handleEditClick}
        handleDelete={handleDelete}
        sortConfig={sortConfig}
        onSort={onSort}
        onColumnSearch={handleColumnSearch}
        columnSearchKeys={columnSearchKeys}
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
        title="Add Payment Voucher"
        submitText="Submit"
        onSubmit={handleSaveInvoice}
        onReset={handleResetInvoice}

        content={
          <AddInvoice
            key={resetKey}
            invoiceData={invoiceData}
            setInvoiceData={setInvoiceData}
          />
        }
      />

      {/* EDIT */}
      <InvoiceModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Update Payment Voucher"
        submitText="Update"
        onSubmit={handleUpdateInvoice}
        onReset={handleResetEditInvoice}
        content={
          <UpdateInvoice
            invoiceData={editInvoiceData}
            setInvoiceData={setEditInvoiceData}
          />
        }
      />
    </div>
  );
};

export default PaymentVoucher;
