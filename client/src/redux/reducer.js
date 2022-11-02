//importo las acciones a usar
import {
    GET_ALL_COUNTRIES,
    GET_COUNTRIES_BY_NAME,
    GET_COUNTRIES_BY_CONTINENT,
    GET_ALL_ACTIVITIES,
    GET_COUNTRIES_BY_ACTIVITY,
    GET_COUNTRIES_BY_ORDER,
    CLEAN_COUNTRIES_FILTERED,
    CLEAN_DETAIL,
    GET_COUNTRY_DETAIL,
    CREATE_ACTIVITY,
    CLEAN_MESSAGES,
    GET_COUNTRY_BY_POPULATION
} from "./actions";

import { arrayOfArraysOfCountries, sortCountries, getCountriesByActivity } from "./utils";

//creo el estado inicial para el store 
const initialState = {
    countries: [],
    countriesFiltered: [], //todos los paises filtrados van a parar aca para no pisar el array original con todos 
    countryDetail: {},
    activities: [],
    errorMessage: "",
    successMessage: ""
};

const rootReducer = (state = initialState, action) => { // payload: { activity: activityName }
    console.log(state.countriesFiltered.length);
    switch (action.type) {
        case GET_ALL_COUNTRIES:
            return { ...state, countries: action.payload };

        case GET_COUNTRIES_BY_NAME:
            if (action.payload === "Country Does Not Exist") return { ...state, errorMessage: action.payload };
            return { ...state, countriesFiltered: action.payload };

        case GET_ALL_ACTIVITIES:
            return { ...state, activities: action.payload };

        //action = {type: GET_COUNTRIES_BY_FILTER, payload: { continent: continentName }
        case GET_COUNTRIES_BY_CONTINENT:
            const flattedArrayOfCountries = state.countries.flat().filter(country => country.continents === action.payload.continent)
            const allCountriesByContinent = arrayOfArraysOfCountries(flattedArrayOfCountries);
            return { ...state, countriesFiltered: allCountriesByContinent };

        case GET_COUNTRIES_BY_ACTIVITY:
            //si no hay paises filtrados, que me traiga las actividades de todos los paises
            console.log("antes de filtrar por actividad: " + state.countriesFiltered.length)
            if (!state.countriesFiltered.length) {

                const flatteredArrayOfCountries2 = state.countries.flat();
                const countriesByActivities = getCountriesByActivity(flatteredArrayOfCountries2, action.payload.activity);
                console.log("despues de filtrar por actividad: " + state.countriesFiltered.length)
                return {
                    ...state, countriesFiltered: countriesByActivities
                };
            } else { //si hay paises filtrados, que me traiga las actividades de todos los paises filtrados
                const flatteredArrayOfFilteredCountries2 = state.countriesFiltered.flat();
                const countriesByActivities = getCountriesByActivity(flatteredArrayOfFilteredCountries2, action.payload.activity);
                console.log("despues de filtrar por actividad: " + state.countriesFiltered.length)
                return {
                    ...state, countriesFiltered: countriesByActivities
                };
            };

        case GET_COUNTRIES_BY_ORDER:
            //si no hay paises filtrados, que me traiga todos los paises ordenados
            if (!state.countriesFiltered.length) {
                const flatteredArrayOfCountries1 = state.countries.flat();
                const allSortedCountries = sortCountries(flatteredArrayOfCountries1, action.payload.order);
                return {
                    ...state, countriesFiltered: allSortedCountries
                }
            } else { //si no hay paises filtrados, que me traiga todos los paises FILTRADOS ordenados
                const flatteredArrayOfFilteredCountries1 = state.countriesFiltered.flat();
                const allSortedCountries = sortCountries(flatteredArrayOfFilteredCountries1, action.payload.order);
                return {
                    ...state, countriesFiltered: allSortedCountries
                }
            };

        case CLEAN_COUNTRIES_FILTERED:
            return { ...state, countriesFiltered: [] };

        case CLEAN_DETAIL:
            return { ...state, countryDetail: {} };

        case GET_COUNTRY_DETAIL:
            return { ...state, countryDetail: action.payload };

        case CREATE_ACTIVITY:
            if (action.payload === "Activity Already Exists") return { ...state, errorMessage: action.payload };
            return { ...state, successMessage: action.payload };

        case CLEAN_MESSAGES:
            return { ...state, successMessage: "", errorMessage: "" };
        case GET_COUNTRY_BY_POPULATION:
            const countriesAux = state.countries.flat().filter(country => country.population === action.payload)
            return {
                ...state, countriesFiltered: arrayOfArraysOfCountries(countriesAux)
            }

        default: return { ...state }
    };
};

export default rootReducer;
