import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPage } from '../../redux/action';
import {
  calculatePaginatedItems,
  applyFilter,
  applyTemperamentFilter,
  applyOriginFilter
} from './utils';
import Card from '../Card/Card';
import Error from '../Error/Error';
import styles from './Cards.module.css';

const Cards = () => {
  // Obtener el dispatcher de Redux para realizar acciones
  const dispatch = useDispatch();

  // Obtener el número de perros a mostrar por página desde el estado global
  const dogsPerPage = useSelector((state) => state.dogsPerPage);

  // Obtener la página actual desde el estado global
  const currentPage = useSelector((state) => state.currentPage);

  // Obtener la lista completa de perros desde el estado global
  const dogs = useSelector((state) => state.dogs);
  
  // Obtener el filtro de peso seleccionado desde el estado global
  const selectedWeightFilter = useSelector((state) => state.selectedWeightFilter);

  // Obtener el temperamento seleccionado desde el estado global
  const selectedTemperament = useSelector((state) => state.selectedTemperament);

  // Obtener el filtro de origen seleccionado desde el estado global
  const filterOrigin = useSelector((state) => state.filterOrigin);

  // Estado local para determinar si hay resultados
  const [hasResults, setHasResults] = useState(true);

  // Aplicar el filtro de peso a la lista de perros
  const filteredDogsByWeight = applyFilter(dogs, selectedWeightFilter);

  // Aplicar el filtro de temperamento a la lista filtrada por peso
  const filteredDogsByTemperament = applyTemperamentFilter(
    filteredDogsByWeight,
    selectedTemperament
  );

  // Aplicar el filtro de origen a la lista filtrada por temperamento
  const filteredDogsByOrigin = applyOriginFilter(
    filteredDogsByTemperament,
    filterOrigin
  );

  // Calcular la lista de perros paginada
  const paginatedDogs = calculatePaginatedItems(
    filteredDogsByOrigin,
    currentPage,
    dogsPerPage
  );

  // Función para manejar el cambio de página
  const handlePageChange = (pageNumber) => {
    dispatch(setCurrentPage(pageNumber));
  };


  const totalPages = Math.ceil(filteredDogsByOrigin.length / dogsPerPage);

  const visiblePageNumbers = [];
  const maxVisiblePages = 3;

  for (
    let i = Math.max(1, currentPage - 2);
    i <= Math.min(currentPage + 1, totalPages);
    i++
  ) {
    visiblePageNumbers.push(i);
  }

  useEffect(() => {
    // Actualizar el estado hasResults basado en si hay resultados paginados
    if (paginatedDogs.length > 0) {
      setHasResults(true);
    } else {
      setHasResults(false);
    }
  }, [paginatedDogs]);

  return (
    <>
      {!hasResults && <Error />}
      {hasResults && (
        <div className={styles.cardContainer}>
          {paginatedDogs.map((dog) => (
            <Card
              key={dog.id}
              idRaza={dog.id}
              image={dog.image}
              name={dog.name}
              temperaments={dog.Temperaments}
              weight={dog.weight}
            />
          ))}
        </div>
      )}
      <div className={styles.paginationContainer}>
        {currentPage > 1 && (
          <button
            className={styles.paginationButton}
            onClick={() => handlePageChange(currentPage - 1)}
          >
            Prev...
          </button>
        )}
        {visiblePageNumbers.map((pageNumber) => (
          <button
            key={pageNumber}
            className={`${styles.paginationButton} ${
              currentPage === pageNumber ? styles.activePage : ''
            }`}
            onClick={() => handlePageChange(pageNumber)}
          >
            {pageNumber}
          </button>
        ))}
        {currentPage < totalPages && (
          <button
            className={styles.paginationButton}
            onClick={() => handlePageChange(currentPage + 1)}
          >
            Next...
          </button>
        )}
      </div>
    </>

  )
};

export default Cards;