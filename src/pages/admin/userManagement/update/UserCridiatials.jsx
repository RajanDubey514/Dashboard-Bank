import React, { useEffect } from "react";
import { useFormik } from "formik";

const modules = {
  dashboard: ["viewStats", "editWidgets", "create", "delete"],
  users: ["view", "create", "edit", "delete"],
  inventory: ["view", "edit", "create", "delete"],
  reports: ["view", "edit", "create", "delete"],
};

const UserCridiatials = ({ selectedData, dataList, setDataList, onClose }) => {
  const formik = useFormik({
    initialValues: {
      permissions: {
        dashboard: {
          enabled: false,
          viewStats: false,
          editWidgets: false,
          create: false,
          delete: false,
        },
        users: {
          enabled: false,
          view: false,
          create: false,
          edit: false,
          delete: false,
        },
        inventory: {
          enabled: false,
          view: false,
          edit: false,
          create: false,
          delete: false,
        },
        reports: {
          enabled: false,
          view: false,
          edit: false,
          create: false,
          delete: false,
        },
      },
      note: "",
    },
    enableReinitialize: true,

    onSubmit: (values) => {
      const updated = dataList.map((item) =>
        item.id === selectedData.id
          ? {
              ...item,
              credentials: values.permissions,
              note: values.note,
            }
          : item
      );

      setDataList(updated);
      onClose();
    },
  });

  // Prefill
  useEffect(() => {
    if (selectedData?.credentials) {
      formik.setFieldValue("permissions", selectedData.credentials);
      formik.setFieldValue("note", selectedData.note || "");
    }
  }, [selectedData]);

  const handleMasterToggle = (moduleName, checked) => {
    formik.setFieldValue(`permissions.${moduleName}.enabled`, checked);

    modules[moduleName].forEach((field) => {
      formik.setFieldValue(`permissions.${moduleName}.${field}`, checked);
    });
  };

  return (
    <div className="p-2 bg-gray-50 rounded-lg">
      <form onSubmit={formik.handleSubmit} className="space-y-6">

        {/* ===== PERMISSION CARDS ===== */}
        {Object.keys(modules).map((module) => (
          <fieldset
            key={module}
            className="border  border-gray-200 bg-white shadow-sm hover:shadow-md rounded-xl p-5 transition-all"
          >
            {/* LEGEND TITLE */}
            <legend className="px-2 text-xs text-indigo-700 font-semibold  capitalize flex items-center gap-2">
              <input
                type="checkbox"
                className="h-3 w-3"
                checked={formik.values.permissions[module].enabled}
                onChange={(e) => handleMasterToggle(module, e.target.checked)}
              />
              {module}
            </legend>

            {/* CHECKBOX GRID */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-4">
              {modules[module].map((p) => (
                <label
                  key={p}
                  className={`flex items-center gap-2 text-xs capitalize 
                  ${formik.values.permissions[module].enabled ? "text-gray-800" : "text-gray-400"}`}
                >
                  <input
                    type="checkbox"
                    className="h-3 w-3"
                    disabled={!formik.values.permissions[module].enabled}
                    checked={formik.values.permissions[module][p]}
                    onChange={(e) =>
                      formik.setFieldValue(
                        `permissions.${module}.${p}`,
                        e.target.checked
                      )
                    }
                  />
                  {p.replace(/([A-Z])/g, " $1")}
                </label>
              ))}
            </div>
          </fieldset>
        ))}

        {/* ===== NOTES FIELD ===== */}
        <div className="flex flex-col gap-1">
          <label className="font-medium text-gray-700 text-xs">Additional Notes</label>
          <textarea
            name="note"
            rows="3"
            className="border rounded-lg p-3 text-xs bg-white shadow-sm focus:ring-2 focus:ring-indigo-400 outline-none transition"
            value={formik.values.note}
            onChange={formik.handleChange}
            placeholder="Write notes here..."
          />
        </div>

        {/* ===== ACTION BUTTONS ===== */}
        <div className="p-3 flex justify-end gap-4 bg-white sticky -bottom-4">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 text-xs font-medium border border-red-400 text-red-600 rounded-lg hover:bg-red-50 transition"
          >
            Close
          </button>

          <button
            type="submit"
            className="px-6 py-2 text-xs font-medium bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-md transition"
          >
            Save Permissions
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserCridiatials;
