import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCountryByPopulation, cleanMessages, getAllCountries, getCountriesByName, getCountriesByContinent, getCountriesByActivity, getCountriesByOrder, cleanCountriesFiltered } from "../redux/actions";
import '../style/Navigation.css';

const Nav = () => {


    const [name, setName] = useState("");
    const [filter, setFilter] = useState({
        continent: "",
        activity: "",
        sorting: ""
    })

    const dispatch = useDispatch();
    const allActivities = useSelector(state => state.activities); //     [{beach} ,{ski}, {ski}]
    const errorMessage = useSelector(state => state.errorMessage);

    //hago que los nombres de las actividades no se muestren repetidas en el filtro
    const activitiesFiltered = [];
    allActivities.forEach(activity => {
        if (!activitiesFiltered.includes(activity.name)) activitiesFiltered.push(activity.name)
    });

    const changeHandler = (event) => {
        setName(event.target.value);
    };

    const clickHandler = (event) => {
        dispatch(getCountriesByName(name))
    };

    const changeHandlerForContinent = (event) => {
        const continentName = event.target.value;
        setFilter({ ...filter, continent: continentName })
        dispatch(getCountriesByContinent({ continent: continentName }))
    };

    const changeHandlerForActivity = (event) => {
        const activityName = event.target.value;

        if (!filter.activity && !filter.continent) {
            dispatch(cleanCountriesFiltered());
            setFilter({ ...filter, activity: activityName });
            dispatch(getCountriesByActivity({ activity: activityName }))
        }
        else {
            dispatch(cleanCountriesFiltered());
            dispatch(getCountriesByContinent({ continent: filter.continent }));
            dispatch(getCountriesByActivity({ activity: activityName }));
            setFilter({ ...filter, activity: activityName });
        }
    };

    const clickHandlerForOrder = (event) => {
        const order = event.target.value; //"Population = 2072"
        if (order === "2072") {
            dispatch(getCountryByPopulation(order));
        } else {
            setFilter({ ...filter, sorting: order })
            dispatch(getCountriesByOrder({ order: order }))
        }
    }

    const clickCleanHandler = (event) => {
        dispatch(cleanCountriesFiltered());
        setFilter({
            continent: "",
            activity: "",
            sorting: ""
        })
        dispatch(getAllCountries());
    }

    const clickSearchHandler = (event) => {
        event.target.value = "";
        dispatch(cleanMessages());
    }

    return (
        <>
            <div className="header">
                <div>
                    <label htmlFor="name" className="search-title"><h2 className="search-title">SEARCH BY NAME</h2></label>
                    <input type="text" name="name" id="name" className="f-z-large" onChange={changeHandler} onClick={clickSearchHandler} />
                    <button type="submit" className="buttons" onClick={clickHandler}>Search</button>
                    {errorMessage && <p className="error-message f-z-large">{errorMessage}</p>}
                </div>
                <Link to="/activity" className="create-link">Create Activity</Link>
            </div >
            <div className="menu-filters">
                <form >
                    <fieldset className="filters">
                        <legend><h2>FILTERS</h2></legend>

                        <h4>CHOOSE A CONTINENT:</h4>
                        <div className="continent-options">
                            <input type="radio" name="continent" id="Antarctica" value="Antarctica" onChange={changeHandlerForContinent} />
                            <label htmlFor="Antarctica" className="f-z-large" checked> Antarctica</label>

                            <input type="radio" name="continent" id="Africa" value="Africa" onChange={changeHandlerForContinent} />
                            <label htmlFor="Africa" className="f-z-large"> Africa</label>

                            <input type="radio" name="continent" id="Asia" value="Asia" onChange={changeHandlerForContinent} />
                            <label htmlFor="Asia" className="f-z-large"> Asia</label>

                            <input type="radio" name="continent" id="Europe" value="Europe" onChange={changeHandlerForContinent} />
                            <label htmlFor="Europe" className="f-z-large"> Europe</label>

                            <input type="radio" name="continent" id="South America" value="South America" onChange={changeHandlerForContinent} />
                            <label htmlFor="South America" className="f-z-large"> South America</label>

                            <input type="radio" name="continent" id="North America" value="North America" onChange={changeHandlerForContinent} />
                            <label htmlFor="North America" className="f-z-large"> North America</label>

                            <input type="radio" name="continent" id="Oceania" value="Oceania" onChange={changeHandlerForContinent} />
                            <label htmlFor="Oceania" className="f-z-large"> Oceania</label>
                        </div>

                        <label htmlFor="activities"><h4>CHOOSE AN ACTIVITY:</h4></label>
                        <div>
                            <select name="activity" id="activities" onChange={changeHandlerForActivity}>
                                <option value="" >--Please choose an option--</option>
                                {
                                    activitiesFiltered?.map(
                                        (activity, index) =>
                                            <option value={activity} key={index}>{activity}</option>
                                    )
                                }
                            </select>
                        </div>

                        <h4>CHOSE A TYPE OF SORTING:</h4>
                        <div className="sorting-filter">
                            <input type="button" value="A To Z" className="buttons" onClick={clickHandlerForOrder} />
                            <input type="button" value="Z To A" className="buttons" onClick={clickHandlerForOrder} />
                            <input type="button" value="By Population Asc" className="buttons" onClick={clickHandlerForOrder} />
                            <input type="button" value="By Population Des" className="buttons" onClick={clickHandlerForOrder} />
                            <input type="button" value="2072" className="buttons" onClick={clickHandlerForOrder} />
                        </div>
                    </fieldset>
                    <button type="reset" className="btn-clean buttons" onClick={clickCleanHandler}>Clean Filters</button>
                </form>
            </div>
        </>
    )
};

export default Nav

