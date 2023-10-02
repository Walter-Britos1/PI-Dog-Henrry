import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { deleteDog } from '../../redux/action';
import styles from './Card.module.css';
 
const Card = ({ image, name, temperaments, weight, idRaza }) => {

  const dispatch = useDispatch();

   // Función para manejar la eliminación de un perro
  const handleDelete = () => {
    dispatch(deleteDog(idRaza));
  };

  return (
<div className={styles.card}>
<div className={styles.cardHeader}>
  {typeof idRaza === 'number' ? (
    <img src={image} alt={name} />
  ) : (
    <img src={image} alt={name} />
  )}
  {typeof idRaza === 'string' && (
    <button onClick={handleDelete}>
      delete
    </button>
  )}
</div>
<div className={styles.cardContent}>
  <h2><strong>Name:</strong> {name}</h2>
  <p><strong>Temperaments:</strong> {temperaments}</p>
  <p><strong>Weight:</strong> {weight} Kg</p>
  <Link to={`/${idRaza}`}>More details</Link>
</div>
</div>
  )
};

export default Card;