import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { searchDogByName, getAllDogs, setCurrentPage } from '../../redux/action';
import styles from './SearchBar.module.css';

const SearchBar = () => {
  const dispatch = useDispatch();

  // Estado local para almacenar el valor de búsqueda del dog en el input
  const [searchDog, setSearchDog] = useState('');

  // Estado del menu desplegable
  const [searchMenuOpen, setSearchMenuOpen] = useState(false);

  const [searching, setSearching] = useState(false); // Nuevo estado para rastrear si se está buscando

  // Dispactch de la accion para buscar dogs por nombre
  const handlerSearch = (event) => {
    event.preventDefault();

    // Restablecer la página actual a 1
    dispatch(setCurrentPage(1));

    if (searchDog === '') {
      // Si el campo de búsqueda está vacío, establece searching en falso y muestra todos los perros nuevamente.
      setSearching(false);
      dispatch(getAllDogs()); // Llama a una acción que obtiene todos los perros
    } else {
      // Si se ingresó un nombre de perro, realiza la búsqueda como lo haces actualmente.
      setSearching(true);
      dispatch(searchDogByName(searchDog));
    }
  };

  return (
    <div className={styles.container}>
      {searchMenuOpen ? (
        <>
          <button
            className={styles.menuButton}
            onClick={() => setSearchMenuOpen(false)}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='16'
              height='16'
              fill='currentColor'
              className='bi bi-search'
              viewBox='0 0 16 16'
            >
              <path d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z' />
            </svg>
          </button>
          <form>
            <input
              type='text'
              placeholder='search dog'
              value={searchDog}
              onChange={(event) => {
                setSearchDog(event.target.value);
                if (event.target.value === '') {
                  setSearching(false);
                  dispatch(getAllDogs()); // Llama la acción que obtiene todos los perros
                }
              }}
            />
          </form>
          <button
            className={styles.buttonSearch}
            onClick={handlerSearch}
            type='button'
          >
            Search
          </button>
        </>
      ) : (
        <button
          className={styles.menuButton}
          onClick={() => setSearchMenuOpen(true)}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            width='16'
            height='16'
            fill='currentColor'
            className='bi bi-search'
            viewBox='0 0 16 16'
          >
            <path d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z' />
          </svg>
        </button>
      )}
    </div>
  );
};

export default SearchBar;