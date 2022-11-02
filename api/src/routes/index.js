const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const countriesRouter = require('./countriesRouter');
const activitiesRouter = require('./activitiesRouter');


const router = Router(); //aca defino las rutas y en el controller defino que ocurre

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/countries', countriesRouter); // /, /countries/{idPais}, /countries?name="..."
router.use('/activities', activitiesRouter); // /activities

module.exports = router; //todas las rutas van a parar a app.js
