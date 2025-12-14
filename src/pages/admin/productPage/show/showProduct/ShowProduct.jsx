import React, { useEffect, useState } from "react";
import { PlusCircle } from "lucide-react";
import Swal from "sweetalert2";

import ModalCom from "../../../../../components/modalComp/ModalCom";
import { fakeMainProductData } from "../../../../../components/FakeData";

import ProductEditTable from "./ProductEditTable";
import Pagination from "../../../../../components/pagination/Pagination";

import AddProduct from "../../addProduct/AddProduct";
import UpdateProduct from "../../updateProduct/UpdateProduct";
import DownloadDataButton from "../../../../../components/DownloadData/DownloadDataButton";
import SelectBoxCommon from "../../../../../components/searchComp/SelectBoxCommon";
import AddBillOfMaterials from "../../../boi/add/AddBillOfMaterials";

const ShowProduct = () => {
  // ==================================================================
  // 🔹 STATE
  // ==================================================================
  const [dataList, setDataList] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");

  const [selectedData, setSelectedData] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(2);

  const [columnSearchKeys, setColumnSearchKeys] = useState({});

  const [viewModalOpen, setViewModalOpen] = useState(false);
const [selectedRow, setSelectedRow] = useState(null);



const handleView = (row) => {
  setSelectedRow(row);
  setViewModalOpen(true);
};

  // ==================================================================
  // 📌 LOAD INITIAL DATA
  // ==================================================================
  useEffect(() => {
    setDataList(fakeMainProductData);
    setFilteredData(fakeMainProductData);
  }, []);

  // ==================================================================
  // 🔍 SEARCH + FILTER
  // ==================================================================
  useEffect(() => {
    let updated = [...dataList];

    if (filterType === "today") {
      updated = updated.filter((item) => item.isNew);
    } else if (filterType === "active") {
      updated = updated.filter((item) => item.status === "Active");
    } else if (filterType === "inactive") {
      updated = updated.filter((item) => item.status === "Inactive");
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      updated = updated.filter((item) =>
        Object.values(item).some(
          (val) => typeof val === "string" && val.toLowerCase().includes(q)
        )
      );
    }

    setFilteredData(updated);
    setCurrentPage(1);
  }, [filterType, searchQuery, dataList]);

  // ==================================================================
  // 🔽 SORTING
  // ==================================================================
  const onSort = (key) => {
    let direction = sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc";
    setSortConfig({ key, direction });

    const sorted = [...filteredData].sort((a, b) =>
      a[key] < b[key] ? (direction === "asc" ? -1 : 1) :
      a[key] > b[key] ? (direction === "asc" ? 1 : -1) : 0
    );

    setFilteredData(sorted);
  };

  // ==================================================================
  // 🔍 COLUMN SEARCH
  // ==================================================================
  const handleColumnSearch = (header, keys) => {
    const updated = { ...columnSearchKeys, [header]: keys };
    setColumnSearchKeys(updated);
    applyFilters(updated);
  };

  const applyFilters = (keysObj) => {
    let result = [...dataList];

    Object.keys(keysObj).forEach((col) => {
      const keys = keysObj[col];
      if (keys?.length > 0) {
        result = result.filter((row) =>
          keys.every((key) =>
            String(row[col] || "").toLowerCase().includes(key.toLowerCase())
          )
        );
      }
    });

    setFilteredData(result);
    setCurrentPage(1);
  };

  // ==================================================================
  // 📄 PAGINATION
  // ==================================================================
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // ==================================================================
  // 🗑️ DELETE
  // ==================================================================
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This record will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "var(--color-primary)",
      cancelButtonColor: "#dc2626",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const updated = dataList.filter((item) => item.id !== id);
        setDataList(updated);
        setFilteredData(updated);
        Swal.fire("Deleted!", "Record has been removed.", "success");
      }
    });
  };

  // ==================================================================
  // HEADERS
  // ==================================================================
  const headers = filteredData.length ? Object.keys(filteredData[0]) : [];

  // ==================================================================
  // UI
  // ==================================================================
  return (
    <div className="space-y-2 w-full">
      {/* FILTER */}
      <SelectBoxCommon
        value={filterType}
        onChange={setFilterType}
        dataList={dataList}
      />

      {/* ACTION BUTTONS */}
      <div className="flex justify-end items-center gap-3">
        <DownloadDataButton data={dataList} fileName="Product Detail" />

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 px-4 py-1 rounded-lg text-white text-xs font-semibold shadow hover:shadow-lg transition"
          style={{ backgroundColor: "var(--color-primary)" }}
        >
          <PlusCircle size={16} />
          Add Product
        </button>
      </div>

      {/* TABLE */}
      <ProductEditTable
        headers={headers}
        rows={paginatedData}
        handleEdit={(id) => {
          const row = dataList.find((item) => item.id === id);
          setSelectedData(row);
          setIsEditModalOpen(true);
        }}
        handleDelete={handleDelete}
        sortConfig={sortConfig}
        onSort={onSort}
        onColumnSearch={handleColumnSearch}
        columnSearchKeys={columnSearchKeys}
         handleView={handleView}
      />

      {/* PAGINATION */}
      <div className="flex justify-center">
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
          totalRecords={filteredData.length}
          rowsPerPage={rowsPerPage}
          setRowsPerPage={setRowsPerPage}
        />
      </div>

      {/* ADD MODAL */}
      <ModalCom
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add Product"
        iconType="success"
        content={<AddProduct dataList={dataList} setDataList={setDataList} />}
      />

      {/* EDIT MODAL */}
      <ModalCom
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Product"
        iconType="info"
        content={
          <UpdateProduct
            selectedData={selectedData}
            dataList={dataList}
            setDataList={setDataList}
            closeEditModal={() => setIsEditModalOpen(false)}
          />
        }
      />


       <ModalCom
        isOpen={viewModalOpen}
        onClose={() => setViewModalOpen(false)}
        title="Bill Of Material"
        iconType="info"
        content={
          <AddBillOfMaterials
            selectedData={selectedData}
            dataList={dataList}
            setDataList={setDataList}
            closeEditModal={() => setIsEditModalOpen(false)}
          />
        }
      />
    </div>
  );
};

export default ShowProduct;
