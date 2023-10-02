// importar actionTypes
import {
  SET_CURRENT_PAGE,
  CREATE_DOGS,
  GET_ALL_DOGS,
  GET_DOG_BY_NAME,
  SORT_DOGS_ASCENDING,
  SORT_DOGS_DESCENDING,
  FILTER_BY_WEIGHT,
  FILTER_BY_TEMPERAMENT,
  SET_FILTER_ORIGIN,
  DELETE_DOG
} from './actionTypes';

// Estado inicial de la aplicación
const initialState = {
  dogs: [], // Lista de perros mostrados en la aplicación
  copyDogs: [], // Copia de seguridad de la lista de perros para restaurar los filtros
  sortOrder: 'none', // Orden actual de la lista (ascendente, descendente o ninguno)
  selectedWeightFilter: null, // Filtro de peso seleccionado
  selectedTemperament: '', // Temperamento seleccionado
  filterOrigin: 'All', // Origen de los perros que se muestran
  currentPage: 1, // Página actual
  dogsPerPage: 8, // Cantidad de perros mostrados por página
};

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ALL_DOGS:
      return {
        ...state,
        dogs: payload,
        copyDogs: payload
      };
      
    case GET_DOG_BY_NAME:
      return {
        ...state,
        dogs: payload,
      };
    
    case CREATE_DOGS:
      // console.log('Estado actual:', state);
      // console.log('Acción despachada:', payload);
      return {
        ...state,
      };

    // Filtrar la lista de perros para eliminar el perro con el ID correspondiente
    case DELETE_DOG: 
      return {
        ...state,
        dogs: state.dogs.filter(dog => dog.id !== payload)
      }

    case FILTER_BY_WEIGHT: 
      return {
        ...state,
        selectedWeightFilter: payload
      }
    
    case FILTER_BY_TEMPERAMENT:
      return {
        ...state,
        selectedTemperament: payload,
      };
      
    case SET_FILTER_ORIGIN: 
      return {
        ...state,
        filterOrigin: payload
      }

    case SORT_DOGS_ASCENDING:
      return {
        ...state,
        sortOrder: 'ascending',
        dogs: [...state.dogs].sort((a, b) => a.name.localeCompare(b.name)),
      };

    case SORT_DOGS_DESCENDING:
      return {
        ...state,
        sortOrder: 'descending',
        dogs: [...state.dogs].sort((a, b) => b.name.localeCompare(a.name)),
      };

    case SET_CURRENT_PAGE:
      return {
        ...state,
        currentPage: payload,
      } 
      
    default:
      return {
        ...state,
      };
  }
};

export default rootReducer;