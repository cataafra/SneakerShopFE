import { IconButton, Button } from "@mui/material";
import { LastPage, NavigateBefore, NavigateNext } from "@mui/icons-material/";

const Pagination = ({
  currentPage = 10,
  totalPages = 100,
  onPageChange = () => {},
}) => {
  const pageNumbers = [];
  if (totalPages <= 15) {
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  } else {
    const leftBoundary = Math.max(currentPage - 5, 5);
    const rightBoundary = Math.min(currentPage + 5, totalPages - 5);
    console.log("left: ", leftBoundary, "right: ", rightBoundary);

    for (let i = 1; i < 6; i++) {
      pageNumbers.push(i);
    }

    if (leftBoundary >= 5) {
      pageNumbers.push("...");
    }
    for (let i = leftBoundary; i <= rightBoundary; i++) {
      pageNumbers.push(i);
    }
    if (rightBoundary < totalPages - 5) {
      pageNumbers.push("...");
    }

    for (let i = totalPages - 4; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  }

  console.log("page numbers: ", ...pageNumbers);

  return (
    <div className="pagination">
      <IconButton
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <NavigateBefore />
      </IconButton>
      {pageNumbers.map((page) => {
        if (page === "...") {
          return <span>{"..."}</span>;
        }
        return (
          <Button
            key={page}
            sx={{ borderRadius: "50%", width: "72px", height: "72px" }}
            variant={currentPage === page ? "contained" : "text"}
            onClick={() => onPageChange(page)}
          >
            {page}
          </Button>
        );
      })}
      <IconButton
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === LastPage}
      >
        <NavigateNext />
      </IconButton>
    </div>
  );
};

export default Pagination;
