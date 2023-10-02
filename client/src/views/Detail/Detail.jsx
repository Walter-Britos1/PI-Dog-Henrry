import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Loading from '../../components/Loading/Loading';
import styles from './Detail.module.css'

const Detail = () => {
  // Obtiene el parámetro de la URL para identificar la raza
  const { idRaza } = useParams();
  
  // Estado para almacenar la información del perro
  const [dogs, setDogs] = useState({});

  // Estado para controlar la carga de datos
  const [loading, setLoading] = useState(true);

  // Estado para manejar errores
  const [error, setError] = useState(null);

  // Función para cargar los detalles del perro desde la API
  useEffect(() => {
    const getDetail = async () => {
      try {
        // Realiza una solicitud a la API para obtener los detalles del perro
        const apiData = await axios.get(`http://localhost:3001/dogs/${idRaza}`);
        const response = apiData.data;

        // Si la respuesta es exitosa, actualiza el estado con los datos del perro
        if (response) {
          setDogs(response);
        }

        // Finaliza la carga y borra cualquier error previo
        setLoading(false);
        setError(null);
      } catch (error) {
        // En caso de error, finaliza la carga y muestra un mensaje de error
        setLoading(false);
        setError('Dog not found');
      }
    };

    // Llama a la función para cargar los detalles cuando cambie el ID de la raza
    getDetail();
  }, [idRaza]);

  // Renderiza el contenido según el estado de carga y error
  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <div>{error}</div>;
  }


  const removeDuplicates = (array) => {
    return [...new Set(array)];
  };
  

  return (
    <div className={styles.dogDetailContainer}>
      <div className={styles.container}>
        <div className={styles.backHome}>
          <Link to='/home'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='16'
              height='16'
              fill='currentColor'
              className='bi bi-box-arrow-left'
              viewBox='0 0 16 16'
            >
              <path
                fillRule='evenodd'
                d='M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z'
              />
              <path
                fillRule='evenodd'
                d='M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z'
              />
            </svg>
          </Link>
        </div>
        <img
          className={styles.imgContainer}
          src={
            dogs.image && dogs.image.includes('http')
              ? dogs.image
              : `https://cdn2.thedogapi.com/images/${dogs.reference_image_id}.jpg`
          }
          alt={dogs.name}
        />

        <h2>{dogs.name}</h2>
        <p>
          <strong>Breed Group:</strong>
          {dogs.breed_group || ' Breed Group not found'}
        </p>
        <p>
          <strong>Bred For:</strong> {dogs.bred_for || 'Bred For not found'}
        </p>
        <p>
          <strong>Height: </strong>
          {dogs.height && typeof dogs.height === 'object'
            ? dogs.height.metric
            : dogs.height}{' '}
          cm
        </p>
        <p>
          <strong>Life Span:</strong> {dogs.life_span || dogs.lifespan + ' years'}
        </p>

        <p>
          <strong>Temperament:</strong>{' '}
          {Array.isArray(dogs.Temperaments)
            ? removeDuplicates(dogs.Temperaments.map((t) => t.name)).join(', ')
            : dogs.temperament}
        </p>
        <p>
          <strong>Origin:</strong> {dogs.origin || 'Origin not found'}
        </p>
      </div>
    </div>
  );
};

export default Detail;
