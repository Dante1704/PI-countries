import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { cleanDetail, getCountryDetail } from "../redux/actions";
import CountryActivities from "./CountryActivities";

import "../style/CountryDetail.css";

const CountryDetail = (props) => {
    const id = props.match.params.id;

    const countryDetail = useSelector(state => state.countryDetail);
    const dispatch = useDispatch();


    useEffect(() => {
        dispatch(getCountryDetail(id)); //cuando se monta o se actualiza
        return function () { dispatch(cleanDetail()) }; // cuando se desmonta
    }, [dispatch, id]);

    let msjNoActivitiesFound = "";
    if (countryDetail["TouristicActivities"] === undefined || countryDetail["TouristicActivities"].length === 0)
        msjNoActivitiesFound = "No Activities Found";

    return (
        <div className="country-detail-container">
            <img src={countryDetail.flags} alt={`flag of ${countryDetail.name}`} className="flag" />
            <div className="country-detail">
                <div className="detail">
                    <p className="f-z-large">Name: {countryDetail.name}</p>
                    <p className="f-z-large">Continent: {countryDetail.continents}</p>
                    <p className="f-z-large">Country Code: {countryDetail.id}</p>
                    <p className="f-z-large">Capital: {countryDetail.capital}</p>
                    <p className="f-z-large">Subregion: {countryDetail.subregion}</p>
                    <p className="f-z-large">Area: {countryDetail.area} km2</p>
                    <p className="f-z-large">Population: {countryDetail.population}</p>
                </div>
                <div className="activities-container">
                    <p className="f-z-large">Touristic Activities:</p>
                    {
                        msjNoActivitiesFound ? <p className="not-found-msg f-z-large">{msjNoActivitiesFound}</p> :
                            countryDetail["TouristicActivities"]?.map(
                                (activity) => {
                                    return (
                                        <CountryActivities
                                            id={activity.id}
                                            name={activity.name}
                                            difficulty={activity.difficulty}
                                            duration={activity.duration}
                                            season={activity.season}
                                            key={activity.id}
                                        />
                                    )
                                }
                            )

                    }
                </div>
                <Link to="/home" className="buttons btn-home">Go Back Home</Link>
            </div>
        </div >

    )
}

export default CountryDetail;


/*[ ] Actividades turísticas con toda su información asociada */

/* {
    "id": 3,
    "name": "beach",
    "difficulty": 4,
    "duration": null,
    "season": "Summer",
    "TouristicActivityPerCountry": {
        "createdAt": "2022-10-17T14:17:55.123Z",
        "updatedAt": "2022-10-17T14:17:55.123Z",
        "CountryId": "ARG",
        "TouristicActivi": 3
    }
}  */