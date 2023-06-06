const { json } = require("body-parser");
const { Router } = require("express");
const router = Router();
const { Pokemon, Type } = require("../db"); 

const { 
    getAllPokemons,
    createPokemon, 
    //updatePokemons,     
} = require('../controllers/pokemons.controller.js');

//const router = require("express").Router();

router.get('/', async (req, res) => {
    console.log('trying get all pokes')
    const { name } = req.query;
    //Obtengo todos los pokemons con la funcion getAllPokemons
    let allPokemons = await getAllPokemons();
    try{
        if(name){
            let pokeName = allPokemons.filter((poke) => poke.name.toLowerCase() === name.toLowerCase())
            if(pokeName.length){
                res.status(200).send(pokeName)
            } else {
                res.status(404).send('Sorry, we couldnt find that pokemon.');
            }
        } else {
            res.status(200).send(allPokemons)
            
        }
    } catch(error){
        return res.status(500).json({ message: error.message })
    }
});

//Ruta para traer el detalle del poke con el id de params
router.get('/:id', async (req, res) =>{
    const { id } = req.params;
    const pokeById = await getAllPokemons(); //traigo todos los poke

    if(id){ //si me pasaron un id valido, filtro y devuelvo
        let pokeName = pokeById.filter(poke => poke.id == id)
        pokeName.length 
        ? res.status(200).json(pokeName) //si al filtrar hay una coincidencia, muestro el poke.
        : res.status(404).send('Sorry, we couldnt find that pokemon.');  //si el id no es valido devuelvo mensaje.
        }
});

//Ruta de creacion
router.post('/', (createPokemon));
//Ruta ruta para actualizar un pokemon

router.put('/:id', (req, res) => {
    const pokeId = req.params.id;
    const updates = req.body;
    Pokemon.update(updates, //update es un metodo de sequelize para actualizar 
        { where: { id: pokeId } })
    .then(() => {
        res.sendStatus(200);
    }) // Envio un codigo de estado de exito sin contenido
    .catch((error) => {
      console.error(error);
      res.status(500).send({ message: 'Error updating the pokemon' });
  });
})

//Ruta para borrar un pokemon
router.delete('/:id', (req, res) => {
    // Obtengo el ID del registro a eliminar del parámetro de la ruta
    const pokedId = req.params.id;
    // Elimino el registro de la DB con destroy de Sequelize
    Pokemon.destroy({ where: { id: pokedId } })
      .then(() => res.sendStatus(204)) // Envio un codigo de estado de exito sin contenido
      .catch((error) => {
        console.error(error);
        res.sendStatus(500);
    });
})

module.exports = router;