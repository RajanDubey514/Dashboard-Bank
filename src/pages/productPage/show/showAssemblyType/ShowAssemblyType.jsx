import React, { useEffect, useState } from "react";
import { PlusCircle } from "lucide-react";
import Swal from "sweetalert2";
import ModalCom from "../../../../components/modalComp/ModalCom";
import AddAssemblyType from "../../../productPage/addProduct/AddAssemblyType";
import EditAssemblyType from "../../../productPage/updateProduct/EditAssemblyType";
import EditableTable from "../../../../components/tablecomp/EditableTable";
import Pagination from "../../../../components/pagination/Pagination";
import DownloadDataButton from "../../../../components/DownloadData/DownloadDataButton";
import { fakeAssemblyTypeData } from "../../../../components/FakeData";

const ShowAssemblyType = () => {
  const [dataList, setDataList] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedData, setSelectedData] = useState(null);

  // 📱 / 🖥️ Modal and Inline Form states
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [showInlineAddForm, setShowInlineAddForm] = useState(false);
  const [showInlineEditForm, setShowInlineEditForm] = useState(false);

  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // ✅ Load fake data
  useEffect(() => {
    setDataList(fakeAssemblyTypeData);
    setFilteredData(fakeAssemblyTypeData);
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

  // ✅ Delete Confirmation
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This assembly type will be permanently deleted!",
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
        Swal.fire("Deleted!", "Assembly type deleted successfully.", "success");
      }
    });
  };

  const headers = filteredData.length > 0 ? Object.keys(filteredData[0]) : [];

  // ✅ Add Button Handler (mobile → modal, desktop → inline)
  const handleAddClick = () => {
    if (window.innerWidth < 768) {
      setIsAddModalOpen(true);
    } else {
      setShowInlineAddForm(!showInlineAddForm);
      setShowInlineEditForm(false);
    }
  };

  // ✅ Edit Button Handler
  const handleEditClick = (id) => {
    const selected = dataList.find((item) => item.id === id);
    setSelectedData(selected);

    if (window.innerWidth < 768) {
      setIsEditModalOpen(true);
    } else {
      setShowInlineAddForm(false);
      setShowInlineEditForm(true);
    }
  };

  return (
    <div className="p-2 md:p-2 space-y-5 w-full">
      {/* 🔍 Top Controls */}
      <div className="flex justify-end items-center gap-3">
        <DownloadDataButton data={dataList} fileName="AssemblyTypeData" />

        <button
          onClick={handleAddClick}
          className="flex items-center gap-2 px-4 py-1 rounded-lg text-white text-sm font-semibold shadow transition-all duration-300 hover:shadow-lg"
          style={{ backgroundColor: "var(--color-primary)" }}
        >
          <PlusCircle size={12} />
          Add Assembly Type
        </button>
      </div>

      {/* 🖥️ Inline Add Form */}
      {showInlineAddForm && (
        <AddAssemblyType
          dataList={dataList}
          setDataList={setDataList}
          onClose={() => setShowInlineAddForm(false)}
        />
      )}

      {/* 🖥️ Inline Edit Form */}
      {showInlineEditForm && selectedData && (
        <EditAssemblyType
          selectedData={selectedData}
          dataList={dataList}
          setDataList={setDataList}
          onClose={() => {
            setShowInlineEditForm(false);
            setSelectedData(null);
          }}
        />
      )}

      {/* 📋 Table */}
      <div className="overflow-x-auto">
        <EditableTable
          headers={headers}
          rows={paginatedData}
          handleEdit={handleEditClick}
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

      {/* 📱 Add Modal */}
      <ModalCom
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add Assembly Type"
        content={
          <AddAssemblyType
            dataList={dataList}
            setDataList={setDataList}
            onClose={() => setIsAddModalOpen(false)}
          />
        }
      />

      {/* 📱 Edit Modal */}
      <ModalCom
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Assembly Type"
        content={
          <EditAssemblyType
            selectedData={selectedData}
            dataList={dataList}
            setDataList={setDataList}
            onClose={() => setIsEditModalOpen(false)}
          />
        }
      />
    </div>
  );
};

export default ShowAssemblyType;
