import React, { useState } from "react";
import {
  Edit,
  Trash2,
  Check,
  X,
  ChevronDown,
  ChevronUp,
  Eye,
} from "lucide-react";

import ColumnFilterModal from "../searchComp/ColumnFilterModal";
import UserCridiatials from "../../pages/admin/userManagement/update/UserCridiatials";
import ModalCom from "../modalComp/ModalCom";

const UserEditableTable = ({
  headers = [],
  rows = [],
  editRowId,
  editedData,
  handleEdit,
  handleSave,
  handleCancel,
  handleChange,
  editableFields = [],
  handleDelete,
  sortConfig,
  onSort,
  onColumnSearch,
  hideAction = false,
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedHeader, setSelectedHeader] = useState("");

  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const openModal = (header) => {
    setSelectedHeader(header);
    setModalOpen(true);
  };

  const getSortIcon = (header) => {
    if (!sortConfig || sortConfig.key !== header) {
      return <ChevronDown size={12} className="ml-1 text-gray-300" />;
    }

    return sortConfig.direction === "asc" ? (
      <ChevronUp size={12} className="ml-1 text-white" />
    ) : (
      <ChevronDown size={12} className="ml-1 text-white" />
    );
  };

  return (
    <div className="relative w-full rounded-lg border border-gray-200 shadow-sm bg-white overflow-hidden">
      <div className="max-h-[40vh] min-h-[40vh] overflow-auto scrollbar-hide">
        <table className="w-full table-auto border-collapse text-sm sm:text-base">
          {/* HEADER */}
          <thead className="bg-gray-500 text-white uppercase text-xs sticky top-0 z-20">
            <tr>
              {headers.map((header, index) => (
                <th
                  key={index}
                  className={`relative px-1.5 font-semibold border border-gray-500 whitespace-nowrap 
                    ${index === 0 ? "sticky left-0 bg-gray-600 z-30" : ""}`}
                >
                  <div className="flex items-center justify-between">
                    <span>{header}</span>

                    <button onClick={() => openModal(header)}>
                      {getSortIcon(header)}
                    </button>
                  </div>
                </th>
              ))}

              {!hideAction && (
                <th className="px-1.5 text-center text-xs font-semibold border border-gray-500 sticky right-0 bg-gray-600 z-60">
                  Action
                </th>
              )}
            </tr>
          </thead>

          {/* BODY */}
          <tbody>
            {rows.length > 0 ? (
              rows.map((row, rowIndex) => (
                <tr
                  key={row.id || rowIndex}
                  className={`${
                    rowIndex % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-gray-100`}
                >
                  {headers.map((header, colIndex) => (
                    <td
                      key={colIndex}
                      className={`px-1.5 border text-xs border-gray-200 text-gray-800 truncate max-w-[200px]
                      ${colIndex === 0 ? "sticky left-0 bg-gray-100 z-10" : ""}
                    `}
                      title={row[header]}
                    >
                      {row[header] === true ? (
                        <Check size={16} className="text-green-600 mx-auto" />
                      ) : row[header] === false ? (
                        <X size={16} className="text-red-500 mx-auto" />
                      ) : (
                        String(row[header] ?? "-")
                      )}
                    </td>
                  ))}

                  {/* ACTION COLUMN */}
                  {!hideAction && (
                    <td className="px-1.5 text-center border text-xs border-gray-200 sticky right-0 bg-gray-50 z-10">
                      <div className="flex items-center justify-center ">
                        {/* EDIT */}
                        <button
                          onClick={() => handleEdit(row.id)}
                          className="text-blue-600 text-xs hover:text-blue-800"
                          title="Edit"
                        >
                          <Edit size={15} />
                        </button>

                        {/* VIEW */}
                        <button
                          onClick={() => {
                            setSelectedUser(row);
                            setViewModalOpen(true);
                          }}
                          className="text-indigo-600 text-xs hover:text-indigo-800"
                          title="View Details"
                        >
                          <Eye size={15} />
                        </button>
                        {/* DELETE */}
                        <button
                          onClick={() => handleDelete(row.id)}
                          className="text-red-600 text-xs hover:text-red-800"
                          title="Delete"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={headers.length + (!hideAction ? 1 : 0)}
                  className="text-center py-6 text-gray-500"
                >
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* COLUMN FILTER MODAL */}
      <ColumnFilterModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        header={selectedHeader}
        onSort={onSort}
        onSearch={(header, value) => onColumnSearch(header, value)}
      />

      <ModalCom
        isOpen={viewModalOpen}
        onClose={() => setViewModalOpen(false)}
        title="User Credentials"
        content={
          <UserCridiatials
            userData={selectedUser}
            onClose={() => setViewModalOpen(false)}
          />
        }
      />
    </div>
  );
};

export default UserEditableTable;
