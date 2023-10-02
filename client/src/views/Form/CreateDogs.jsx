import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createDog } from '../../redux/action';
import { validateDogData } from './validation';
import styles from './CreateDogs.module.css';

const CreateDogs = () => {
  const dispatch = useDispatch();

  const [temperaments, setTemperaments] = useState([]);

  const dogs = useSelector((state) => state.dogs);

  const [dogData, setDogData] = useState({
    name: '',
    height: '',
    weight: '',
    lifespan: '',
    Temperaments: [],
    image: '',
  });

  // Estado para errores
  const [errors, setErrors] = useState({
    name: '',
    height: '',
    weight: '',
    lifespan: '',
    temperaments: '',
    image: '',
  });

  useEffect(() => {
    axios
      .get('http://localhost:3001/temperaments')
      .then((response) => {
        setTemperaments(response.data);
      })
      .catch((error) => console.log('ERROR', error));
  }, []);

  useEffect(() => {
    // console.log('Temperamentos después de agregar:', dogData.Temperaments);
  }, [dogData.Temperaments]);
  

  // Control de cambios en los imput
  const handleInputChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    setDogData({ ...dogData, [name]: value });
    setErrors(validateDogData({ ...dogData, [name]: value })); // si no lo paso asi, la validacion esta un paso atrasada
    isNameDuplicate();
  };

  // Maneja la seleccion de temperamentos
  const handleTemperamentSelect = (event) => {
    const newTemp = event.target.value;

    // console.log('Nuevo temperamento seleccionado:', newTemp);
    // console.log('Temperamentos antes de agregar:', dogData.Temperaments);
    
    // Verifica si el temperamento ya está en el array
    if (dogData.Temperaments.includes(newTemp)) {
      alert(`${newTemp} is already selected`);
      return;
    }
  
    // Agrega el nuevo temperamento al array
    setDogData((prevState) => ({
      ...prevState,
      Temperaments: [...prevState.Temperaments, newTemp],
    }));
  
    // console.log('Temperamentos después de agregar:', dogData.Temperaments);
  
    event.target.value = '';
  };
  

  // Maneja la eliminacion de temperamentos
  const handleTemperamentDelete = (index) => {
    // console.log('Índice del temperamento a eliminar:', index);
    // console.log('Temperamentos antes de eliminar:', dogData.Temperaments)
    const updatedTemperaments = [...dogData.Temperaments];
    updatedTemperaments.splice(index, 1);
    setDogData({
      ...dogData,
      Temperaments: updatedTemperaments,
    });
    //  console.log('Temperamentos después de eliminar:', dogData.Temperaments);
  };


  // Maneja la selección de imagen
  const handleImage = (event) => {
    const file = event.target.files[0];

    if (file && file.type.startsWith('image/')) {
      setDogData({ ...dogData, image: URL.createObjectURL(file) });

      // Actualiza la vista previa de la imagen
      const imgPreview = document.getElementById('image-preview');
      if (imgPreview) {
        imgPreview.src = URL.createObjectURL(file);
      }
    } else {
      setDogData({ ...dogData, image: '' });

      // Si no se selecciona una imagen válida, borra la vista previa
      const imgPreview = document.getElementById('image-preview');
      if (imgPreview) {
        imgPreview.src = '';
      }
    }
  };

  // Verifica si ya existe un perro con el mismo nombre en la lista de perros
  const isNameDuplicate = () => {
    const nameDuplicate = dogs.filter(
      (dog) => dog.name.toLowerCase() === dogData.name.toLowerCase()
    );
    if (nameDuplicate.length > 0)
      setErrors({ ...errors, name: 'This breed already exists' });
  };

  // Maneja el envío del formulario
  const handleSubmit = (event) => {
    event.preventDefault();
    // Llama a la acción de Redux para crear un nuevo perro
    dispatch(createDog(dogData));
    // Muestra una alerta para indicar que la raza se ha creado con éxito
    alert('Your breed was created successfully!');

    // Restablece los campos del formulario a sus valores iniciales
    setDogData({
      name: '',
      height: '',
      weight: '',
      lifespan: '',
      Temperaments: [],
      image: '',
    });
  };

  // Determina si el botón de envío debe estar deshabilitado o no
  const disableSubmit = () => {
    // Habilita el botón de envío si todos los campos están completos y no hay errores de validación
    if (
      !dogData.name ||
      !dogData.height ||
      !dogData.weight ||
      !dogData.lifespan ||
      dogData.Temperaments.length === 0 ||
      !dogData.image
    )
      return false;
    // También deshabilita el botón si hay errores de validación en los campos
    if (
      errors.name ||
      errors.height ||
      errors.weight ||
      errors.lifespan ||
      errors.temperaments ||
      errors.image
    )
      return false;
    return true;
  };


  return (
    <div className={styles.createDogsContainer}>
      <div className={styles.formBackground}></div>
      <div className={styles.formContainer}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <h2>New dog</h2>
          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor='name'>
              NAME
            </label>
            <br />
            <input
              type='text'
              name='name'
              id='name'
              placeholder='Enter the name'
              autoComplete='off'
              value={dogData.name}
              onChange={handleInputChange}
            />
            {errors.name && <span className={styles.error}>{errors.name}</span>}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor='height'>
              HEIGHT
            </label>
            <br />
            <input
              type='text'
              name='height'
              id='height'
              placeholder='Min - Max height in cm'
              autoComplete='off'
              value={dogData.height}
              onChange={handleInputChange}
            />
            {errors.height && (
              <span className={styles.error}>{errors.height}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor='weight'>
              WEIGHT
            </label>
            <br />
            <input
              type='text'
              name='weight'
              id='weight'
              placeholder='Min - Max weight in kg'
              autoComplete='off'
              value={dogData.weight}
              onChange={handleInputChange}
            />
            {errors.weight && (
              <span className={styles.error}>{errors.weight}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor='lifespan'>
              LIFE SPAN
            </label>
            <br />
            <input
              type='text'
              name='lifespan'
              id='lifespan'
              placeholder='Min - Max life span in years'
              autoComplete='off'
              value={dogData.lifespan}
              onChange={handleInputChange}
            />
            {errors.lifespan && (
              <span className={styles.error}>{errors.lifespan}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor='image'>
              IMAGE
            </label>
            <br />
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <input
                type='file'
                accept='image/*'
                name='image'
                id='image'
                onChange={handleImage}
              />
              {dogData.image && ( // Verifica si hay una imagen seleccionada para mostrar la vista previa
                <img
                  id='image-preview'
                  src={dogData.image}
                  alt='Vista previa de la imagen'
                  style={{
                    maxWidth: '200px',
                    maxHeight: '200px',
                    marginLeft: '10px',
                  }} // Estilo para la imagen previa
                />
              )}
            </div>
            {errors.image && (
              <span className={styles.error}>{errors.image}</span>
            )}
          </div>

          <div className={styles.formGroup}>
            <select
              className={styles.selectField}
              onChange={handleTemperamentSelect}
            >
              <option value=''>TEMPERAMENTS</option>
              {temperaments?.map((temp) => {
                return (
                  <option key={temp.id} name={temp.name} value={temp.name}>
                    {temp.name}
                  </option>
                );
              })}
            </select>
            {errors.temperaments && (
              <span className={styles.error}>{errors.temperaments}</span>
            )}
          </div>

          <div className={styles.buttonBark}>
            <button type='submit' disabled={!disableSubmit()}>
              ¡BARK!
            </button>
          </div>
        </form>

        <div className={styles.temperamentList}>
          {dogData.Temperaments.map((temp, index) => (
            <span
              key={temp}
              className={styles.temperamentItem}
              onClick={() => handleTemperamentDelete(index)}
            >
              <p>{temp}</p>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CreateDogs;
