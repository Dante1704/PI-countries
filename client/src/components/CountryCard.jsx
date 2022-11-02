//componente dumb que uso para mostrar cada pais
import React from "react";
import { Link } from "react-router-dom";
import "../style/CountryCard.css";

const Country = ({ flags, country, continents, id }) => { //por props me vienen todos los datos que voy a mostrar 

    return (
        <div className="country-card">

            <img src={flags} alt={`flag of ${country}`} className="flag-img" />
            <p className="f-z-large">{country}</p>
            <p className="f-z-large">{continents}</p>
            <Link to={`/countries/${id}`} className="link-see-more f-z-large">SEE MORE...</Link>

        </div>
    )

};

export default Country;


