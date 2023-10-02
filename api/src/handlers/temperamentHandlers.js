const { getTemperamentsApi } = require('../controllers/temperamentControllers');

// Función para guardar los temperamentos en la base de datos
const saveTemperamentsToDB = async (req, res) => {
  try {
    // Obtener la lista de temperamentos 
    const listsTemperaments = await getTemperamentsApi();


    // Enviar la lista de temperamentos como respuesta en formato JSON
    res.json(listsTemperaments);
  } catch (error) {
    // Manejar errores y enviar una respuesta de error con un código de estado 500
    res.status(500).json({ error: error.message });
  }
}


module.exports = {
  saveTemperamentsToDB,
};
