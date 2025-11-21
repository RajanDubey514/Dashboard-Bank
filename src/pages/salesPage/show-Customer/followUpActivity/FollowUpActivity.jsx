import React, { useEffect, useState } from "react";
import { PlusCircle } from "lucide-react";
import Swal from "sweetalert2";
import ModalCom from "../../../../components/modalComp/ModalCom";
import AddFollowUpActivity from "../../add-Customer/AddFollowUpActivity/AddFollowUpActivity";
import EditFollowUpActivity from "../../edit-Customer/editFollowUpActivity/EditFollowUpActivity";
import EditableTable from "../../../../components/tablecomp/EditableTable";
import Pagination from "../../../../components/pagination/Pagination";
import SearchBar from "../../../../components/searchComp/SearchBar";
import { FakeFollowUpActivityData } from "../../../../components/FakeData";
import DownloadDataButton from "../../../../components/DownloadData/DownloadDataButton";


// ✅ NEW COMMON COMPONENTS
import SearchBarCommon from "../../../../components/searchComp/SearchBar";
import SelectBoxCommon from "../../../../components/searchComp/SelectBoxCommon";

const FollowUpActivity = () => {
  // 🔹 State management
  const [dataList, setDataList] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
    const [filterType, setFilterType] = useState("all"); // 🔥 NEW FILTER STATE
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedData, setSelectedData] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  

  // 🔹 Inline edit state (optional)
  const [editRowId, setEditRowId] = useState(null);
  const [editedData, setEditedData] = useState({});
  const editableFields = [];

  // 🔹 Sorting & Pagination
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(2);



   // 🔹 Load initial data
    useEffect(() => {
      setDataList(FakeFollowUpActivityData);
      setFilteredData(FakeFollowUpActivityData);
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


  // ✅ Sorting logic
  const onSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc")
      direction = "desc";
    setSortConfig({ key, direction });

    const sortedData = [...filteredData].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });
    setFilteredData(sortedData);
  };

  // ✅ Pagination logic
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
const paginatedData = filteredData.slice(
  (currentPage - 1) * rowsPerPage,
  currentPage * rowsPerPage
);

  // ✅ Modal handlers
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

  // ✅ Delete logic
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This activity will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#16a34a",
      cancelButtonColor: "#dc2626",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setDataList((prev) => prev.filter((item) => item.id !== id));
        setFilteredData((prev) => prev.filter((item) => item.id !== id));
        Swal.fire("Deleted!", "Activity removed successfully.", "success");
      }
    });
  };

  // ✅ Table headers
  const headers = filteredData.length > 0 ? Object.keys(filteredData[0]) : [];

  return (
    <div className="p-2 md:p-2 space-y-5 w-full">
      {/* 🔍 Search + Add Button */}
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

        <div className="flex items-center gap-3">

       <DownloadDataButton
          data={dataList} // ✅ all data
          fileName="Follow-Up Activity"
        />

        <button
          onClick={openAddModal}
           className="flex items-center gap-2 px-4 py-1 rounded-lg text-white text-sm font-semibold shadow 
                     transition-all duration-300 hover:shadow-lg"
          style={{
            backgroundColor: "var(--color-primary)",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor =
              "var(--color-primary-hover)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "var(--color-primary)")
          }  >
          <PlusCircle size={12} />
          Add Follow-Up Activity
        </button>
        </div>
      </div>

      {/* 📋 Editable Table */}
      <div className="overflow-x-auto">
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
      </div>

      {/* 📄 Pagination */}
      <div className="flex justify-center pt-2">
        <Pagination
          currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        totalPages={totalPages}
         totalRecords={dataList.length}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}

        />
      </div>

      {/* ➕ Add Modal */}
      <ModalCom
        isOpen={isAddModalOpen}
        onClose={closeAddModal}
        title="Add Follow-Up Activity"
        content={
          <AddFollowUpActivity
            dataList={dataList}
            setDataList={setDataList}
          />
        }
      />

      {/* ✏️ Edit Modal */}
      <ModalCom
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        title="Edit Follow-Up Activity"
        content={
          <EditFollowUpActivity
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

export default FollowUpActivity;
