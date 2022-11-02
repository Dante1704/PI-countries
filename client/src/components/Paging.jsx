import React from "react";
import "../style/Paging.css";

const Paging = ({ allCountries, paginate, currentPage }) => {

    const pageNumbers = [];

    //pusheo la cantidad de paginas que voy a ncesitar tener 
    for (let i = 0; i < allCountries.length; i++) {/* Math.ceil(allCountries / countriesPerPage) */
        pageNumbers.push(i)
    };


    return (
        <div className="paging-nav">

            <ul className="paging">
                <li><button className="buttons" onClick={() => {
                    currentPage > 0 ? paginate((currentPage - 1)) : paginate(currentPage)
                }}>prev</button></li>
                {pageNumbers && pageNumbers.map(numPage => {
                    return <li key={numPage}><button className="buttons" onClick={() => paginate(numPage)}>{numPage + 1}</button></li>
                })}
                <li><button className="buttons" onClick={() => {
                    currentPage < allCountries.length - 1 ? paginate((currentPage + 1)) : paginate(currentPage)
                }}>next</button></li>
            </ul>
        </div >
    )
}


export default Paging;