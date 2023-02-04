import React, {useState} from 'react';

const Pagination = ({meta, onPageChange}) => {
    const [currentPage, setCurrentPage] = useState(meta.current_page);

    const handlePageChange = page => {
        setCurrentPage(page);
        onPageChange(page);
    };

    const startPage = Math.max(1, currentPage - 2);
    const endPage = Math.min(meta.last_page, currentPage + 2);

    const pageNumbers = [];
    for(let i = startPage; i <= endPage; i++) {
        pageNumbers.push(i);
    }

    return (
        <ul className="pagination  justify-content-center">
            <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <a
                    className="page-link"
                    href="#"
                    aria-label="Previous"
                    onClick={() => handlePageChange(currentPage - 1)}
                >
                    <span aria-hidden="true">&laquo;</span>
                </a>
            </li>
            {pageNumbers.map(pageNumber => (
                <li key={pageNumber} className={`page-item ${pageNumber === currentPage ? 'active' : ''}`}>
                    <a className="page-link" href="#" onClick={() => handlePageChange(pageNumber)}>
                        {pageNumber}
                    </a>
                </li>
            ))}
            <li className={`page-item ${currentPage === meta.last_page ? 'disabled' : ''}`}>
                <a
                    className="page-link"
                    href="#"
                    aria-label="Next"
                    onClick={() => handlePageChange(currentPage + 1)}
                >
                    <span aria-hidden="true">&raquo;</span>
                </a>
            </li>
        </ul>
    );
};

export default Pagination;
