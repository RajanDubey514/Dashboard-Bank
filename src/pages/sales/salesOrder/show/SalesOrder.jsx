import React, { useEffect, useMemo, useState } from "react";
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
  const [dataList, setDataList] = useState([]);
  const [filterType, setFilterType] = useState("all");

  // Column search & table data
  const [columnSearchKeys, setColumnSearchKeys] = useState({});
  const [filteredTableData, setFilteredTableData] = useState([]);

  // Sorting & pagination
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  // Add / Edit invoice states
  const [invoiceData, setInvoiceData] = useState({});
  const [products, setProducts] = useState([]);
  const [resetKey, setResetKey] = useState(0);

  const [editInvoiceData, setEditInvoiceData] = useState({});
  const [editProducts, setEditProducts] = useState([]);

  // Load fake data
  useEffect(() => {
    setDataList(fakeSalesorder);
  }, []);

  // Filter by status
  const filteredData = useMemo(() => {
    let updated = [...dataList];
    if (filterType === "active") {
      updated = updated.filter((i) => i.status === "Active");
    }
    return updated;
  }, [dataList, filterType]);

  // Transform data for table → only invoice fields
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

  useEffect(() => {
    setFilteredTableData(tableData);
  }, [tableData]);

  // Column search
  const handleColumnSearch = (header, keys) => {
    const updatedKeys = { ...columnSearchKeys, [header]: keys };
    setColumnSearchKeys(updatedKeys);

    let result = [...tableData];
    Object.keys(updatedKeys).forEach((col) => {
      const values = updatedKeys[col];
      if (values?.length > 0) {
        result = result.filter((row) =>
          values.every((v) =>
            String(row[col] ?? "").toLowerCase().includes(v.toLowerCase())
          )
        );
      }
    });
    setFilteredTableData(result);
    setCurrentPage(1);
  };

  const removeColumnFilter = (column) => {
    const updatedKeys = { ...columnSearchKeys };
    delete updatedKeys[column];

    setColumnSearchKeys(updatedKeys);

    let result = [...tableData];
    Object.keys(updatedKeys).forEach((col) => {
      const values = updatedKeys[col];
      if (values?.length > 0) {
        result = result.filter((row) =>
          values.every((v) =>
            String(row[col] ?? "").toLowerCase().includes(v.toLowerCase())
          )
        );
      }
    });

    setFilteredTableData(result);
    setCurrentPage(1);
  };

  // Sorting
  const onSort = (key) => {
    let direction =
      sortConfig.key === key && sortConfig.direction === "asc"
        ? "desc"
        : "asc";

    setSortConfig({ key, direction });

    const sorted = [...filteredTableData].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });

    setFilteredTableData(sorted);
  };

  // Pagination
  const totalPages = Math.ceil(filteredTableData.length / rowsPerPage);
  const paginatedTableData = filteredTableData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const headers = filteredTableData.length > 0 ? Object.keys(filteredTableData[0]) : [];

  // Actions
  const handleEditClick = (id) => {
    const selected = dataList.find((item) => item.id === id);
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
        const updated = dataList.filter((i) => i.id !== id);
        setDataList(updated);
      }
    });
  };

  // Add Invoice
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

    setDataList([newInvoice, ...dataList]);
    Swal.fire("Success", "Sales Order added successfully", "success");
    setIsAddModalOpen(false);
    handleResetInvoice();
  };

  const handleResetInvoice = () => {
    setInvoiceData({});
    setProducts([]);
    setResetKey((k) => k + 1);
  };

  // Update Invoice
  const handleUpdateInvoice = () => {
    const updated = dataList.map((item) =>
      item.id === selectedData.id
        ? { ...item, invoice: editInvoiceData, products: editProducts }
        : item
    );

    setDataList(updated);
    Swal.fire("Success", "Sales Order updated successfully", "success");
    setIsEditModalOpen(false);
  };

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
            values?.length > 0 ? (
              <div
                key={column}
                className="flex items-center gap-2 px-1 bg-gray-100 border rounded-full text-xs"
              >
                <span className="font-semibold capitalize">{column}:</span>
                <span>{values.join(", ")}</span>

                <button
                  onClick={() => removeColumnFilter(column)}
                  className="text-red-600 font-bold hover:scale-110 transition"
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
            upproducts={editProducts}
            setUpProducts={setEditProducts}
          />
        }
      />
    </div>
  );
};

export default SalesOrder;
