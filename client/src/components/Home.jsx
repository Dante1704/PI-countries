import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getAllCountries, getAllActivities } from "../redux/actions";

import Country from "./CountryCard";
import Paging from "./Paging";
import Navigation from "./Navigation"

import "../style/Home.css"


const Home = () => {

    const [loading, setLoading] = useState(false);


    const allCountries = useSelector(state => state.countries); //26
    const countriesFiltered = useSelector(state => state.countriesFiltered);

    let currentCountries = allCountries;
    let notFoundMessage = ""; //si el filtro esta vacio se muestra esto

    //si hay algun filtro, que vengan aca los paises filtrados
    if (countriesFiltered.length > 0) {
        if (countriesFiltered[0][0] === "No Countries Found") { notFoundMessage = countriesFiltered[0][0] }
        else { currentCountries = countriesFiltered; }
    }

    //cuando se monta el componente, que traiga los paises del back-end
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getAllCountries());
        dispatch(getAllActivities())
        setLoading(true);
    }, [dispatch]);

    //PAGINADO

    const [currentPage, setCurrentPage] = useState(0); //empiezo en la pag 1

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };


    return (

        <>
            <Navigation setCurrentPage={setCurrentPage}/>
            <div className="home-countries-container">
                {!loading && <p>Loading</p>}
                <div className="countries-container">

                    {
                        notFoundMessage ? <p className="not-found-msg">{notFoundMessage}</p> :
                            currentCountries[currentPage]?.map(
                                (country, index) => {
                                    return (
                                        <Country
                                            flags={country.flags}
                                            country={country.name}
                                            continents={country.continents}
                                            id={country.id}
                                            key={index}
                                        />)
                                }
                            )
                    }
                </div>
                <div className="paging-container">

                    <Paging allCountries={currentCountries} paginate={paginate} currentPage={currentPage} />

                </div>
            </div>
        </>
    );
}

export default Home;