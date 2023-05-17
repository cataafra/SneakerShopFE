import { IconButton, Button } from "@mui/material";
import { LastPage, NavigateBefore, NavigateNext } from "@mui/icons-material/";

const Pagination = ({
  currentPage = 10,
  totalPages = 100,
                      onPageChange = () => {},
                    }) => {
  const pageNumbers = [];
  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(i);
    }
  } else {
    const leftBoundary = Math.max(currentPage - 2, 2);
    const rightBoundary = Math.min(currentPage + 2, totalPages - 1);
    pageNumbers.push(1);
    if (leftBoundary > 2) {
      pageNumbers.push("...");
    }
    for (let i = leftBoundary; i <= rightBoundary; i++) {
      pageNumbers.push(i);
    }
    if (rightBoundary < totalPages - 1) {
      pageNumbers.push("...");
    }
    pageNumbers.push(totalPages);
  }


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
