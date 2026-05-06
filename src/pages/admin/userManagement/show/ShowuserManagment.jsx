import React, { useEffect, useState , useRef} from "react";
import { PlusCircle , CircleX , Upload } from "lucide-react";
import Swal from "sweetalert2";

import ModalCom from "../../../../components/modalComp/ModalCom";
import Pagination from "../../../../components/pagination/Pagination";
import DownloadDataButton from "../../../../components/DownloadData/DownloadDataButton";

import { useDispatch , useSelector} from "react-redux";
import { getUsersData , bulkRegisterUsers} from "../../../../redux/slice/userAccount/UserAccountSlice";
import Loader from '../../../../components/loader/Loader'

// Common Components
import SelectBoxCommon from "../../../../components/searchComp/SelectBoxCommon";
import UserEditableTable from "../../../../components/tablecomp/UserEditableTable";
import AdduserManagment from "../add/AdduserManagment";
import UpdateuserManagment from "../update/UpdateuserManagment";
import { alertError, alertSuccess } from "../../../../components/alert/Alert";


const ShowuserManagment = () => {
  // 🔥 MAIN STATES

  const dispatch = useDispatch();
  const {userAccountList, loading } = useSelector((state) => state.UserAccountUse);

  const [dataList, setDataList] = useState([]);        // all data
  const [filteredData, setFilteredData] = useState([]); // filtered + searched result
  const [searchQuery, setSearchQuery] = useState("");   // search input
  const [filterType, setFilterType] = useState("all");  // filter dropdown
  const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });
  const fileInputRef = useRef();

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null); // row to edit

    const [columnSearchKeys, setColumnSearchKeys] = useState({});
  

  // ----------------------------------------------------------------------
  // 🚀 LOAD INITIAL DATA
  // ----------------------------------------------------------------------

  useEffect(() => {
    dispatch(getUsersData())
  }, [dispatch]);
    

  useEffect(() => {
    if (userAccountList && Array.isArray(userAccountList)) {
      setDataList(userAccountList);
      setFilteredData(userAccountList);
    } else {
      setDataList([]);
      setFilteredData([]);
    }
  }, [userAccountList]);


  // ----------------------------------------------------------------------
  // 🔍 FILTER + SEARCH LOGIC
  // ----------------------------------------------------------------------
 /** -------------------- FILTER + SEARCH -------------------- **/
   useEffect(() => {
  let updated = [...dataList];

  const selectedFilter = filterConfig.find(
    (f) => f.value === filterType
  );

  if (selectedFilter) {
    updated = updated.filter(selectedFilter.filterFn);
  }

  // 🔍 Search
  if (searchQuery) {
    const q = searchQuery.toLowerCase();
    updated = updated.filter((item) =>
      Object.values(item).some(
        (val) =>
          typeof val === "string" &&
          val.toLowerCase().includes(q)
      )
    );
  }

  setFilteredData(updated);
  setCurrentPage(1);
}, [filterType, searchQuery, dataList]);


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


  // ==============================
  // COLUMN SEARCH
  // ==============================
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
    const selected = dataList.find((item) => item._id === id);
    setSelectedData(selected);
    setIsEditModalOpen(true);
  };


  const isToday = (dateString) => {
  if (!dateString) return false;

  const today = new Date();
  const date = new Date(dateString);

  return (
    date.getDate() === today.getDate() &&
    date.getMonth() === today.getMonth() &&
    date.getFullYear() === today.getFullYear()
  );
};

  const filterConfig = [
  {
    label: "All",
    value: "all",
    filterFn: () => true,
  },
  {
    label: "New",
    value: "today",
     filterFn: (item) => isToday(item.createdAt), 
  },
  {
    label: "Active",
    value: "ACTIVE",
    filterFn: (item) => item.accountStatus === "ACTIVE",
  },
  {
    label: "Inactive",
    value: "INACTIVE",
    filterFn: (item) => item.accountStatus === "INACTIVE",
  },
];


const handleExcelUpload = async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  // 🔥 Confirmation popup
  const result = await Swal.fire({
    title: "Are you sure?",
    text: `Do you want to upload "${file.name}" ?`,
    icon: "question",
    showCancelButton: true,
    confirmButtonColor: "var(--color-primary)",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, Upload",
    cancelButtonText: "Cancel",
  });

  // ❌ user cancelled
  if (!result.isConfirmed) {
    e.target.value = null; // reset input
    return;
  }

  try {
    const res = await dispatch(bulkRegisterUsers(file)).unwrap();

    // ✅ Success alert
    await Swal.fire({
      title: "Success",
      text: res.message || "Users uploaded successfully",
      icon: "success",
      confirmButtonColor: "var(--color-primary)",
    });

    dispatch(getUsersData());
  } catch (err) {
    Swal.fire({
      title: "Error",
      text: err?.message || "Upload failed",
      icon: "error",
    });
  }

  e.target.value = null;
};

  // ----------------------------------------------------------------------
  // UI RENDER
  // ----------------------------------------------------------------------
  return (
    <div className="space-y-2 w-full">

      {/* ------------------------------------------------------------------ */}
      {/* 🔍 FILTER + SEARCH + ADD BUTTON */}
      {/* ------------------------------------------------------------------ */}

        {/* LEFT — Filter + Search */}
        <div className="">
          {/* Filter Select Box */}
          <SelectBoxCommon
           value={filterType}
            onChange={setFilterType}
            dataList={dataList}
            filterConfig={filterConfig}
          />
        </div>

      <div className="flex flex-col md:flex-row justify-end md:items-center gap-3">

        {/* RIGHT — Download + Add */}
       <div className="flex items-center gap-3">

          <DownloadDataButton data={filteredData} fileName="User List"/>

          {/* 📤 BULK UPLOAD BUTTON */}
          <button
            onClick={() => fileInputRef.current.click()}
            className="flex items-center gap-2 px-4 py-1 rounded-lg text-white text-xs font-semibold shadow transition-all duration-300 hover:shadow-lg"
            style={{ backgroundColor: "var(--color-primary)" }}
          >
            <Upload size={12} />
            Export Multi User
          </button>

          {/* hidden file input */}
          <input
            type="file"
            accept=".xlsx, .xls"
            ref={fileInputRef}
            hidden
            onChange={handleExcelUpload}
          />

          {/* ADD BUTTON */}
          <button
            onClick={handleAddClick}
            className="flex items-center gap-2 px-4 py-1 rounded-lg text-white text-xs font-semibold shadow transition-all duration-300 hover:shadow-lg"
            style={{ backgroundColor: "var(--color-primary)" }}
          >
            <PlusCircle size={12} />
            Add User
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
         {loading ? (
            <Loader />
          ) : (
        <UserEditableTable
          headers={headers}
          rows={paginatedData}
          handleEdit={handleEditClick}
          // handleDelete={handleDelete}
          sortConfig={sortConfig}
          onSort={onSort}
          onColumnSearch={handleColumnSearch}
          columnSearchKeys={columnSearchKeys}
        />
          )}
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* 📄 PAGINATION */}
      {/* ------------------------------------------------------------------ */}
      <div className="flex justify-center">
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
          totalRecords={dataList.length}
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
        title="Add User"
        content={
          <AdduserManagment
            dataList={dataList}
            setDataList={setDataList}
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
        title="Update User"
        content={
          <UpdateuserManagment
            selectedData={selectedData}
            onClose={() => setIsEditModalOpen(false)}
          />
        }
      />

    </div>
  );
};

export default ShowuserManagment;