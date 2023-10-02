const axios = require('axios');
const { Dog, Temperaments } = require('../db');

const getAllDogsDB = async () => {
  // Obtener todos los perros de la base de datos
  const allDogsDb = await Dog.findAll({
    include: {
      model: Temperaments, // Incluir datos de la tabla "Temperaments"
      through: { attributes: [] }, // No incluir atributos adicionales de la tabla de unión
    },
  });

  // Transforma los temperamentos a una cadena para cada perro
  allDogsDb.forEach(dog => {
    dog.dataValues.Temperaments = dog.Temperaments.map(t => t.name).join(', ');
  });

  return allDogsDb; // Devolver todos los perros obtenidos de la base de datos
};


const getDogsById = async (idRaza, source) => {
  let dogs; // Variable para almacenar los datos de los perros

  if (source === 'api') {
    // Si la fuente es la API
    try {
      // Intentamos hacer una solicitud a la API
      const response = await axios.get(`https://api.thedogapi.com/v1/breeds/${idRaza}`);
      dogs = response.data; // Almacenamos los datos de los perros desde la API

      // Realizar una segunda solicitud para obtener los detalles de la raza
      const dogDetailsResponse = await axios.get(`https://api.thedogapi.com/v1/images/${dogs.reference_image_id}`);
      const dogDetails = dogDetailsResponse.data;

      // Actualizar la propiedad image con la URL de la imagen obtenida de los detalles de la raza
      dogs.image = dogDetails.url;

    } catch (error) {
      console.error('Error al obtener datos de la API:', error);
      throw error; // Manejar errores y reenviarlos
    }
  } else {
    // Si la fuente no es la API, asumimos que es la base de datos local
    try {
      // Intentamos buscar en la base de datos local por el ID de raza
      dogs = await Dog.findByPk(idRaza, {
        include: {
          model: Temperaments,
          through: { attributes: [] },
        }
      })
    } catch (error) {
      console.error('Error al buscar en la base de datos local:', error);
      throw error; // Manejar errores y reenviarlos
    }
  }

  return dogs; // Devolvemos los datos de los perros, ya sea desde la API o la base de datos local
};


// Función para crear un nuevo registro de perro en la base de datos
const createDogsDB = async (
  name,
  image,
  height,
  weight,
  lifespan,
  temperaments
) => {
  // Comprobar si faltan datos esenciales
  if (!name || !height || !weight || !lifespan) {
    throw Error('Missing data'); // Lanzar un error si falta algún dato
  }
  
  // Crear un nuevo registro de perro en la tabla "Dog"
  const dogCreated = await Dog.create({
    name,
    image,
    height,
    weight,
    lifespan,
  });

  // Buscar los temperamentos por nombre en lugar de por ID en la tabla "Temperaments"
  const associatedTemperaments = await Temperaments.findAll({
    where: {
      name: temperaments
    }
  });

  // Establecer los temperamentos asociados al perro recién creado
  await dogCreated.setTemperaments(associatedTemperaments);

  // Devolver el registro del perro creado
  return dogCreated;
};

// Función para eliminar un perro de la base de datos por su ID
const deleteDog = async (id) => {
  // Eliminar el perro de la tabla "Dog" según su ID
  const dogDeleted = await Dog.destroy({
    where: {
      id
    }
  });
  
  // Devolver el número de registros de perro eliminados (debería ser 0 o 1)
  return dogDeleted;
};


module.exports = {
  getAllDogsDB,
  getDogsById,
  createDogsDB,
  deleteDog
};
