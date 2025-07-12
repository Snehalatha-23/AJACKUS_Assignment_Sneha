//pagination implementation
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {//props for pagination
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}
export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 px-6 py-4 bg-gradient-to-r from-gray-50 to-white border-t border-gray-200/50">
      <div className="text-sm text-gray-600 flex items-center gap-1">
        Page <span className="font-semibold text-gray-900">{currentPage}</span> of{' '}
        <span className="font-semibold text-gray-900">{totalPages}</span>
      </div>

      <div className="flex justify-center flex-1 sm:justify-end">
        <nav className="relative z-0 inline-flex rounded-xl shadow-sm" aria-label="Pagination">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="relative inline-flex items-center px-3 py-2 rounded-l-xl border border-gray-200 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            <span className="sr-only">Previous</span>
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div className="hidden sm:flex">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => onPageChange(page)}
                className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium transition-all duration-200
                  ${page === currentPage
                    ? 'z-10 border-indigo-500 bg-gradient-to-r from-indigo-50 to-purple-50 text-indigo-600'
                    : 'border-gray-200 bg-white text-gray-500 hover:bg-gray-50'
                  } ${page === 1 ? '-ml-px' : ''}`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="relative inline-flex items-center px-3 py-2 rounded-r-xl border border-gray-200 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            <span className="sr-only">Next</span>
            <ChevronRight className="h-5 w-5" />
          </button>
        </nav>
      </div>
    </div>
  );
}