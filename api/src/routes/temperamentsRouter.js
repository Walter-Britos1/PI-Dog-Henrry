const { Router } = require('express');
const { saveTemperamentsToDB } = require('../handlers/temperamentHandlers');

// Crear un router para gestionar las rutas relacionadas con los temperamentos de los perros
const temperamentsRouter = Router();

// Definir la ruta para guardar los temperamentos en la base de datos
temperamentsRouter.get('/', saveTemperamentsToDB);

// Exportar el router para su uso en otras partes de la aplicación
module.exports = temperamentsRouter;
