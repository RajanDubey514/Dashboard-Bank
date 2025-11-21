import React, { useEffect, useState } from "react";
import { PlusCircle } from "lucide-react";
import Swal from "sweetalert2";
import ModalCom from "../../../../components/modalComp/ModalCom";
import AddCustomerBasic from "../../add-Customer/AddCustomerBasic/AddCustomerBasic";
import { FakeCustomerData } from "../../../../components/FakeData";
import EditableTable from "../../../../components/tablecomp/EditableTable";
import Pagination from "../../../../components/pagination/Pagination";
import EditCustomerBasic from "../../edit-Customer/editCustomerBasic/EditCustomerBasic";
import DownloadDataButton from "../../../../components/DownloadData/DownloadDataButton";

// ✅ NEW COMMON COMPONENTS
import SearchBarCommon from "../../../../components/searchComp/SearchBar";
import SelectBoxCommon from "../../../../components/searchComp/SelectBoxCommon";

const CustomerBasic = () => {
  const [dataList, setDataList] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const [filterType, setFilterType] = useState("all"); // 🔥 NEW FILTER STATE

  const [selectedData, setSelectedData] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [editRowId, setEditRowId] = useState(null);
  const [editedData, setEditedData] = useState({});
  const editableFields = [];

  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // 🔹 Load initial data
  useEffect(() => {
    setDataList(FakeCustomerData);
    setFilteredData(FakeCustomerData);
  }, []);

  // 🔹 Apply FILTER + SEARCH
  useEffect(() => {
    let updated = [...dataList];

    if (filterType === "new") {
      updated = updated.filter((item) => item.isNew === true);
    }

    if (filterType === "active") {
      updated = updated.filter((item) => item.status === "Active");
    }

    if (filterType === "inactive") {
      updated = updated.filter((item) => item.status === "Inactive");
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      updated = updated.filter((item) =>
        Object.values(item).some(
          (val) =>
            typeof val === "string" && val.toLowerCase().includes(q)
        )
      );
    }

    setFilteredData(updated);
    setCurrentPage(1);
  }, [filterType, searchQuery, dataList]);

  // 🔹 Sorting
  const onSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }

    setSortConfig({ key, direction });

    setFilteredData((prev) =>
      [...prev].sort((a, b) => {
        if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
        if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
        return 0;
      })
    );
  };

  // 🔹 Pagination
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // 🔹 Modal controls
  const openAddModal = () => setIsAddModalOpen(true);
  const closeAddModal = () => setIsAddModalOpen(false);

  const openEditModal = (id) => {
    const row = dataList.find((item) => item.id === id);
    setSelectedData(row);
    setIsEditModalOpen(true);
  };
  const closeEditModal = () => {
    setSelectedData(null);
    setIsEditModalOpen(false);
  };

  // 🔹 Delete
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This record will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor:
        getComputedStyle(document.documentElement)
          .getPropertyValue("--color-primary")
          .trim() || "#16a34a",
      cancelButtonColor: "#dc2626",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setDataList((prev) => prev.filter((item) => item.id !== id));
        Swal.fire("Deleted!", "Record has been removed.", "success");
      }
    });
  };

  const headers = filteredData.length > 0 ? Object.keys(filteredData[0]) : [];

  return (
    <div className="p-2 md:p-3 space-y-5 w-full">

      {/* ⭐ Top Section: Search + Filter + Download + Add */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-3">

        {/* LEFT — Search + Select */}
        <div className="flex items-center gap-3 w-full md:w-auto">

          {/* 🔍 SEARCH */}
          <SearchBarCommon
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search customer..."
          />

          {/* 🔽 SELECT BOX */}
          <SelectBoxCommon
            value={filterType}
            onChange={setFilterType}
            options={[
              { value: "all", label: "All Customers" },
              { value: "new", label: "New Customers" },
              { value: "active", label: "Active Customers" },
              { value: "inactive", label: "Inactive Customers" },
            ]}
          />
        </div>

        {/* RIGHT — Download + Add */}
        <div className="flex items-center gap-3">
          <DownloadDataButton
            data={filteredData}
            fileName="Customer Details"
          />

          <button
            onClick={openAddModal}
            className="flex items-center gap-2 px-4 py-1 rounded-lg text-white text-sm font-semibold shadow transition-all duration-300 hover:shadow-lg"
            style={{ backgroundColor: "var(--color-primary)" }}
          >
            <PlusCircle size={16} />
            Add Customer
          </button>
        </div>
      </div>

      {/* 📌 NO DATA MESSAGE */}
      {filteredData.length === 0 ? (
        <div className="text-center py-10 text-gray-500 font-semibold text-lg">
          No Data Available
        </div>
      ) : (
        <>
          {/* TABLE */}
          <EditableTable
            headers={headers}
            rows={paginatedData}
            editRowId={editRowId}
            editedData={editedData}
            handleEdit={openEditModal}
            handleDelete={handleDelete}
            editableFields={editableFields}
            sortConfig={sortConfig}
            onSort={onSort}
          />

          {/* PAGINATION */}
          <div className="flex justify-center pt-2">
            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={totalPages}
              totalRecords={filteredData.length}
              rowsPerPage={rowsPerPage}
              setRowsPerPage={setRowsPerPage}
            />
          </div>
        </>
      )}

      {/* ADD MODAL */}
      <ModalCom
        isOpen={isAddModalOpen}
        onClose={closeAddModal}
        title="Add Customer"
        iconType="success"
        content={
          <AddCustomerBasic dataList={dataList} setDataList={setDataList} />
        }
      />

      {/* EDIT MODAL */}
      <ModalCom
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        title="Edit Customer"
        iconType="info"
        content={
          <EditCustomerBasic
            selectedData={selectedData}
            dataList={dataList}
            setDataList={setDataList}
            closeEditModal={closeEditModal}
          />
        }
      />
    </div>
  );
};

export default CustomerBasic;
