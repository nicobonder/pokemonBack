const { Router } = require("express");
const router = Router();
const { Type } = require('../db')
const axios = require('axios');

//Guardo en cache para no tener que hacer tantos pedidos a la API
let cacheTypes; //aranca con valores null

//Ruta para obtener todos los types.  
//Es '/' porque en index uso router.use('/types', types);
router.get('/', async (req, res) => {
    
    try{
        if(!cacheTypes) { //bulkCreate es un metodo de sequelize para crear un conjunto de instancias cdo hay relacion de muchos a muchos
            await Type.bulkCreate((await axios.get('https://pokeapi.co/api/v2/type')).data.results.map(({name}) => ({name}))
            )   //el objeto tiene mucha info, necesto solo dataValues
        cacheTypes = (await Type.findAll()).map(el => el.dataValues);
        }
        console.log('cachetypes', cacheTypes)
        res.status(200).send(cacheTypes)
    } catch(error){
        return res.status(500).json({ message: error.message })
    }
    
})
    
module.exports = router;