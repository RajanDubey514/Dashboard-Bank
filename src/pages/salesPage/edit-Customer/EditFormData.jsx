import React , {useState , useEffect} from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  Paper,
   Grid,
  TextField,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Typography,
} from "@mui/material";
import { alertSuccess } from "../../../components/alert/Alert";

const validationSchema = Yup.object({
  accountName: Yup.string().required("Account Name is required"),
  accountCode: Yup.string().required("Account Code is required"),
  city: Yup.string().required("City is required"),
  address: Yup.string().required("Address is required"),
  companyName: Yup.string().required("Company Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  mobile: Yup.string()
    .matches(/^[0-9]{10}$/, "Enter valid 10-digit mobile")
    .required("Mobile is required"),
  website: Yup.string().url("Enter valid URL").required("Website is required"),
  mfgCode: Yup.string().required("MFG Code is required"),
  state: Yup.string().required("State is required"),
  group: Yup.string().required("Group is required"),
  country: Yup.string().required("Country is required"),
  logo: Yup.mixed().required("Logo is required"),
  type: Yup.string().required("Select type"),
});

const EditFormData = ({ selectedData, dataList, setDataList, closeEditModal }) => {
  const formik = useFormik({
    initialValues: {
      accountName: "",
      accountCode: "",
      city: "",
      address: "",
      companyName: "",
      email: "",
      mobile: "",
      website: "",
      mfgCode: "",
      state: "",
      group: "",
      country: "",
      logo: null,
      type: "",
    },
    validationSchema,
    onSubmit: (values) => {
      // 🔹 Update existing record
      const updatedData = dataList.map((item) =>
        item.id === selectedData.id
          ? { ...item, ...values, logo: values.logo?.name || item.logo }
          : item
      );

      setDataList(updatedData);
      alertSuccess("Data updated successfully!");
      closeEditModal(); // optional
    },
  });

   // 🔹 Prefill data when modal opens
  useEffect(() => {
    if (selectedData) {
      formik.setValues({
        ...selectedData,
        logo: selectedData.logo || null,
      });
    }
  }, [selectedData]);

  return (
    <Paper className="formPaper" sx={{ p: 2 }}>
      <Box className="scroll-container" sx={{ maxHeight: 400, overflowY: "auto" }}>
        <form onSubmit={formik.handleSubmit}>
          <Grid container spacing={2}>
            {/* ---------- Text Fields ---------- */}
            {[
              { label: "Account Name", name: "accountName" },
              { label: "Account Code", name: "accountCode" },
              { label: "City", name: "city" },
              { label: "Address", name: "address" },
              { label: "Company Name", name: "companyName" },
              { label: "Email", name: "email" },
              { label: "Mobile", name: "mobile" },
              { label: "Website", name: "website" },
              { label: "MFG Code", name: "mfgCode" },
            ].map((field) => (
              <Grid key={field.name} size={{ xs: 6, md: 6 }} mt={2}>
                <TextField
                  fullWidth
                  size="small"
                  label={field.label}
                  name={field.name}
                  value={formik.values[field.name]}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched[field.name] && Boolean(formik.errors[field.name])}
                  helperText={formik.touched[field.name] && formik.errors[field.name]}
                />
              </Grid>
            ))}

            {/* ---------- Dropdowns ---------- */}
            <Grid size={{ xs: 6, md: 6 }}>
              <TextField
                select
                fullWidth
                size="small"
                label="State"
                name="state"
                value={formik.values.state}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.state && Boolean(formik.errors.state)}
                helperText={formik.touched.state && formik.errors.state}
              >
                {["Maharashtra", "Delhi", "UP"].map((state) => (
                  <MenuItem key={state} value={state}>
                    {state}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid size={{ xs: 6, md: 6 }}>
              <TextField
                select
                fullWidth
                size="small"
                label="Group"
                name="group"
                value={formik.values.group}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.group && Boolean(formik.errors.group)}
                helperText={formik.touched.group && formik.errors.group}
              >
                {["Retail", "Wholesale", "Manufacturing"].map((group) => (
                  <MenuItem key={group} value={group}>
                    {group}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid size={{ xs: 6, md: 6 }}>
              <TextField
                select
                fullWidth
                size="small"
                label="Country"
                name="country"
                value={formik.values.country}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.country && Boolean(formik.errors.country)}
                helperText={formik.touched.country && formik.errors.country}
              >
                {["India", "USA", "UK"].map((country) => (
                  <MenuItem key={country} value={country}>
                    {country}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            {/* ---------- File Upload ---------- */}
            <Grid size={{ xs: 6, md: 6 }}>
              <Button
                variant="outlined"
                component="label"
                fullWidth
                sx={{ textTransform: "none" }}
              >
                Upload Logo
                <input
                  type="file"
                  hidden
                  onChange={(e) =>
                    formik.setFieldValue("logo", e.currentTarget.files[0])
                  }
                />
              </Button>
              {formik.errors.logo && formik.touched.logo && (
                <Typography variant="caption" color="error">
                  {formik.errors.logo}
                </Typography>
              )}
            </Grid>

            {/* ---------- Radio Buttons ---------- */}
            <Grid size={{ xs: 6, md: 6 }}>
              <Typography fontWeight={600} fontSize="0.9rem" mb={0.5}>
                Type
              </Typography>
              <RadioGroup
                name="type"
                value={formik.values.type}
                onChange={formik.handleChange}
                row
              >
                <FormControlLabel
                  value="Yes"
                  control={<Radio size="small" />}
                  label="Yes"
                />
                <FormControlLabel
                  value="No"
                  control={<Radio size="small" />}
                  label="No"
                />
              </RadioGroup>
              {formik.errors.type && formik.touched.type && (
                <Typography variant="caption" color="error">
                  {formik.errors.type}
                </Typography>
              )}
            </Grid>

            {/* ---------- Submit ---------- */}
            <Grid xs={12}>
              <Box display="flex" justifyContent="center" pt={2}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="small"
                  sx={{ px: 4, textTransform: "none" }}
                >
                  Update
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Paper>
  );
};

export default EditFormData;
