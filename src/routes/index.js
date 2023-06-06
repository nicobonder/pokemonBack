const { Router } = require('express');
const { response } = require('../app');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
//routes de type y poke
const pokemons = require('./pokemons');
const types = require('./types');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/pokemons', pokemons);
router.use('/types', types);


module.exports = router;
