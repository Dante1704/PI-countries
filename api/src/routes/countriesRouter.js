const { Router } = require('express');
const { getCountriesFromAPI, nameToUpperCase } = require('../controllers'); //traer los controlers cuando esten creados
//me taigo los modelos para utilizarlos para armar las instances que van a ser las filas de la tabla
const { Country, TouristicActivity } = require('../db');
const { Op } = require("sequelize")

const router = Router();


router.get('/', async (req, res) => {
    //esta ruta se usa inicialmente para cargar a la base de datos con los paises y despues para req.query
    const { name } = req.query;
    //traer los paises de la api y guardarlos en mi base de datos 
    const countriesAux = await Country.findAll({ include: TouristicActivity });
    if (!countriesAux.length) {
        try {
            const countries = await getCountriesFromAPI();
            const countriesFromDb = await Country.bulkCreate(countries, { include: TouristicActivity });
            return res.status(200).send(countriesFromDb)
        } catch (error) {
            return res.status(404).send(error.message)
        };
    };
    //aca mi base de datos tiene los paises cargados,
    //si tengo algo por query, muestro todo lo que coincida
    if (name) {
        try {
            const nameAux = nameToUpperCase(name);
            const country = await Country.findAll({
                where: {
                    name: { [Op.substring]: nameAux }
                }
            });
            if (!country.length) return res.status(400).send("Country Does Not Exist");
            return res.status(200).send(country)
        } catch (error) {
            return res.status(404).send(error.message)
        }
    };
    //si no tengo nada por query muestro todo 
    try {
        return res.status(200).send(await Country.findAll({ include: TouristicActivity }))
    } catch (error) {
        res.status(404).send(error.message)
    }
});


router.get('/:id', async (req, res) => {
    //me traigo el pais que me piden con sus actividades turísticas
    const { id } = req.params; //string
    try {
        const country = await Country.findByPk(id, { include: TouristicActivity });
        if (!country) return res.status(400).send("Country Does Not Exist");
        return res.status(200).send(country)
    } catch (error) {
        res.status(404).send(error.message)
    }
});


module.exports = router;

