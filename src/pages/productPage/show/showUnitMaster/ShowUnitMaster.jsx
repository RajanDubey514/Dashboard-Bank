import React, { useEffect, useState } from "react";
import { PlusCircle } from "lucide-react";
import Swal from "sweetalert2";
import ModalCom from "../../../../components/modalComp/ModalCom";
import AddBranchsDetail from "../../../salesPage/add-Customer/addBranchsDetail/AddBranchsDetail";
import { FakeBranchData } from "../../../../components/FakeData";
import EditableTable from "../../../../components/tablecomp/EditableTable";
import Pagination from "../../../../components/pagination/Pagination";
import EditBranchsDetail from "../../../salesPage/edit-Customer/editBranchsDetail/EdiitBranchsDetail";
import DownloadDataButton from "../../../../components/DownloadData/DownloadDataButton";


const ShowUnitMaster = () => {
  const [dataList, setDataList] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedData, setSelectedData] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(2);

  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [currentPage, setCurrentPage] = useState(1);

  // ✅ Load fake data
  useEffect(() => {
    setDataList(FakeBranchData);
    setFilteredData(FakeBranchData);
  }, []);
   
  // ✅ Search filter
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredData(dataList);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = dataList.filter((item) =>
        Object.values(item).some(
          (val) => val && val.toString().toLowerCase().includes(query)
        )
      );
      setFilteredData(filtered);
    }
    setCurrentPage(1);
  }, [searchQuery, dataList]);

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

  // ✅ Delete Confirmation
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This branch will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#16a34a",
      cancelButtonColor: "#dc2626",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        const updated = dataList.filter((item) => item.id !== id);
        setDataList(updated);
        setFilteredData(updated);
        Swal.fire("Deleted!", "Branch deleted successfully.", "success");
      }
    });
  };

  const headers = filteredData.length > 0 ? Object.keys(filteredData[0]) : [];

  return (
    <div className="p-2 md:p-2 space-y-5 w-full">
      {/* 🔍 Search + Add Button */}
      <div className="flex  justify-end items-center gap-3">
        {/* <div className="w-full sm:w-1/2">
          <SearchBar
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            placeholder="Search branch by name, city, or email..."
          />
        </div> */}

        <DownloadDataButton 
          data={dataList} // ✅ all data
          fileName="BranchDetails"
        />

        <button
          onClick={openAddModal}
           className="flex items-center gap-2 px-4 py-1 rounded-lg text-white text-sm font-semibold shadow transition-all duration-300 hover:shadow-lg"
          style={{
            backgroundColor: "var(--color-primary)",
          }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.backgroundColor =
              "var(--color-primary-hover)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.backgroundColor = "var(--color-primary)")
          }
        >
          <PlusCircle size={12} />
          Add Branch
        </button>
      </div>

      {/* 📋 Editable Table */}
      <div className="overflow-x-auto">
        <EditableTable
          headers={headers}
          rows={paginatedData}
          handleEdit={openEditModal}
          handleDelete={handleDelete}
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
        title="Add Branch"
        content={
          <AddBranchsDetail dataList={dataList} setDataList={setDataList} />
        }
      />

      {/* ✏️ Edit Modal */}
      <ModalCom
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        title="Edit Branch"
        content={
          <EditBranchsDetail
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

export default ShowUnitMaster;

