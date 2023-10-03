const axios = require('axios');
const { Temperaments } = require('../db');
require('dotenv').config();
const { API_KEY } = process.env;

const getTemperamentsApi = async () => {
  try {
    // console.log('Fetching data from external API...');
    const response = await axios.get(`https://api.thedogapi.com/v1/breeds?api_key=${API_KEY}`);
    const temperamentsList = response.data;

    // Verificamos si la lista de temperamentos está vacía
    if (!temperamentsList) throw new Error('The list is empty');

    // Usamos un conjunto para almacenar los temperamentos únicos
    let uniqueTemperaments = new Set();

    // Iteramos a través de la lista de razas
    temperamentsList.forEach((breed) => {
      if (breed.temperament) {
        // Dividimos la cadena de temperamentos en un arreglo
        const breedTemperaments = breed.temperament.split(', ');

        // Iteramos a través de los temperamentos de la raza actual
        breedTemperaments.forEach((temp) => {
          // Agregamos cada temperamento al conjunto
          uniqueTemperaments.add(temp);
        });
      }
    });

    console.log('Inserting temperaments into the database...');
    // Convertimos el conjunto de temperamentos únicos en un arreglo de objetos
    const arrayTemperaments = Array.from(uniqueTemperaments).map((temp) => ({
      name: temp,
    }));

    // Insertamos los temperamentos en la base de datos, solo si no existen
    for (let temp of arrayTemperaments) {
      const [temperament, created] = await Temperaments.findOrCreate({
        where: { name: temp.name },
      });
      if (created) {
        console.log(`Created temperament: ${temp.name}`);
      }
    }

    // console.log('Inserting successful');

    // Devolvemos el arreglo de temperamentos únicos
    return arrayTemperaments;
  } catch (error) {
    console.log(error);
    return null; // Devolvemos null en caso de error
  }
};

module.exports = {
  getTemperamentsApi,
};



