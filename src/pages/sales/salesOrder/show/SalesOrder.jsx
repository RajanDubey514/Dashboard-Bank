import React, { useEffect, useMemo, useState, useCallback } from "react";
import { PlusCircle, CircleX } from "lucide-react";
import Swal from "sweetalert2";

import InvoiceModal from "../../salesModal/InvoiceModal";
import EditableTable from "../../../../components/tablecomp/EditableTable";
import Pagination from "../../../../components/pagination/Pagination";
import DownloadDataButton from "../../../../components/DownloadData/DownloadDataButton";
import { fakeSalesorder } from "../../../../components/FakeData";

import SelectBoxCommon from "../../../../components/searchComp/SelectBoxCommon";
import UpdateInvoice from "../update/UpdateInvoice";
import AddInvoice from "../add/AddInvoice";

const SalesOrder = () => {
  /* -------------------- DATA -------------------- */
  const [dataList, setDataList] = useState([]);
  const [filterType, setFilterType] = useState("all");

  /* -------------------- TABLE -------------------- */
  const [columnSearchKeys, setColumnSearchKeys] = useState({});
  const [filteredTableData, setFilteredTableData] = useState([]);

  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  /* -------------------- MODALS -------------------- */
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  /* -------------------- ADD -------------------- */
  const [invoiceData, setInvoiceData] = useState({});
  const [products, setProducts] = useState([]);
  const [resetKey, setResetKey] = useState(0);

  /* -------------------- EDIT -------------------- */
  const [editInvoiceData, setEditInvoiceData] = useState({});
  const [editProducts, setEditProducts] = useState([]);

  /* -------------------- LOAD DATA -------------------- */
  useEffect(() => {
    setDataList(fakeSalesorder);
  }, []);

  /* -------------------- FILTER BY TYPE -------------------- */
  const filteredData = useMemo(() => {
    if (filterType === "active") {
      return dataList.filter((i) => i.status === "Active");
    }
    return dataList;
  }, [dataList, filterType]);

  /* -------------------- TABLE TRANSFORM -------------------- */
  const tableData = useMemo(() => {
    return filteredData.map((item) => ({
      id: item.id,
      soNo: item.invoice.soNo,
      soDate: item.invoice.soDate,
      salesPerson: item.invoice.salesPerson,
      customerName: item.invoice.customerName,
      paymentTerms: item.invoice.paymentTerms,
      deliveryPriority: item.invoice.deliveryPriority,
      billingAddress: item.invoice.billingAddress,
      shippingAddress: item.invoice.shippingAddress,
    }));
  }, [filteredData]);

  /* -------------------- APPLY COLUMN FILTERS -------------------- */
  const applyColumnFilters = useCallback(
    (keys) => {
      let result = [...tableData];

      Object.keys(keys).forEach((col) => {
        const values = keys[col];
        if (values?.length) {
          result = result.filter((row) =>
            values.every((v) =>
              String(row[col] ?? "")
                .toLowerCase()
                .includes(v.toLowerCase())
            )
          );
        }
      });

      setFilteredTableData(result);
      setCurrentPage(1);
    },
    [tableData]
  );

  useEffect(() => {
    setFilteredTableData(tableData);
  }, [tableData]);

  /* -------------------- COLUMN SEARCH -------------------- */
  const handleColumnSearch = (header, keys) => {
    const updated = { ...columnSearchKeys, [header]: keys };
    setColumnSearchKeys(updated);
    applyColumnFilters(updated);
  };

  const removeColumnFilter = (column) => {
    const updated = { ...columnSearchKeys };
    delete updated[column];
    setColumnSearchKeys(updated);
    applyColumnFilters(updated);
  };

  /* -------------------- SORT -------------------- */
  const onSort = (key) => {
    const direction =
      sortConfig.key === key && sortConfig.direction === "asc"
        ? "desc"
        : "asc";

    setSortConfig({ key, direction });

    setFilteredTableData((prev) =>
      [...prev].sort((a, b) => {
        if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
        if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
        return 0;
      })
    );
  };

  /* -------------------- PAGINATION -------------------- */
  const totalPages = Math.ceil(filteredTableData.length / rowsPerPage);
  const paginatedTableData = filteredTableData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const headers =
    filteredTableData.length > 0
      ? Object.keys(filteredTableData[0])
      : [];

  /* -------------------- ACTIONS -------------------- */
  const handleEditClick = (id) => {
    const selected = dataList.find((i) => i.id === id);
    setSelectedData(selected);
    setEditInvoiceData(selected.invoice);
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
        setDataList((prev) => prev.filter((i) => i.id !== id));
      }
    });
  };

  /* -------------------- ADD INVOICE -------------------- */
  const handleSaveInvoice = () => {
    if (!invoiceData.soNo) {
      Swal.fire("Error", "Invoice details missing", "error");
      return;
    }

    const newInvoice = {
      id: Date.now(),
      invoice: invoiceData,
      products,
      status: "Active",
    };

    setDataList((prev) => [newInvoice, ...prev]);
    Swal.fire("Success", "Sales Order added successfully", "success");
    setIsAddModalOpen(false);
    handleResetInvoice();
  };

  const handleResetInvoice = () => {
    setInvoiceData({});
    setProducts([]);
    setResetKey((k) => k + 1);
  };

  /* -------------------- UPDATE INVOICE -------------------- */
  const handleUpdateInvoice = () => {
    setDataList((prev) =>
      prev.map((item) =>
        item.id === selectedData.id
          ? { ...item, invoice: editInvoiceData, products: editProducts }
          : item
      )
    );

    Swal.fire("Success", "Sales Order updated successfully", "success");
    setIsEditModalOpen(false);
  };

  /* -------------------- UI -------------------- */
  return (
    <div className="space-y-3 w-full">
      <SelectBoxCommon
        value={filterType}
        onChange={setFilterType}
        dataList={dataList}
      />

      <div className="flex justify-end gap-3">
        <DownloadDataButton
          data={filteredTableData}
          fileName="Sales Order"
        />

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 px-4 py-1 rounded-lg text-white text-xs"
          style={{ backgroundColor: "var(--color-primary)" }}
        >
          <PlusCircle size={12} />
          Add Sales Order
        </button>
      </div>

      {Object.keys(columnSearchKeys).length > 0 && (
        <div className="flex gap-1 mb-1">
          {Object.entries(columnSearchKeys).map(([column, values]) =>
            values?.length ? (
              <div
                key={column}
                className="flex items-center gap-2 px-1 bg-gray-100 border rounded-full text-xs"
              >
                <span className="font-semibold capitalize">{column}:</span>
                <span>{values.join(", ")}</span>
                <button
                  onClick={() => removeColumnFilter(column)}
                  className="text-red-600"
                >
                  <CircleX size={14} />
                </button>
              </div>
            ) : null
          )}
        </div>
      )}

      <EditableTable
        headers={headers}
        rows={paginatedTableData}
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
        totalRecords={filteredTableData.length}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
      />

      {/* ADD */}
      <InvoiceModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add Sales Order"
        width="95%"
        height="90vh"
        onSubmit={handleSaveInvoice}
        onReset={handleResetInvoice}
        content={
          <AddInvoice
            key={resetKey}
            invoiceData={invoiceData}
            setInvoiceData={setInvoiceData}
            products={products}
            setProducts={setProducts}
          />
        }
      />

      {/* EDIT */}
      <InvoiceModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Update Sales Order"
        width="95%"
        height="90vh"
        onSubmit={handleUpdateInvoice}
        content={
          <UpdateInvoice
            upinvoiceData={editInvoiceData}
            setUpInvoiceData={setEditInvoiceData}
            products={editProducts}
            setProducts={setEditProducts}
          />
        }
      />
    </div>
  );
};

export default SalesOrder;
