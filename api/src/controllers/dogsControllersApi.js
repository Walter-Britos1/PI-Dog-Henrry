const axios = require('axios');
require('dotenv').config();
const { API_KEY } = process.env

// Función para obtener las razas de perros desde la API TheDogApi
const getAllDogsAPI = async () => {
  try {
    // Realizar una solicitud GET a la API para obtener las razas de perros
    const response = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
    // Extraer los datos de la respuesta
    const apiData = response.data;

    // Mapear los datos de la API a la estructura del modelo Dog
    const dogsData = apiData.map((dog) => {

      return {
        id: dog.id,
        image: `https://cdn2.thedogapi.com/images/${dog.reference_image_id}.jpg`, // Usar la URL construida
        name: dog.name,
        height: dog.height.metric, // Usar el valor métrico para altura
        weight: dog.weight.metric, // Usar el valor métrico para peso
        lifespan: dog.life_span,
        Temperaments: dog.temperament
      };
    });
    
    return dogsData;
  } catch (error) {
    // Manejar errores, por ejemplo, si la solicitud a la API falla
    throw new Error('Error al obtener datos de la API TheDogApi');
  }
};


module.exports = {
  getAllDogsAPI,
};