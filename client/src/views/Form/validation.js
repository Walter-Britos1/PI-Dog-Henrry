export const validateDogData = (dogData) => {
  // Inicializa un objeto de errores
  let errors = {};

  // Expresiones regulares para validar el formato
  let regexH = /^\d{1,2} ?- ?\d{1,2}$/;
  let regexW = /^\d{1,2} ?- ?\d{1,2}$/;
  let regexLS = /^\d{1,2} ?- ?\d{1,2}$/;

  // Validación del campo 'Name'
  if (!dogData.name) errors.name = 'This field is required';

  // Validacíon para que el nombre no obtenga mas de 25 caracteres
  if (dogData.name.length > 25) errors.name = 'Must be less than 25 characters';

  if (!/^[a-zA-Z ]*$/.test(dogData.name))
    errors.name = 'Only letters are allowed';

  // Validación del campo 'Height'
  if (!dogData.height) {
    errors.height = 'This field is required';
  } else if (!regexH.test(dogData.height)) {
    errors.height = 'The format must be min - max';
  } else if (dogData.height.length > 7) {
    errors.height = 'Must be less than 7 characters';
  } else {
    let [minHeight, maxHeight] = dogData.height.split('-').map(Number);
    if (minHeight > maxHeight) {
      errors.height = 'Minimum height cannot be greater than maximum height';
    }
  }

  // Validación del campo 'Weight'
  if (!dogData.weight) {
    errors.weight = 'This field is required';
  } else if (!regexW.test(dogData.weight)) {
    errors.weight = 'The format must be min - max';
  } else if (dogData.weight.length > 7) {
    errors.weight = 'Must be less than 7 characters';
  } else {
    let [minWeight, maxWeight] = dogData.weight.split('-').map(Number);
    if (minWeight > maxWeight) {
      errors.weight = 'Minimum weight cannot be greater than maximum weight';
    }
  }

  // Validación del campo 'Life Span'
  if (!dogData.lifespan) {
    errors.lifespan = 'This field is required';
  } else if (!regexLS.test(dogData.lifespan)) {
    errors.lifespan = 'The format must be min - max';
  } else if (dogData.lifespan.length > 7) {
    errors.lifespan = 'Must be less than 7 characters';
  } else {
    let [minLifespan, maxLifespan] = dogData.lifespan.split('-').map(Number);
    if (minLifespan > maxLifespan) {
      errors.lifespan =
        'Minimum lifespan cannot be greater than maximum lifespan';
    }
  }

  // Devuelve el objeto de errores
  return errors;
};
