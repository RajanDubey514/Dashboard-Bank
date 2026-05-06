import API from "./api";

// GET
export const getData = (url, params) => {
  return API.get(url, { params });
};

// POST
export const postData = (url, data) => {
  return API.post(url, data);
};

// PATCH
export const patchData = (url, data) => {
  return API.patch(url, data);
};

// DELETE
export const deleteData = (url) => {
  return API.delete(url);
};

// FILE UPLOAD
export const uploadFile = (url, file, fieldName = "avatar") => {
  const formData = new FormData();
  formData.append(fieldName, file); // ✅ yaha actual file

  return API.patch(url, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};


export const uploadFilePost = (url, file) => {
  const formData = new FormData();
  formData.append("file", file);

  return API.post(url, formData);
};