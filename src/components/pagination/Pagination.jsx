import React from "react";
import { Button, Stack, Typography, useMediaQuery, MenuItem, Select } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const Pagination = ({
  currentPage,
  setCurrentPage,
  totalPages,
  totalRecords,
  rowsPerPage,
  setRowsPerPage,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
  };

  const handleRowsChange = (event) => {
    setRowsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const isTooManyPages = totalPages > 5;
  const startPage = Math.max(currentPage - 1, 1);
  const endPage = Math.min(currentPage + 1, totalPages);

  const buttonFontSize = {
    xs: "0.55rem",
    sm: "0.7rem",
    md: "0.8rem",
  };

  const buttonPadding = {
    xs: "2px 6px",
    sm: "3px 10px",
    md: "4px 12px",
  };

  const baseButton = {
    fontSize: buttonFontSize,
    px: buttonPadding,
    borderRadius: "6px",
    minWidth: { xs: 28, sm: 34, md: 40 },
    transition: "all 0.2s ease",
    textTransform: "none",
  };

  const primaryContained = {
    ...baseButton,
    backgroundColor: "var(--btn-primary-bg)",
    color: "var(--btn-text-color)",
    "&:hover": {
      backgroundColor: "var(--btn-primary-hover)",
      transform: "translateY(-1px)",
    },
  };

  const primaryOutlined = {
    ...baseButton,
    border: "1px solid var(--btn-primary-bg)",
    color: "var(--btn-primary-bg)",
    backgroundColor: "transparent",
    "&:hover": {
      backgroundColor: "var(--btn-primary-bg)",
      color: "var(--btn-text-color)",
      transform: "translateY(-1px)",
    },
  };

  return (
    <Stack
      direction="column"
      alignItems="center"
      spacing={1.2}
      sx={{ mt: { xs: 1, sm: 2 }, textAlign: "center" }}
    >
      {/* === Pagination Buttons === */}
      <Stack
        direction="row"
        spacing={isMobile ? 0.5 : 1}
        justifyContent="center"
        alignItems="center"
        sx={{
          flexWrap: "wrap",
          rowGap: { xs: 0.5, sm: 1 },
        }}
      >
        {/* Prev */}
        <Button
          variant="outlined"
          size="small"
          sx={primaryOutlined}
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Prev
        </Button>

        {/* First */}
        <Button
          variant={currentPage === 1 ? "contained" : "outlined"}
          size="small"
          sx={currentPage === 1 ? primaryContained : primaryOutlined}
          onClick={() => handlePageChange(1)}
        >
          1
        </Button>

        {/* Ellipsis */}
        {isTooManyPages && currentPage > 3 && (
          <Typography variant="body2" sx={{ fontSize: buttonFontSize }}>
            ...
          </Typography>
        )}

        {/* Middle Pages */}
        {Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i)
          .filter((page) => page > 1 && page < totalPages)
          .map((page) => (
            <Button
              key={page}
              variant={currentPage === page ? "contained" : "outlined"}
              size="small"
              sx={currentPage === page ? primaryContained : primaryOutlined}
              onClick={() => handlePageChange(page)}
            >
              {page}
            </Button>
          ))}

        {/* Ellipsis */}
        {isTooManyPages && currentPage < totalPages - 2 && (
          <Typography variant="body2" sx={{ fontSize: buttonFontSize }}>
            ...
          </Typography>
        )}

        {/* Last */}
        {totalPages > 1 && (
          <Button
            variant={currentPage === totalPages ? "contained" : "outlined"}
            size="small"
            sx={currentPage === totalPages ? primaryContained : primaryOutlined}
            onClick={() => handlePageChange(totalPages)}
          >
            {totalPages}
          </Button>
        )}

        {/* Next */}
        <Button
          variant="outlined"
          size="small"
          sx={primaryOutlined}
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </Button>
      </Stack>

      {/* === Rows & Info Section === */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        alignItems="center"
        justifyContent="space-between"
        spacing={{ xs: 0.5, sm: 2 }}
        sx={{
          width: "100%",
          maxWidth: 480,
          mt: 1,
          color: "var(--color-text-light)",
          fontSize: { xs: "0.75rem", sm: "0.85rem" },
        }}
      >
        {/* Rows per page selector */}
        <Stack direction="row" alignItems="center" spacing={0.5}>
          <Typography variant="body2">Rows per page:</Typography>
          <Select
            size="small"
            value={rowsPerPage}
            onChange={handleRowsChange}
            sx={{
              fontSize: "0.8rem",
              height: "1.8rem",
              borderRadius: "6px",
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "var(--btn-primary-bg)",
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "var(--btn-primary-hover)",
              },
              "& .MuiSelect-select": {
                padding: "2px 8px",
              },
            }}
          >
            {[2, 5, 20, 50].map((num) => (
              <MenuItem key={num} value={num}>
                {num}
              </MenuItem>
            ))}
          </Select>
        </Stack>

        {/* Total info */}
        <Typography variant="body2">
          Page <b>{currentPage}</b> of <b>{totalPages}</b> — Total{" "}
          <b>{totalRecords}</b> records
        </Typography>
      </Stack>
    </Stack>
  );
};

export default Pagination;
