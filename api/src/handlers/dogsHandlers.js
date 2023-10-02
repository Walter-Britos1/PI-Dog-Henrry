const { createDogsDB, getDogsById, getAllDogsDB, deleteDog } = require("../controllers/dogsControllersDb");
const { getAllDogsAPI } = require('../controllers/dogsControllersApi')

const getAllDogsHandler = async (req, res) => {
  const { name } = req.query;

  try {
    // Obtener datos de la API
    const apiData = await getAllDogsAPI();

    // Obtener datos de la base de datos
    const dbData = await getAllDogsDB();

    // Combinar datos de la API y la base de datos en un solo arreglo
    const allDogsData = [...apiData, ...dbData];

    // Filtrar los datos si se proporciona un nombre en la consulta
    if (name) {
      const filteredData = allDogsData.filter((dog) =>
        dog.name.toLowerCase().includes(name.toLowerCase())
      );
      res.json(filteredData);
    } else {
      res.json(allDogsData);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// controlador para buscar perros por id ya sea en la base de datos o api
const getDogsByIdHandler = async (req, res) => {
  const { idRaza } = req.params; // Obtener el parámetro "idRaza" de la solicitud

  // Expresión regular para verificar si idRaza es un UUID válido
  const uuidPattern = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

  // Determinar la fuente de datos basada en si idRaza cumple con el patrón UUID
  const source = uuidPattern.test(idRaza) ? 'bdd' : 'api';

  try {
    // Llamar a la función getDogsById para obtener los datos de los perros
    const dogs = await getDogsById(idRaza, source)

    // console.log('idRaza:', idRaza); // Mostrar el valor de idRaza en la consola
    // console.log('source:', source); // Mostrar la fuente de datos en la consola

    res.json(dogs); // Enviar los datos de los perros como respuesta JSON
  } catch (error) {
    res.status(500).json({ error: error.message }) // Manejar errores y responder con un estado 500
  }
};

// controlador para crear perros en la base de datos
const createDogsHandler = async (req, res) => {
  const { name, image, height, weight, lifespan, Temperaments } = req.body;

  try {
    const newDogs = await createDogsDB( name, image, height, weight, lifespan, Temperaments );
    res.status(201).json({
      dog_created: newDogs
    })

  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// controlador para eliminar perros de la base de datos
const deleteDogHandler = async (req, res) => {
  const { id } = req.params

  try {
    // llamamos a la funcion para eliminar perros
    const dogDeleted = await deleteDog(id);

    // Envía una respuesta de éxito después de eliminar el perro
    res.json('Dog_successfully deleted')
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

module.exports = {
  getAllDogsHandler,
  getDogsByIdHandler,
  createDogsHandler,
  deleteDogHandler
}