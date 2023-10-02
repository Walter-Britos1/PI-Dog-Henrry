import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { getAllDogs } from '../../redux/action';
import CardsContainer from '../../components/Cards/Cards';
import Filters from '../../components/Filter/Filter';
import Loading from '../../components/Loading/Loading';
import Error from '../../components/Error/Error';

const Home = () => {
  const dispatch = useDispatch();
  // Obtener la lista de perros del estado de redux
  const dogs = useSelector((state) => state.dogs);

  // Estado local para el Loading
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    // Inicia la carga (loading) antes de realizar la solicitud
    setLoading(true);

    // Realiza la solicitud a la API utilizando dispatch
    dispatch(getAllDogs())
      .then(() => {
        // Una vez que se recibe la respuesta de la API, detiene la carga (loading)
        setLoading(false);
      })
      .catch((error) => {
        // En caso de error, también detiene la carga (loading)
        setLoading(false);
        console.error('Error:', error);
      });
  }, [dispatch]);

  return (
    <div>
      {/* Renderiza el Loading si loading es true */}
      {loading ? (
        <Loading />
      ) : (
        /* Renderiza Filters y CardsContainer o Error si loading es false */
        <>
          <Filters />
          {dogs.length === 0 ? <Error /> : <CardsContainer />}
        </>
      )}
    </div>
  );
};

export default Home;