import { FaChevronLeft, FaChevronRight, FaEllipsisH } from 'react-icons/fa';
import Link from 'next/link';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export default function Pagination({ currentPage, totalPages }: PaginationProps) {
  const getPageLink = (page: number) => {
    return `/blog?page=${page}`;
  };

  const renderPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let endPage = Math.min(totalPages, startPage + maxVisible - 1);

    if (endPage - startPage + 1 < maxVisible) {
      startPage = Math.max(1, endPage - maxVisible + 1);
    }

    if (startPage > 1) {
      pages.push(
        <Link
          key={1}
          href={getPageLink(1)}
          className="px-4 py-2 border text-sm font-medium rounded-md bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
        >
          1
        </Link>
      );
      if (startPage > 2) {
        pages.push(
          <span key="start-ellipsis" className="px-4 py-2">
            <FaEllipsisH className="text-gray-400" />
          </span>
        );
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <Link
          key={i}
          href={getPageLink(i)}
          className={`px-4 py-2 border text-sm font-medium rounded-md ${
            currentPage === i
              ? 'bg-blue-600 text-white border-blue-600'
              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
          }`}
        >
          {i}
        </Link>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pages.push(
          <span key="end-ellipsis" className="px-4 py-2">
            <FaEllipsisH className="text-gray-400" />
          </span>
        );
      }
      pages.push(
        <Link
          key={totalPages}
          href={getPageLink(totalPages)}
          className="px-4 py-2 border text-sm font-medium rounded-md bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
        >
          {totalPages}
        </Link>
      );
    }

    return pages;
  };

  return (
    <nav className="flex items-center justify-between mt-12 px-4 sm:px-0">
      <div className="flex-1 flex justify-start">
        {currentPage > 1 ? (
          <Link
            href={getPageLink(currentPage - 1)}
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            <FaChevronLeft className="mr-2 h-4 w-4" />
            Previous
          </Link>
        ) : (
          <button
            disabled
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-300 bg-white cursor-not-allowed"
          >
            <FaChevronLeft className="mr-2 h-4 w-4" />
            Previous
          </button>
        )}
      </div>

      <div className="hidden md:flex items-center gap-2">
        {renderPageNumbers()}
      </div>

      <div className="flex-1 flex justify-end">
        {currentPage < totalPages ? (
          <Link
            href={getPageLink(currentPage + 1)}
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
          >
            Next
            <FaChevronRight className="ml-2 h-4 w-4" />
          </Link>
        ) : (
          <button
            disabled
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-300 bg-white cursor-not-allowed"
          >
            Next
            <FaChevronRight className="ml-2 h-4 w-4" />
          </button>
        )}
      </div>
    </nav>
  );
}