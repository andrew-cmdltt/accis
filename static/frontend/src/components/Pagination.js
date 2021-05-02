import React from 'react';
import {NavLink} from "react-router-dom";

const Pagination = ({elementsPerPage, totalElements, paginate}) => {
    const pageNumbers = [];
    let url = window.location.hash
    url = url.replace('#/', '')
    for (let i = 1; i <= Math.ceil(totalElements / elementsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div>
            <nav>
                <ul className='pagination'>
                    {pageNumbers.map(number => (
                        <li key={number} className='page-item'>
                            <NavLink
                                onClick={() => paginate(number)}
                                to={`/${url}`}
                                className='page-link'
                            >
                                {number}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>
        </div>
    );
};

export default Pagination;
