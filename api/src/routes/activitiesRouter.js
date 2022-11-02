const { Router } = require('express');
const { Country, TouristicActivity } = require('../db');

const router = Router();
//esta funcion no esta pedida pero me va a servir para filtrar paises en base a cierta actividad en el front
router.get('/', async (req, res) => {
    try {
        const activities = await TouristicActivity.findAll({ include: Country });
        return res.status(200).send(activities)
    } catch (error) {
        res.status(404).send(error.message)
    }
});

router.post('/', async (req, res) => {
    //Recibe los datos recolectados desde el formulario controlado de la ruta de creación de actividad turística por body
    //Crea una actividad turística en la base de datos, relacionada con los países correspondientes
    const {
        name,
        difficulty,
        duration,
        season,
        countryId
    } = req.body;

    // valido id, name, season y userId que consideron son los datos importantes para poder setear una actividad
    if (!name || !difficulty || !duration || !season) {
        return res.status(400).send("Missing Data")
    };
    try {
        const [newActivity, created] = await TouristicActivity.findOrCreate({
            where: { name, difficulty, duration, season },
            defaults: {
                name,
                difficulty,
                duration,
                season
            }
        });
        await newActivity.addCountry(countryId); //entiendo que va add por que la actividad se crea para varios paises
        return res.status(201).send([newActivity, created]) //
    } catch (error) {
        return res.status(404).send(error)
    }
});

router.put('/:activityId', async (req, res) => {
    const { activityId } = req.params;
    const {
        name,
        difficulty,
        duration
    } = req.body;
    const updateActivity = {}; //los datos de la actividad a actualizar
    if (name) updateActivity["name"] = name;
    if (difficulty) updateActivity["difficulty"] = difficulty;
    if (duration) updateActivity["duration"] = duration

    try {
        await TouristicActivity.update(updateActivity, { where: { id: activityId } });
        return res.status(200).send(updateActivity);
    } catch (error) {
        return res.status(404).send(error);
    }
});

router.delete('/:activityId', async (req, res) => {
    const { activityId } = req.params;
    try {
        const deletedActivity = await TouristicActivity.destroy({
            where: {
                id: activityId
            }
        });
        console.log(deletedActivity);
        return res.status(200).send(deletedActivity);
    } catch (error) {
        return res.status(404).send(error);
    }
});



module.exports = router;

