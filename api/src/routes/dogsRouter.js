const { Router } = require('express');
const { getAllDogsHandler, 
    getDogsByIdHandler, 
    createDogsHandler, 
    deleteDogHandler 
} = require('../handlers/dogsHandlers');

// Crear un router para gestionar las rutas relacionadas con los perros
const dogsRouter = Router();

// Definir las rutas y los controladores correspondientes

// Ruta para obtener todos los perros
dogsRouter.get('/', getAllDogsHandler);

// Ruta para obtener un perro por su ID
dogsRouter.get('/:idRaza', getDogsByIdHandler)

// Ruta para crear un nuevo perro
dogsRouter.post('/', createDogsHandler)

// Ruta para eliminar un perro por su ID
dogsRouter.delete('/:id', deleteDogHandler)

// Exportar el router para su uso en otras partes de la aplicación
module.exports = dogsRouter;
