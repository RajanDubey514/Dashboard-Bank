import Swal from "sweetalert2";
import "./alert.css";

// ✅ Success Toast
export const alertSuccess = (message) => {
  Swal.fire({
    icon: "success",
    text: message || "Operation was successful!",
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    showClass: { popup: "toastShow" },
    hideClass: { popup: "toastHide" },
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });
};

// ✅ Error Toast
export const alertError = (message) => {
  Swal.fire({
    icon: "error",
    text: message || "Something went wrong. Please try again.",
    toast: true,
    position: "top-end",
    showConfirmButton: false,
    timer: 6000,
    timerProgressBar: true,
    showClass: { popup: "toastShow" },
    hideClass: { popup: "toastHide" },
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  });
};

// ✅ Confirmation Dialog
export const alertConfirm = async (message) => {
  return await Swal.fire({
    title: message || "Are you sure?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Yes",
    cancelButtonText: "No",
    customClass: {
      popup: "swal2-custom-popup",
    },
  });
};
