import React from 'react'

const Pagination = ({ articlesPerPage, totalArticles, paginate }) => {
    const pageNumbers = []

    for (let i=1; i<= Math.ceil(totalArticles/articlesPerPage); i++){
        pageNumbers.push(i)
    } 
    return (
        <div>
            <ul className="pagination">
                {pageNumbers.map(number => (
                    <li key={number} className="pages">
                        <span role="button"onClick={() => paginate(number)}href="!#">
                            {number}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    )
}
export default Pagination 
