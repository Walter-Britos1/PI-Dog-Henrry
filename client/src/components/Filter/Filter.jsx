import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  filterByWeight,
  sortDogsAscending,
  sortDogsDescending,
  filterByTemperament,
  setFilterOrigin,
} from '../../redux/action';
import ClearFilter from '../ClearFilter/ClearFilter';
import styles from './Filter.module.css';

const Filter = () => {
  const dispatch = useDispatch();
  // Estado local para controlar la visibilidad de los filtros adicionales.
  const [showFilters, setShowFilters] = useState(false);

  // Estado local para almacenar la lista de temperamentos.
  const [temperaments, setTemperaments] = useState([]);

  // Estado para controlar el orden de clasificación de la lista de perros.
  const [sortOrder, setSortOrder] = useState('ascendente');

  // Obtener el valor seleccionado del filtro de temperamento del estado global.
  const selectedTemperament = useSelector((state) => state.selectedTemperament);

  // Obtener el valor seleccionado del filtro de peso del estado global.
  const selectedWeightFilter = useSelector(
    (state) => state.selectedWeightFilter
  );

  // Obtener el valor seleccionado del filtro de origen del estado global.
  const filterOrigin = useSelector((state) => state.filterOrigin);

  useEffect(() => {
    axios
      .get('http://localhost:3001/temperaments')
      .then((response) => {
        // Actualizar el estado local con los temperamentos obtenidos del servidor.
        setTemperaments(response.data);
      })
      .catch((error) => {
        console.error('Error fetching temperaments', error);
      });
  }, []);

  // Manejar el cambio en el filtro de temperamento y despachar la acción correspondiente.
  const handleTemperamentFilterChange = (event) => {
    const selectedTemperament = event.target.value;
    dispatch(filterByTemperament(selectedTemperament));
  };

  // Manejar el cambio en el filtro de peso y despachar la acción correspondiente.
  const handleWeightFilterChange = (event) => {
    const selectedWeight = event.target.value;
    dispatch(filterByWeight(selectedWeight));
  };

  // Manejar el cambio en el filtro de origen y despachar la acción correspondiente.
  const handleOriginFilterChange = (event) => {
    const selectedOrigin = event.target.value;
    dispatch(setFilterOrigin(selectedOrigin));
  };

  const handleSortToggle = () => {
    // Determina el nuevo orden de clasificación: ascendente o descendente.
    const newSortOrder =
      sortOrder === 'ascendente' ? 'descendente' : 'ascendente';

    // Actualiza el estado con el nuevo orden de clasificación.
    setSortOrder(newSortOrder);

    // Despacha una acción Redux para ordenar la lista en el nuevo orden.
    if (newSortOrder === 'ascendente') {
      dispatch(sortDogsAscending());
    } else {
      dispatch(sortDogsDescending());
    }
  };

  // Manejar el cambio para mostrar/ocultar los filtros adicionales.
  const handleToggleFilters = () => {
    setShowFilters(!showFilters);
  };


  return (
    <div className={styles.filtersContainer}>
      {/* Menú desplegable para opciones adicionales */}
      <div className={styles.buttonAndOptions}>
        <button
          className={`${styles.moreFiltersButton} ${
            showFilters ? styles.filtersButtonOpen : ''
          }`}
          onClick={handleToggleFilters}
          aria-expanded={showFilters}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='16'
            height='16'
            fill='currentColor'
            className={`bi bi-filter ${showFilters ? styles.rotate180 : ''}`}
            viewBox='0 0 16 16'
          ></svg>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='16'
            height='16'
            fill='currentColor'
            className='bi bi-filter'
            viewBox='0 0 16 16'
          >
            <path d='M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z' />
          </svg>
        </button>
        {showFilters && (
          <div className={styles.filterGroup}>
            <button onClick={handleSortToggle}>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='16'
                height='16'
                fill='currentColor'
                viewBox='0 0 16 16'
              >
                <path
                  fillRule='evenodd'
                  d='M10.082 5.629 9.664 7H8.598l1.789-5.332h1.234L13.402 7h-1.12l-.419-1.371h-1.781zm1.57-.785L11 2.687h-.047l-.652 2.157h1.351z'
                />
                <path d='M12.96 14H9.028v-.691l2.579-3.72v-.054H9.098v-.867h3.785v.691l-2.567 3.72v.054h2.645V14zM4.5 2.5a.5.5 0 0 0-1 0v9.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L4.5 12.293V2.5z' />
              </svg>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='16'
                height='16'
                fill='currentColor'
                className='bi bi-sort-alpha-up'
                viewBox='0 0 16 16'
              >
                <path
                  fillRule='evenodd'
                  d='M10.082 5.629 9.664 7H8.598l1.789-5.332h1.234L13.402 7h-1.12l-.419-1.371h-1.781zm1.57-.785L11 2.687h-.047l-.652 2.157h1.351z'
                />
                <path d='M12.96 14H9.028v-.691l2.579-3.72v-.054H9.098v-.867h3.785v.691l-2.567 3.72v.054h2.645V14zm-8.46-.5a.5.5 0 0 1-1 0V3.707L2.354 4.854a.5.5 0 1 1-.708-.708l2-1.999.007-.007a.498.498 0 0 1 .7.006l2 2a.5.5 0 1 1-.707.708L4.5 3.707V13.5z' />
              </svg>
            </button>

            <select
              className={styles.filterSelect}
              value={selectedWeightFilter}
              onChange={handleWeightFilterChange}
            >
              <option value='higherWeight'>Higher Weight</option>
              <option value='lowerWeight'>Lower Weight</option>
            </select>

            <select
              className={styles.filterSelect}
              value={selectedTemperament}
              onChange={handleTemperamentFilterChange}
            >
              <option value=''>Todos los temperamentos</option>
              {temperaments.map((temperament) => (
                <option key={temperament.name} value={temperament.name}>
                  {temperament.name}
                </option>
              ))}
            </select>

            <select
              className={styles.filterSelect}
              value={filterOrigin}
              onChange={handleOriginFilterChange}
            >
              <option value='All'>All origins</option>
              <option value='API'>API</option>
              <option value='Database'>Database</option>
            </select>
          </div>
        )}
      </div>
       <ClearFilter />
    </div>
  );
};

export default Filter;
