import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  TextField,
  MenuItem,
  Button,
  Typography,
} from "@mui/material";
import {Grid} from "@mui/material";
import { alertSuccess } from "../../../../components/alert/Alert";

// ✅ Required label with red asterisk
const RequiredLabel = ({ label }) => (
  <Typography
    component="span"
    sx={{ color: "#000", fontSize: 14, fontWeight: 500 }}
  >
    {label}
    <Typography component="span" sx={{ color: "red", ml: 0.3 }}>
      (*)
    </Typography>
  </Typography>
);

// ✅ Validation schema
const validationSchema = Yup.object({
  followUpActivity: Yup.string().required("Follow Up Activity is required"),
  followUpActivityType: Yup.string().required(
    "Follow Up Activity Type is required"
  ),
  priority: Yup.string().required("Priority is required"),
  followUpStatus: Yup.string().required("Follow Up Status is required"),
  dueDateTime: Yup.string().required("Due Date/Time is required"),
  reminderDateTime: Yup.string().required("Reminder Date/Time is required"),
});

const AddFollowUpActivity = ({ dataList, setDataList }) => {
  const formik = useFormik({
    initialValues: {
      dueDateTime: "",
      reminderDateTime: "",
      remarks: "",
      followUpStatusReason: "",
      assignFollowUp: "",
      followUpActivity: "",
      followUpActivityType: "",
      priority: "",
      followUpStatus: "",
    },
    validationSchema,
    onSubmit: (values, { resetForm }) => {
      const formData = { ...values, id: Date.now() };
      if (setDataList) setDataList((prev) => [...prev, formData]);
      alertSuccess("Follow-up activity saved successfully!");
      resetForm();
    },
  });

  return (
    <Box
      sx={{
        backgroundColor: "#f3f4f6",
        borderRadius: 2,
        display: "flex",
        flexDirection: "column",
        height: "75vh",
      }}
    >
      {/* ✅ Scrollable Form Section */}
      <Box
        sx={{
          flex: 1,
          overflowY: "auto",
          p: 3,
        }}
      >
        <form onSubmit={formik.handleSubmit} id="addFollowUpForm">
          <Grid container spacing={2} sx={{  }}>
            {/* ✅ Input Fields */}
            {[
              { label: "Due Date/Time", name: "dueDateTime", required: true },
              {
                label: "Reminder Date/Time",
                name: "reminderDateTime",
                required: true,
              },
              { label: "Remarks", name: "remarks" },
              { label: "Follow Up Status Reason", name: "followUpStatusReason" },
              { label: "Assign Follow Up", name: "assignFollowUp" },
            ].map((field) => (
              <Grid key={field.name} size={{ xs: 12, sm: 6 }}>
               <TextField
                  size="small"
                  fullWidth
                  label={
                    field.required ? (
                      <RequiredLabel label={field.label} />
                    ) : (
                      field.label
                    )
                  }
                  name={field.name}
                  value={formik.values[field.name]}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched[field.name] &&
                    Boolean(formik.errors[field.name])
                  }
                  helperText={
                    formik.touched[field.name] && formik.errors[field.name]
                  }
                />
              </Grid>
            ))}

            {/* ✅ Select Dropdowns */}
            {[
              { label: "Follow Up Activity", name: "followUpActivity" },
              { label: "Follow Up Activity Type", name: "followUpActivityType" },
              { label: "Priority", name: "priority" },
              { label: "Follow Up Status", name: "followUpStatus" },
            ].map((selectField) => (
              <Grid key={selectField.name} size={{ xs: 12, sm: 6 }}>
                <TextField
                  select
                  fullWidth
                  size="small"
                  label={<RequiredLabel label={selectField.label} />}
                  name={selectField.name}
                  value={formik.values[selectField.name]}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched[selectField.name] &&
                    Boolean(formik.errors[selectField.name])
                  }
                  helperText={
                    formik.touched[selectField.name] &&
                    formik.errors[selectField.name]
                  }
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "10px",
                      backgroundColor: "#fff",
                    },
                    "& .MuiInputLabel-root": { fontSize: 14 },
                  }}
                >
                  {["Option 1", "Option 2", "Option 3"].map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            ))}
          </Grid>
        </form>
      </Box>

      {/* ✅ Fixed Footer Buttons */}
      <Box
        sx={{
          p: 2,
          borderTop: "1px solid #ddd",
          backgroundColor: "#fff",
          display: "flex",
          justifyContent: "center",
          gap: 2,
          position: "sticky",
          bottom: 0,
          zIndex: 10,
        }}
      >
        <Button
          type="submit"
          variant="contained"
          size="small"
          sx={{
            px: 4,
            textTransform: "none",
            borderRadius: "8px",
            backgroundColor: "#1976d2",
            "&:hover": { backgroundColor: "#125ea3" },
          }}
          form="addFollowUpForm"
        >
          Submit
        </Button>

        <Button
          type="button"
          variant="outlined"
          size="small"
          sx={{
            px: 4,
            textTransform: "none",
            borderRadius: "8px",
            color: "#d32f2f",
            borderColor: "#d32f2f",
            "&:hover": { borderColor: "#b71c1c", backgroundColor: "#fff5f5" },
          }}
          onClick={() => formik.resetForm()}
        >
          Reset
        </Button>
      </Box>
    </Box>
  );
};

export default AddFollowUpActivity;
