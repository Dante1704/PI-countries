import axios from 'axios';
import { arrayOfArraysOfCountries } from './utils';
//creo la action 

export const GET_ALL_COUNTRIES = "GET_ALL_COUNTRIES";
export const GET_COUNTRIES_BY_NAME = "GET_COUNTRIES_BY_NAME";
export const GET_COUNTRIES_BY_CONTINENT = "GET_COUNTRIES_BY_CONTINENT";
export const GET_COUNTRIES_BY_ACTIVITY = "GET_COUNTRIES_BY_ACTIVITY";
export const GET_ALL_ACTIVITIES = "GET_ALL_ACTIVITIES";
export const GET_COUNTRIES_BY_ORDER = "GET_COUNTRIES_BY_ORDER";
export const CLEAN_COUNTRIES_FILTERED = "CLEAN_COUNTRIES_FILTERED";
export const CLEAN_DETAIL = "CLEAN_DETAIL";
export const GET_COUNTRY_DETAIL = "GET_COUNTRY_DETAIL";
export const CREATE_ACTIVITY = "CREATE_ACTIVITY";
export const CLEAN_MESSAGES = "CLEAN_MESSAGES";
export const GET_COUNTRY_BY_POPULATION = "GET_COUNTRY_BY_POPULATION"

//creo la funcion que ejecuta el reducer para obtener los paises
//request a mi server
export const getAllCountries = () => {
    return function (dispatch) {
        return axios
            .get("http://localhost:3001/countries")
            .then((response) => {

                const allCountriesAux = response.data;
                const allCountries = arrayOfArraysOfCountries(allCountriesAux);

                dispatch({
                    type: GET_ALL_COUNTRIES,
                    payload: allCountries
                })
            }
            )
    }
};

export const getCountriesByName = (name) => {
    return function (dispatch) {
        return axios
            .get(`http://localhost:3001/countries?name=${name}`)
            .then((response) => {
                const allCountriesAux = response.data;
                const allCountriesByName = arrayOfArraysOfCountries(allCountriesAux);
                dispatch({
                    type: GET_COUNTRIES_BY_NAME,
                    payload: allCountriesByName
                })

            })
            .catch((error) => {
                dispatch({
                    type: GET_COUNTRIES_BY_NAME,
                    payload: error.response.data
                })
            })
    }
};

export const getAllActivities = () => {
    return function (dispatch) {
        return axios
            .get("http://localhost:3001/activities")
            .then((response) =>
                dispatch({
                    type: GET_ALL_ACTIVITIES,
                    payload: response.data
                })
            )
    }
};

export const getCountriesByContinent = (continent) => {
    return { type: GET_COUNTRIES_BY_CONTINENT, payload: continent }
};

export const getCountriesByActivity = (activity) => {
    return { type: GET_COUNTRIES_BY_ACTIVITY, payload: activity }
};

export const getCountriesByOrder = (order) => {
    return { type: GET_COUNTRIES_BY_ORDER, payload: order } //"Population = 2072"
};

export const cleanCountriesFiltered = () => {
    return { type: CLEAN_COUNTRIES_FILTERED }
};

export const cleanDetail = () => {
    return { type: CLEAN_DETAIL }
};

export const getCountryDetail = (id) => {
    return function (dispatch) {
        return axios
            .get(`http://localhost:3001/countries/${id}`)
            .then((response) =>
                dispatch({
                    type: GET_COUNTRY_DETAIL,
                    payload: response.data
                })
            )
    }
};


export const createActivity = ({ name, difficulty, duration, season, countryId }) => {
    return function (dispatch) {
        return axios
            .post(`http://localhost:3001/activities`, {
                name,
                difficulty: parseInt(difficulty),
                duration: parseInt(duration),
                season,
                countryId
            })
            .then((response) => {
                if (!response.data[1]) return dispatch({
                    type: CREATE_ACTIVITY,
                    payload: "Activity Already Exists"
                })
                else {
                    return dispatch({
                        type: CREATE_ACTIVITY,
                        payload: "Activity Successfully Created!"
                    })
                }
            })
    }
};

export const cleanMessages = () => {
    return { type: CLEAN_MESSAGES }
};
/* 
export const deleteActivity = (activityId) => {
    return function (dispatch) {
        return axios
            .delete(`http://localhost:3001/activities/${activityId}`)
            .then((response) => {

            })


    }
} */

export const getCountryByPopulation = (order) => {
    return { type: GET_COUNTRY_BY_POPULATION, payload: order }
}

