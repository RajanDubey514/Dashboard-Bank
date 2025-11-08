import React from "react";
import { Button, Stack, Typography, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const Pagination = ({ currentPage, setCurrentPage, totalPages }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));

  const handlePageChange = (newPage) => {
    if (newPage < 1 || newPage > totalPages) return;
    setCurrentPage(newPage);
  };

  const renderPagination = () => {
    const isTooManyPages = totalPages > 5;
    const startPage = Math.max(currentPage - 1, 1);
    const endPage = Math.min(currentPage + 1, totalPages);

    const buttonFontSize = {
      xs: "0.55rem", // Mobile
      sm: "0.7rem",  // Tablet
      md: "0.8rem",  // Desktop
    };

    const buttonPadding = {
      xs: "2px 5px",
      sm: "3px 8px",
      md: "4px 10px",
    };

    return (
      <Stack
        direction="row"
        spacing={isMobile ? 0.5 : 1}
        justifyContent="center"
        alignItems="center"
        sx={{
          flexWrap: "wrap",
          mt: { xs: 1, sm: 1.5, md: 2 },
          rowGap: { xs: 0.5, sm: 1 },
        }}
      >
        {/* Prev Button */}
        <Button
          variant="outlined"
          size="small"
          sx={{
            fontSize: buttonFontSize,
            px: buttonPadding,
            minWidth: { xs: 40, sm: 50, md: 60 },
          }}
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
        >
          Prev
        </Button>

        {/* Always show first page */}
        <Button
          variant={currentPage === 1 ? "contained" : "outlined"}
          color={currentPage === 1 ? "primary" : "inherit"}
          size="small"
          sx={{
            fontSize: buttonFontSize,
            px: buttonPadding,
            minWidth: { xs: 28, sm: 34, md: 40 },
          }}
          onClick={() => handlePageChange(1)}
        >
          1
        </Button>

        {/* Ellipsis (if far from start) */}
        {isTooManyPages && currentPage > 3 && (
          <Typography variant="body2" sx={{ fontSize: buttonFontSize }}>
            ...
          </Typography>
        )}

        {/* Middle Pages */}
        {Array.from(
          { length: endPage - startPage + 1 },
          (_, i) => startPage + i
        ).map((page) => {
          if (page > 1 && page < totalPages) {
            return (
              <Button
                key={page}
                variant={currentPage === page ? "contained" : "outlined"}
                color={currentPage === page ? "primary" : "inherit"}
                size="small"
                sx={{
                  fontSize: buttonFontSize,
                  px: buttonPadding,
                  minWidth: { xs: 28, sm: 34, md: 40 },
                }}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </Button>
            );
          }
          return null;
        })}

        {/* Ellipsis (if far from end) */}
        {isTooManyPages && currentPage < totalPages - 2 && (
          <Typography variant="body2" sx={{ fontSize: buttonFontSize }}>
            ...
          </Typography>
        )}

        {/* Always show last page */}
        {totalPages > 1 && (
          <Button
            variant={currentPage === totalPages ? "contained" : "outlined"}
            color={currentPage === totalPages ? "primary" : "inherit"}
            size="small"
            sx={{
              fontSize: buttonFontSize,
              px: buttonPadding,
              minWidth: { xs: 28, sm: 34, md: 40 },
            }}
            onClick={() => handlePageChange(totalPages)}
          >
            {totalPages}
          </Button>
        )}

        {/* Next Button */}
        <Button
          variant="outlined"
          size="small"
          sx={{
            fontSize: buttonFontSize,
            px: buttonPadding,
            minWidth: { xs: 40, sm: 50, md: 60 },
          }}
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
        >
          Next
        </Button>
      </Stack>
    );
  };

  return renderPagination();
};

export default Pagination;
