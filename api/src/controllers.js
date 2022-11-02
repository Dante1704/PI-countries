//aca van los controllers
const axios = require('axios');


//con esta funcion voy a obtener todos los countries de la api para cargarlos a la db
getCountriesFromAPI = async () => {
    //me traigo todos los paises
    const countriesAux = await
        axios.get("https://restcountries.com/v3/all")
            .then((response) => {
                return response.data;
            })
            .catch(error => { return new Error(error) });
    //me guardo los datos que necesito y los retorno
    const countries = countriesAux.map(countryAux => {

        let cityCapital;
        countryAux.capital ? cityCapital = countryAux.capital[0] : cityCapital = countryAux.name.common

        const country = {
            id: countryAux.cca3,
            name: countryAux.name.common,
            flags: countryAux.flags[0],
            continents: countryAux.continents[0],
            capital: cityCapital,
            subregion: countryAux.subregion || countryAux.region,
            area: countryAux.area,
            population: countryAux.population
        };
        return country
    });
    return countries
};

nameToUpperCase = (name) => { //recibo por ej "United States Minor Outlying Islands"

    let nameAux = name.split(" "); //aca tengo una palabra en cada posicion
    nameAux = nameAux.map((word) => {
        return word[0].toUpperCase() + word.substring(1);
    }).join(" ");
    console.log(nameAux);
    return nameAux
}



module.exports = { getCountriesFromAPI, nameToUpperCase };
