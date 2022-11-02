

//recibo  un array plano y devuelvo el mismo array con filas de arrays , mismos elementos siempre

const arrayOfArraysOfCountries = (flattedArrayOfCountries) => {

    const allCountriesAux = flattedArrayOfCountries; //array a modificar
    const allCountries = [];
    let aux = 0;
    let arrAux = []; //este es el array que voy a meter dentro de allCountries con la cant de paises correspondientes para mostrar
    for (let i = 0; i < allCountriesAux.length; i++) { // para recorrer los paises 
        //si estoy en la primer posicion y el largo ya es 9 pusheo arrAux a allCountries y me voy a la posicion 2 de allCountries
        if (aux === 0) {
            if (arrAux.length === 9) {
                allCountries.push(arrAux);
                arrAux = [];
                aux++;
                //se supone que pasa a i = 9
            };
        };
        //si ya no estoy en la primer posicion y el largo ya es 10 pusheo arrAux a allCountries y me voy a la posicion siguiente de allCountries
        if (aux > 0) {
            if (arrAux.length === 10) {
                allCountries.push(arrAux);
                arrAux = [];
                aux++;
                //se supone que pasa a i = 19,29,39..., 249
            };
        };
        arrAux.push(allCountriesAux[i]);
        if (i === allCountriesAux.length - 1) {
            allCountries.push(arrAux);
            arrAux = [];
            aux++;
        }
    };
    return allCountries;
}

//recibo un array plano y la orden de filtrado devuelvo el mismo array con los mismos elementos ordenados por un criterio

const sortCountries = (flattenedArrayOfCountries, order) => {
    const allCountriesAux = flattenedArrayOfCountries;
    let sortedCountries = [];
    if (order === "A To Z") {
        allCountriesAux.sort(function (currentCountry, nextCountry) {
            if (currentCountry.name < nextCountry.name) {
                return -1;
            }
            if (currentCountry.name > nextCountry.name) {
                return 1;
            }
            return 0;
        })
    };
    if (order === "Z To A") {
        allCountriesAux.sort(function (currentCountry, nextCountry) {
            if (currentCountry.name > nextCountry.name) {
                return -1;
            }
            if (currentCountry.name < nextCountry.name) {
                return 1;
            }
            return 0;
        })
    }
    if (order === "By Population Asc") {
        allCountriesAux.sort(function (currentCountry, nextCountry) {
            if (parseInt(currentCountry.population) < parseInt(nextCountry.population)) {
                return -1;
            }
            if (currentCountry.population > nextCountry.population) {
                return 1;
            }
            return 0;
        })
    };
    if (order === "By Population Des") {
        allCountriesAux.sort(function (currentCountry, nextCountry) {
            if (parseInt(currentCountry.population) > parseInt(nextCountry.population)) {
                return -1;
            }
            if (currentCountry.population > nextCountry.population) {
                return 1;
            }
            return 0;
        })
    };


    sortedCountries = arrayOfArraysOfCountries(allCountriesAux);
    return sortedCountries
}

//recibo un array plano de los paises y la actividad; devuelvo un array de arrays de paises con esa actividad 
const getCountriesByActivity = (flattenedArrayOfCountries, activity) => {
    const currentArrayOfActivitiesAux = [];
    for (let i = 0; i < flattenedArrayOfCountries.length; i++) {
        if (flattenedArrayOfCountries[i].TouristicActivities.length) {// si hay actividades turisticas, entra a preguntar, si no, no.
            for (let j = 0; j < flattenedArrayOfCountries[i].TouristicActivities.length; j++) {
                if (flattenedArrayOfCountries[i].TouristicActivities[j].name === activity) currentArrayOfActivitiesAux.push(flattenedArrayOfCountries[i]) //pusheo todo el pais
            };
        }
    };
    //si el array que voy a enviar esta vacio, tengo que darle algun valor para que no sea de length 0, sino se va a mostrar allCountries
    if (currentArrayOfActivitiesAux.length === 0) currentArrayOfActivitiesAux.push("No Countries Found");
    return arrayOfArraysOfCountries(currentArrayOfActivitiesAux);
}




export { arrayOfArraysOfCountries, sortCountries, getCountriesByActivity };



