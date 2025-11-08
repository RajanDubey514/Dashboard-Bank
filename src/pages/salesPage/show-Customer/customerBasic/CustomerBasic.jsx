import React, { useEffect, useState } from "react";
import { PlusCircle } from "lucide-react";
import Swal from "sweetalert2";
import ModalCom from "../../../../components/modalComp/ModalCom";
import AddCustomerBasic from "../../add-Customer/AddCustomerBasic/AddCustomerBasic";
import { FakeCustomerData } from "../../../../components/FakeData";
import EditableTable from "../../../../components/tablecomp/EditableTable";
import Pagination from "../../../../components/pagination/Pagination";
import EditCustomerBasic from "../../edit-Customer/editCustomerBasic/EditCustomerBasic";
import SearchBar from "../../../../components/searchComp/SearchBar";

const CustomerBasic = () => {
  const [dataList, setDataList] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const [selectedData, setSelectedData] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [editRowId, setEditRowId] = useState(null);
  const [editedData, setEditedData] = useState({});
  const editableFields = [];

  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 5;

  // ✅ Load fake data
  useEffect(() => {
    setDataList(FakeCustomerData);
    setFilteredData(FakeCustomerData);
  }, []);

  // ✅ Search
  useEffect(() => {
    if (!searchQuery) {
      setFilteredData(dataList);
    } else {
      const lowerQuery = searchQuery.toLowerCase();
      const filtered = dataList.filter((item) =>
        Object.values(item).some(
          (val) =>
            typeof val === "string" && val.toLowerCase().includes(lowerQuery)
        )
      );
      setFilteredData(filtered);
    }
  }, [searchQuery, dataList]);

  // ✅ Sorting
  const onSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });

    const sortedData = [...filteredData].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });
    setFilteredData(sortedData);
  };

  // ✅ Pagination
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // ✅ Modal Handlers
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

  // ✅ Delete with confirmation
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This record will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#16a34a",
      cancelButtonColor: "#dc2626",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setDataList((prev) => prev.filter((item) => item.id !== id));
        setFilteredData((prev) => prev.filter((item) => item.id !== id));
        Swal.fire("Deleted!", "Record has been removed.", "success");
      }
    });
  };

  // ✅ Table headers
  const headers = filteredData.length > 0 ? Object.keys(filteredData[0]) : [];

  return (
    <div className="p-2 md:p-2 space-y-5 w-full">
      {/* ✅ Top Section - Add + Search */}
      <div className="flex flex-col sm:flex-row justify-end items-center gap-3">
        {/* <div className="w-full sm:w-1/2">
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            placeholder="Search by name, city, or email..."
          />
        </div> */}

        <button
          onClick={openAddModal}
          className="flex items-center gap-2 hover:bg-slate-800 bg-blue-600 text-white text-sm font-semibold px-4 py-1 rounded-lg shadow transition"
        >
        
          <PlusCircle size={12} />
          Add Customer
        </button>
      </div>

      {/* ✅ Editable Table */}
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

      {/* ✅ Pagination */}
      <div className="flex justify-center pt-2">
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
      </div>

      {/* ✅ Add Modal */}
      <ModalCom
        isOpen={isAddModalOpen}
        onClose={closeAddModal}
        title="Add Customer"
        content={
          <AddCustomerBasic dataList={dataList} setDataList={setDataList} />
        }
      />

      {/* ✅ Edit Modal */}
      <ModalCom
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        title="Edit Customer"
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
