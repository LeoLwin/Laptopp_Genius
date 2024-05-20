/* eslint-disable react/prop-types */
import { useState } from 'react'

const Pagination = ({ totalData, itemsPerPage, onPageChange }) => {
    console.log(itemsPerPage)
    const [currentPage, setCurrentPage] = useState(1);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(currentPage * itemsPerPage, totalData) - 1;


    const handlePrevPage = () => {
        const newPage = currentPage - 1;
        setCurrentPage(newPage);
        onPageChange(newPage);
    };

    const handleNextPage = () => {
        const newPage = currentPage + 1;
        setCurrentPage(newPage);
        onPageChange(newPage);
    };

    return (
        <div className="flex flex-col items-center">
            <span className="text-sm text-gray-700 dark:text-gray-400">
                Showing <span className="font-semibold text-gray-900 dark:text-white">{startIndex + 1}</span> to <span className="font-semibold text-gray-900 dark:text-white">{endIndex + 1}</span> of <span className="font-semibold text-gray-900 dark:text-white">{totalData}</span> Entries
            </span>
            <div className="inline-flex mt-2 xs:mt-0 mb-5">
                <button className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 rounded-s hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" onClick={handlePrevPage} disabled={currentPage === 1} >
                    Prev
                </button>
                <button className="flex items-center justify-center px-3 h-8 text-sm font-medium text-white bg-gray-800 border-0 border-s border-gray-700 rounded-e hover:bg-gray-900 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white" onClick={handleNextPage} disabled={currentPage * itemsPerPage >= totalData}>
                    Next
                </button>
            </div>
        </div>
    )
}

export default Pagination