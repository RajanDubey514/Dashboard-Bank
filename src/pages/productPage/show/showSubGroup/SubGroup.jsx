import React, { useEffect, useState } from "react";
import { PlusCircle } from "lucide-react";
import Swal from "sweetalert2";
import ModalCom from "../../../../components/modalComp/ModalCom";
import EditableTable from "../../../../components/tablecomp/EditableTable";
import Pagination from "../../../../components/pagination/Pagination";
import DownloadDataButton from "../../../../components/DownloadData/DownloadDataButton";
import AddSubMainForm from "../../../productPage/addProduct/AddSubMainForm";
import EditSubMainForm from "../../../productPage/updateProduct/EditSubMainForm";
import { FakeSubMainGroupData } from "../../../../components/FakeData";

const SubMainGroup = () => {
  const [dataList, setDataList] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // ✅ Add/Edit Modal States
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [showInlineForm, setShowInlineForm] = useState(false);
  const [showInlineEditForm, setShowInlineEditForm] = useState(false);
  const [selectedData, setSelectedData] = useState(null);

  // ✅ Initial fake data
  useEffect(() => {
    setDataList(FakeSubMainGroupData);
    setFilteredData(FakeSubMainGroupData);
  }, []);

  // ✅ Search
  useEffect(() => {
    if (!searchQuery.trim()) setFilteredData(dataList);
    else {
      const q = searchQuery.toLowerCase();
      setFilteredData(
        dataList.filter((item) =>
          Object.values(item).some(
            (val) => val && val.toString().toLowerCase().includes(q)
          )
        )
      );
    }
    setCurrentPage(1);
  }, [searchQuery, dataList]);

  // ✅ Sort
  const onSort = (key) => {
    let direction = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc")
      direction = "desc";
    setSortConfig({ key, direction });

    const sorted = [...filteredData].sort((a, b) => {
      if (a[key] < b[key]) return direction === "asc" ? -1 : 1;
      if (a[key] > b[key]) return direction === "asc" ? 1 : -1;
      return 0;
    });
    setFilteredData(sorted);
  };

  // ✅ Delete Confirmation
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This SubMain record will be permanently deleted!",
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
        Swal.fire("Deleted!", "SubMain deleted successfully.", "success");
      }
    });
  };

  // ✅ Pagination
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const headers = filteredData.length > 0 ? Object.keys(filteredData[0]) : [];

  // ✅ Add & Edit handlers
  const handleAddClick = () => {
    if (window.innerWidth < 768) setIsAddModalOpen(true);
    else setShowInlineForm(!showInlineForm);
  };

  const handleEditClick = (id) => {
    const selected = dataList.find((item) => item.id === id);
    setSelectedData(selected);
    if (window.innerWidth < 768) setIsEditModalOpen(true);
    else setShowInlineEditForm(true);
  };

  return (
    <div className="p-2 space-y-5 w-full">
      {/* Top Controls */}
      <div className="flex justify-end items-center gap-3">
        <DownloadDataButton data={dataList} fileName="SubMainGroupDetails" />
        <button
          onClick={handleAddClick}
          className="flex items-center gap-2 px-4 py-1 rounded-lg text-white text-sm font-semibold shadow transition-all duration-300 hover:shadow-lg"
          style={{ backgroundColor: "var(--color-primary)" }}
        >
          <PlusCircle size={12} />
          Add Sub Main
        </button>
      </div>

      {/* Inline Add Form */}
      {showInlineForm && (
        <AddSubMainForm
          dataList={dataList}
          setDataList={setDataList}
          onClose={() => setShowInlineForm(false)}
        />
      )}

      {/* Inline Edit Form */}
      {showInlineEditForm && selectedData && (
        <EditSubMainForm
          selectedData={selectedData}
          dataList={dataList}
          setDataList={setDataList}
          onClose={() => {
            setShowInlineEditForm(false);
            setSelectedData(null);
          }}
        />
      )}

      {/* Table */}
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

      {/* Pagination */}
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

      {/* Add Modal */}
      <ModalCom
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add Sub Main"
        content={
          <AddSubMainForm
            dataList={dataList}
            setDataList={setDataList}
            onClose={() => setIsAddModalOpen(false)}
          />
        }
      />

      {/* Edit Modal */}
      <ModalCom
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Edit Sub Main"
        content={
          <EditSubMainForm
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

export default SubMainGroup;
