import React, { useEffect, useState } from "react";
import { PlusCircle , CircleX} from "lucide-react";
import Swal from "sweetalert2";
import { useDispatch , useSelector} from "react-redux";
import { getUsersRole , deleteUserRole } from "../../../../redux/slice/role/RoleSlice";
import { alertSuccess , alertError, alertConfirm} from "../../../../components/alert/Alert";

import Loader from '../../../../components/loader/Loader'

import ModalCom from "../../../../components/modalComp/ModalCom";
import Pagination from "../../../../components/pagination/Pagination";
import DownloadDataButton from "../../../../components/DownloadData/DownloadDataButton";

// Common Components
import SelectBoxCommon from "../../../../components/searchComp/SelectBoxCommon";
import AddRole from './AddRole'
import EditableTable from "../../../../components/tablecomp/EditableTable";
import UpdateRole from "./UpdateRole";

const Role = () => {
    const dispatch = useDispatch();
  const {roleList, loading } = useSelector((state) => state.roleUse);
  // 🔥 MAIN STATES
  const [dataList, setDataList] = useState([]); 
  const [filteredData, setFilteredData] = useState([]); 
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(); 
  const [columnSearchKeys, setColumnSearchKeys] = useState({});
  
    useEffect(() => {
    dispatch(getUsersRole())
  }, [dispatch]);

 useEffect(() => {
  if (roleList && Array.isArray(roleList)) {
    setDataList(roleList);
    setFilteredData(roleList);
  } else {
    setDataList([]);
    setFilteredData([]);
  }
}, [roleList]);

  // ----------------------------------------------------------------------
  // ↕️ SORTING LOGIC
  // ----------------------------------------------------------------------
  
  const onSort = (key) => {
    let direction = sortConfig.key === key && sortConfig.direction === "asc" ? "desc" : "asc";
    setSortConfig({ key, direction });

    const sorted = [...filteredData].sort((a, b) =>
      a[key] < b[key] ? (direction === "asc" ? -1 : 1) :
      a[key] > b[key] ? (direction === "asc" ? 1 : -1) : 0
    );
    setFilteredData(sorted);
  };

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
 

   const removeColumnFilter = (column) => {
  const updatedKeys = { ...columnSearchKeys };
  delete updatedKeys[column]; // ❌ remove that column filter

  setColumnSearchKeys(updatedKeys);

  // Re-apply remaining column filters
  let result = [...dataList];

  Object.keys(updatedKeys).forEach((col) => {
    const keys = updatedKeys[col];
    if (keys?.length > 0) {
      result = result.filter((row) =>
        keys.every((key) =>
          String(row[col] || "")
            .toLowerCase()
            .includes(key.toLowerCase())
        )
      );
    }
  });

  setFilteredData(result);
  setCurrentPage(1);
};
  

  // ----------------------------------------------------------------------
  // ❌ DELETE ROW WITH CONFIRMATION
  // ----------------------------------------------------------------------
 const handleDelete = async (id) => {
  const res = await alertConfirm("This role will be permanently deleted!");
  if (res.isConfirmed) {
    try {
      const resp = await dispatch(deleteUserRole(id)).unwrap();
      await dispatch(getUsersRole());
      alertSuccess(resp?.message || "Role deleted successfully");
    } catch (error) {
      alertError(error?.message || "Delete failed");
    }
  }
};

  // ----------------------------------------------------------------------
  // 📄 PAGINATION
  // ----------------------------------------------------------------------
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);

  const paginatedData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const headers = filteredData.length > 0 ? Object.keys(filteredData[0]) : [];

  // ----------------------------------------------------------------------
  // 🟢 OPEN ADD MODAL
  // ----------------------------------------------------------------------
  const handleAddClick = () => {
    setIsAddModalOpen(true);
  };

  // ----------------------------------------------------------------------
  // ✏️ OPEN EDIT MODAL
  // ----------------------------------------------------------------------
  const handleEditClick = (id) => {
    console.log(roleList)
    const selected = roleList.find((item) => item._id === id);
    console.log(selected)
    setSelectedData(selected);
    setIsEditModalOpen(true);
  };

  // ----------------------------------------------------------------------
  // UI RENDER
  // ----------------------------------------------------------------------
  return (
    <div className="space-y-2 w-full">
      <div className="flex flex-col md:flex-row justify-end md:items-center gap-3">

        {/* RIGHT — Download + Add */}
        <div className="flex items-center gap-3">
          <DownloadDataButton data={dataList} fileName="User Role List"/>

          <button
            onClick={handleAddClick}
            className="flex items-center gap-2 px-4 py-1 rounded-lg text-white text-xs font-semibold shadow transition-all duration-300 hover:shadow-lg"
            style={{ backgroundColor: "var(--color-primary)" }}
          >
            <PlusCircle size={12} />
            Add Role
          </button>
        </div>
      </div>

      
        {Object.keys(columnSearchKeys).length > 0 && (
     <div className="flex gap-1 mb-1">
    {Object.entries(columnSearchKeys).map(([column, values]) =>
      values?.length > 0 ? (
        <div
          key={column}
          className="flex items-center gap-2 px-1  bg-gray-100 border rounded-full text-xs"
        >
          <span className="font-semibold capitalize">{column}:</span>
          <span>{values.join(", ")}</span>

          {/* ❌ REMOVE FILTER */}
          <button
            onClick={() => removeColumnFilter(column)}
            className="text-red-600 font-bold hover:scale-110 transition"
          >
            <CircleX size={14}/>
          </button>
        </div>
      ) : null
    )}
  </div>
)}

      {/* ------------------------------------------------------------------ */}
      {/* 📋 TABLE */}
      {/* ------------------------------------------------------------------ */}
      <div className="overflow-x-auto">
       <div className="overflow-x-auto">
          {loading ? (
            <Loader />
          ) : (
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
          )}
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* 📄 PAGINATION */}
      {/* ------------------------------------------------------------------ */}
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

      {/* ------------------------------------------------------------------ */}
      {/* 🟢 ADD MODAL */}
      {/* ------------------------------------------------------------------ */}
      <ModalCom
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add User Role"
        content={
          <AddRole
            onClose={() => setIsAddModalOpen(false)}
          />
        }
      />

      {/* ------------------------------------------------------------------ */}
      {/* ✏️ EDIT MODAL */}
      {/* ------------------------------------------------------------------ */}
      <ModalCom
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title="Update User Role"
        content={
          <UpdateRole
            selectedData={selectedData}
            onClose={() => setIsEditModalOpen(false)}
          />
        }
      />

    </div>
  );
};

export default Role;