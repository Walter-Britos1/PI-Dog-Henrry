export const validateDogData = (dogData) => {
  // Inicializa un objeto de errores
  let errors = {};
  
  // Expresiones regulares para validar el formato
  let regexH = /^\d{1,2} ?- ?\d{1,2}$/;
  let regexW = /^\d{1,2} ?- ?\d{1,2}$/;
  let regexLS = /^\d{1,2} ?- ?\d{1,2}$/;

  // Validación del campo 'Name'
  if (!dogData.name) errors.name = 'This field is required';

  if (dogData.name.length > 25) errors.name = 'Must be less than 25 characters';

  if (!/^[a-zA-Z ]*$/.test(dogData.name)) errors.name = 'Only letters are allowed';

  // Validación del campo 'Height'
  if (!dogData.height) errors.height = 'This field is required';
  if (!regexH.test(dogData.height)) errors.height = 'The format must be min - max';

  // Validación del campo 'Weight'
  if (!dogData.weight) errors.weight = 'This field is required';
  if (!regexW.test(dogData.weight)) errors.weight = 'The format must be min - max';

  // Validación del campo 'Life Span'
  if (!dogData.lifespan) errors.lifespan = 'This field is required';
  if (!regexLS.test(dogData.lifespan)) errors.lifespan = 'The format must be min - max';

  // Devuelve el objeto de errores
  return errors;
}
