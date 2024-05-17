import React from 'react';

const Pagination = ({ customersPerPage, totalCustomers, paginate, currentPage }) => {
    const pageNumbers = [];
    const totalPages = Math.ceil(totalCustomers / customersPerPage);

    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
    }

    const renderPageNumbers = () => {
        const pages = [];
        let startPage = currentPage - 2;
        let endPage = currentPage + 2;

        if (startPage <= 0) {
            endPage += Math.abs(startPage) + 1;
            startPage = 1;
        }

        if (endPage > totalPages) {
            startPage -= (endPage - totalPages);
            endPage = totalPages;
            if (startPage <= 0) {
                startPage = 1;
            }
        }

        for (let i = startPage; i <= endPage; i++) {
            pages.push(
                <li key={i} className={`page-item ${currentPage === i ? 'active' : ''}`}>
                    <button onClick={() => paginate(i)} className="page-link">
                        {i}
                    </button>
                </li>
            );
        }

        return pages;
    };

    return (
        <nav>
            <ul className="pagination">
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button onClick={() => paginate(1)} className="page-link">
                        Primero
                    </button>
                </li>
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                    <button onClick={() => paginate(currentPage - 1)} className="page-link">
                        Anterior
                    </button>
                </li>
                {renderPageNumbers()}
                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <button onClick={() => paginate(currentPage + 1)} className="page-link">
                        Siguiente
                    </button>
                </li>
                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                    <button onClick={() => paginate(totalPages)} className="page-link">
                        Último
                    </button>
                </li>
            </ul>
        </nav>
    );
};

export default Pagination;
