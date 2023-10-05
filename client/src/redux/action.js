import axios from 'axios';
// Importar actionTypes 
import {
    CREATE_DOGS,
    GET_ALL_DOGS,
    GET_DOG_BY_NAME,
    SORT_DOGS_ASCENDING,
    SORT_DOGS_DESCENDING,
    SET_CURRENT_PAGE,
    FILTER_BY_WEIGHT,
    FILTER_BY_TEMPERAMENT,
    SET_FILTER_ORIGIN,
    DELETE_DOG,
    CLEAR_FILTER
  } from './actionTypes';
  
  // Acción para obtener todos los perros desde el servidor
  export const getAllDogs = () => {
    return async (dispatch) => {
      try {
        const api = await axios.get('http://localhost:3001/dogs');
        const dogs = api.data;
  
        dispatch({
          type: GET_ALL_DOGS,
          payload: dogs,
        });
      } catch (error) {
        alert('Something went wrong please contact support');
      }
    };
  };
  
  // Acción para buscar perros por nombre
  export const searchDogByName = (name) => {
    return async (dispatch) => {
      try {
        if (name === '') {
          alert('Please enter dog name');
          return
        }
  
        const api = await axios.get(`http://localhost:3001/dogs?name=${name}`);
        const filteredDogs = api.data;
  
        dispatch({
          type: GET_DOG_BY_NAME,
          payload: filteredDogs,
        });
      } catch (error) {
        alert('Something went wrong please contact support');
      }
    };
  };
  
  // Acción para crear un nuevo perro
  export const createDog = (dogData) => {
    return async (dispatch) => {
      try {
        // console.log('Datos del perro a enviar:', dogData);
  
        const api = await axios.post('http://localhost:3001/dogs', dogData);
        const dogCreated = api.data;
  
        // console.log('Respuesta del servidor:', dogCreated);
  
        // Despachar la acción para agregar perros.
        dispatch({
          type: CREATE_DOGS,
          payload: dogCreated,
        });
      } catch (error) {
        console.error('Error en la acción createDog:', error);
        if (error.response) {
          alert(`Error creating dog: ${error.response.data.message}`);
        } else {
          alert('Error creating dog. Please check your network connection.');
        }
      }
    };
  };
  
  export const deleteDog = (id) => {
    return async (dispatch) => {
      try {
        // Realizar la solicitud DELETE al servidor
        await axios.delete(`http://localhost:3001/dogs/${id}`)
  
        // Despachar la acción para eliminar perros en el estado de Redux
        dispatch({
          type: DELETE_DOG,
          payload: id
        })
  
      } catch (error) {
        console.error('Error deleting activity:', error);
      }
    } 
  };
  
  // Acción para filtlar perros por temperamentos
  export const filterByTemperament = (temperament) => {
    return {
      type: FILTER_BY_TEMPERAMENT,
      payload: temperament
    }
  };
  
  // Acción para filtrar perros por peso
  export const filterByWeight = (filterType) => {
    return {
      type: FILTER_BY_WEIGHT,
      payload: filterType
    }
  };
  
  // Acción para filtrar perros por origen (base de datos o api)
  export const setFilterOrigin = (origin) => {
    return {
      type: SET_FILTER_ORIGIN,
      payload: origin
    }
  }
  
  // Acción para ordenar perros de manera alfavetica ascendente
  export const sortDogsAscending = () => ({
    type: SORT_DOGS_ASCENDING,
  });
  
  // Acción para ordenar perros de manera alfavetica descendente
  export const sortDogsDescending = () => ({
    type: SORT_DOGS_DESCENDING,
  });
  
  // Acción para limpiar los filtros 
  export const clearFilter = () => ({
    type: CLEAR_FILTER
  })

  export const setCurrentPage = (page) => {
    return {
      type: SET_CURRENT_PAGE,
      payload: page,
    };
  };
  
  